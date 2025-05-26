import { useEffect, useState } from "react";
import Vapi from "@vapi-ai/web";
import { RxCross1 } from "react-icons/rx";
import ActiveCallDetail from "@/components/ActiveCallDetail";
import { getAllCalls } from "../components/api/callLog"; // Adjust the import path

// Initialize Vapi with your Public Key
const vapi = new Vapi("ca3070ad-eee9-44a7-98ea-6bdca72d8b86");

const VapiIntegration = ({
  onClose,
  assistantInfo = { name: "Vapi" }, // Default to "Vapi" if no assistantInfo is passed
}) => {
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(true);
  const [error, setError] = useState("");
  const [callHistory, setCallHistory] = useState([]);
  const [callId, setCallId] = useState(null);
  const [endCallButton, SetEndCallButton] = useState(false);
  const [assistantIsSpeaking, setAssistantIsSpeaking] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);

  // Get User Token from localStorage
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

  useEffect(() => {
    vapi.on("call-start", () => {
      setConnecting(true);
      setConnected(false);
    });

    vapi.on("call-end", () => {
      setConnecting(true);
      setConnected(true);
    });

    vapi.on("speech-start", () => {
      setAssistantIsSpeaking(true);
    });

    vapi.on("speech-end", () => {
      setAssistantIsSpeaking(false);
    });

    vapi.on("volume-level", (level) => {
      setVolumeLevel(level);
    });

    vapi.on("error", (error) => {
      console.error(error);
      setConnecting(false);
      setError(error.msg || "An error occurred");
    });
  }, []);

  const startCall = async () => {
    setConnecting(true);
    setConnected(false);
    SetEndCallButton(true);
    setError("");

    try {
      const call = await vapi.start(
        {
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
          name: assistantInfo.name, // Uses the default "Vapi" if not provided
        },
        {
          variableValues: {
            email: userToken,
          },
        }
      );

      if (call) {
        setCallId(call.id);
      }
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
