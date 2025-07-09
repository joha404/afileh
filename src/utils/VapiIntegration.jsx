import { useEffect, useRef, useState } from "react";
import Vapi from "@vapi-ai/web";
import { RxCross1 } from "react-icons/rx";
import ActiveCallDetail from "@/components/ActiveCallDetail";

const vapi = new Vapi("8ce3246a-9720-4cd7-92c0-6a743f9ca9e7");

const VapiIntegration = ({
  onClose,
  assistantInfo,
  assistantId,
  callDurationLimit = undefined,
}) => {
  console.log(assistantId);
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(true);
  const [error, setError] = useState("");
  const [endCallButton, SetEndCallButton] = useState(false);
  const [assistantIsSpeaking, setAssistantIsSpeaking] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [callTime, setCallTime] = useState(0);

  const intervalId = useRef(null);
  const callEndTimeout = useRef(null);

  const getUserToken = () => {
    try {
      const tokenString = localStorage.getItem("userInfo");
      return tokenString ? tokenString : null;
    } catch (error) {
      console.error("Failed to parse userInfo:", error);
      return null;
    }
  };
  const userToken = getUserToken();

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  };

  useEffect(() => {
    vapi.on("call-start", () => {
      setConnecting(true);
      setConnected(false);

      // Start timer
      intervalId.current = setInterval(() => {
        setCallTime((prev) => prev + 1);
      }, 2000);

      // Auto end after callDurationLimit
      if (callDurationLimit) {
        callEndTimeout.current = setTimeout(() => {
          vapi.stop();
          SetEndCallButton(false);
          setConnected(true);
        }, callDurationLimit);
      }
    });

    vapi.on("call-end", () => {
      setConnecting(true);
      setConnected(true);
      SetEndCallButton(false);

      if (intervalId.current) clearInterval(intervalId.current);
      if (callEndTimeout.current) clearTimeout(callEndTimeout.current);
      setCallTime(0);
    });

    vapi.on("speech-start", () => setAssistantIsSpeaking(true));
    vapi.on("speech-end", () => setAssistantIsSpeaking(false));
    vapi.on("volume-level", (level) => setVolumeLevel(level));
    vapi.on("error", (error) => {
      console.error(error);
      setConnecting(false);
      setError(error.msg || "An error occurred");
    });

    return () => {
      if (intervalId.current) clearInterval(intervalId.current);
      if (callEndTimeout.current) clearTimeout(callEndTimeout.current);
    };
  }, [callDurationLimit]);

  const startCall = async () => {
    setConnecting(true);
    setConnected(false);
    SetEndCallButton(true);
    setError("");

    try {
      const callConfig = {
        transcriber: {
          provider: "deepgram",
          model: "nova-2",
          language: "en-US",
        },
        model: {
          provider: "openai",
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are a helpful assistant.",
            },
          ],
        },
        voice: {
          provider: "playht",
          voiceId: "jennifer",
        },
        name: assistantId,
      };

      const callOptions = callDurationLimit
        ? undefined
        : {
            variableValues: {
              email: userToken || "",
            },
          };

      await vapi.start(assistantId);
    } catch (err) {
      setError("Failed to start call: " + err.message);
      setConnecting(false);
      setConnected(false);
    }
  };

  const endCall = async () => {
    try {
      vapi.stop(); // ✅ Correct method from SDK
      SetEndCallButton(false);
      setConnected(true);
      setCallTime(0);
      if (intervalId.current) clearInterval(intervalId.current);
      if (callEndTimeout.current) clearTimeout(callEndTimeout.current);
    } catch (err) {
      setError("Failed to stop call: " + err.message);
    }
  };

  return (
    <div className="mx-auto w-full rounded-xl">
      <div
        className="float-end hover:text-emerald-950 hover:font-extrabold text-2xl cursor-pointer"
        onClick={onClose}
      >
        <RxCross1 className="font-bold" />
      </div>

      <h2 className="text-2xl font-semibold mb-4">Vapi Integration</h2>

      {error && <p className="text-red-500 mb-4">{`Error: ${error}`}</p>}

      <div className="flex flex-col gap-4">
        {!connected && (
          <div className="text-xl font-bold text-emerald-600 text-center">
            ⏱️ Time:{" "}
            {callDurationLimit
              ? formatTime(callDurationLimit / 1000 - callTime)
              : formatTime(callTime)}
          </div>
        )}

        {connected ? (
          <button
            onClick={startCall}
            disabled={connecting}
            className="w-full py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-800 cursor-pointer transition duration-200"
          >
            Start Call
          </button>
        ) : (
          <ActiveCallDetail
            assistantIsSpeaking={assistantIsSpeaking}
            volumeLevel={volumeLevel}
            onEndCallClick={endCall}
          />
        )}
      </div>
    </div>
  );
};

export default VapiIntegration;
