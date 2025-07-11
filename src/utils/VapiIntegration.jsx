import { useEffect, useRef, useState } from "react";
import Vapi from "@vapi-ai/web";
import { RxCross1 } from "react-icons/rx";
import ActiveCallDetail from "@/components/ActiveCallDetail";
import speakingJson from "../utils/speaking.json";
import Lottie from "lottie-react";
import { IoCall } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

const vapi = new Vapi("8ce3246a-9720-4cd7-92c0-6a743f9ca9e7");

const VapiIntegration = ({
  onClose,
  assistantId,
  callDurationLimit = undefined,
}) => {
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(true);
  const [error, setError] = useState("");
  const [endCallButton, SetEndCallButton] = useState(false);
  const [assistantIsSpeaking, setAssistantIsSpeaking] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [callTime, setCallTime] = useState(0);

  const intervalId = useRef(null);
  const callEndTimeout = useRef(null);
  const lottieRef = useRef(null); // ✅ correct ref usage

  const userInfo = localStorage.getItem("userInfo");

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
    const handleCallStart = () => {
      setConnecting(true);
      setConnected(false);

      intervalId.current = setInterval(() => {
        setCallTime((prev) => prev + 1);
      }, 2000);

      if (callDurationLimit) {
        callEndTimeout.current = setTimeout(() => {
          vapi.stop();
          SetEndCallButton(false);
          setConnected(true);
        }, callDurationLimit);
      }
    };

    const handleCallEnd = () => {
      setConnecting(true);
      setConnected(true);
      SetEndCallButton(false);
      if (intervalId.current) clearInterval(intervalId.current);
      if (callEndTimeout.current) clearTimeout(callEndTimeout.current);
      setCallTime(0);
      setAssistantIsSpeaking(false);
      if (lottieRef.current) lottieRef.current.pause(); // ✅ safe call
    };

    const handleSpeechStart = () => {
      console.log("SPEECH STARTED");
      setAssistantIsSpeaking(true);
      if (lottieRef.current) lottieRef.current.play(); // ✅ safe call
    };

    const handleSpeechEnd = () => {
      console.log("SPEECH ENDED");
      setAssistantIsSpeaking(false);
      if (lottieRef.current) lottieRef.current.pause(); // ✅ safe call
    };

    const handleVolumeLevel = (level) => {
      setVolumeLevel(level);
    };

    const handleError = (error) => {
      console.error(error);
      setConnecting(false);
      setError(error.msg || "An error occurred");
    };

    vapi.on("call-start", handleCallStart);
    vapi.on("call-end", handleCallEnd);
    vapi.on("speech-start", handleSpeechStart);
    vapi.on("speech-end", handleSpeechEnd);
    vapi.on("volume-level", handleVolumeLevel);
    vapi.on("error", handleError);

    return () => {
      vapi.off("call-start", handleCallStart);
      vapi.off("call-end", handleCallEnd);
      vapi.off("speech-start", handleSpeechStart);
      vapi.off("speech-end", handleSpeechEnd);
      vapi.off("volume-level", handleVolumeLevel);
      vapi.off("error", handleError);

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
      const callOptions = {
        metadata: {
          userInfo: userInfo || {},
        },
      };

      await vapi.start(assistantId, callOptions);
    } catch (err) {
      setError("Failed to start call: " + err.message);
      setConnecting(false);
      setConnected(false);
    }
  };

  const endCall = async () => {
    try {
      vapi.stop();
      SetEndCallButton(false);
      setConnected(true);
      setCallTime(0);
      if (intervalId.current) clearInterval(intervalId.current);
      if (callEndTimeout.current) clearTimeout(callEndTimeout.current);
      if (lottieRef.current) lottieRef.current.pause();
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

      <div className="flex flex-col gap-4 items-center justify-center">
        <Lottie
          lottieRef={lottieRef}
          animationData={speakingJson}
          loop
          autoplay={false} // must be false to control manually
          style={{ width: 200, height: 200 }}
        />

        {!connected && (
          <div className="text-xl font-bold text-emerald-600 text-center">
            ⏱️ Time:{" "}
            {callDurationLimit
              ? formatTime(callDurationLimit / 1000 - callTime)
              : formatTime(callTime)}
          </div>
        )}

        {connected ? (
          <div className="flex gap-3">
            <div
              className="mt-4 text-center cursor-pointer h-14 w-14 bg-red-600 rounded-full flex justify-center items-center text-white text-2xl hover:bg-red-800"
              onClick={() => onClose()}
              disabled={connecting}
            >
              <RxCross2 />
            </div>
            <div
              className="mt-4 text-center cursor-pointer h-14 w-14 bg-green-600 rounded-full flex justify-center items-center text-white text-2xl hover:bg-green-800"
              onClick={startCall}
              disabled={connecting}
            >
              <IoCall />
            </div>
          </div>
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
