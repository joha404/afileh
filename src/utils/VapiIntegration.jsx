import { useEffect, useState } from "react";
import Vapi from "@vapi-ai/web";
import { RxCross1 } from "react-icons/rx";
import ActiveCallDetail from "@/components/ActiveCallDetail";
import { getAllCalls, getCallById } from "../components/api/callLog"; // Adjust the import path

// Initialize Vapi with your Public Key
const vapi = new Vapi("ca3070ad-eee9-44a7-98ea-6bdca72d8b86");

const VapiIntegration = ({ setCallOpen }) => {
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(true);
  const [error, setError] = useState("");
  const [callHistory, setCallHistory] = useState([]);
  const [callId, setCallId] = useState(null);
  const [callDetails, setCallDetails] = useState(null);
  const [endCallButton, SetEndCallButton] = useState(false);
  const [assistantIsSpeaking, setAssistantIsSpeaking] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);

  const { showPublicKeyInvalidMessage, setShowPublicKeyInvalidMessage } =
    usePublicKeyInvalid();

  const assistantOptions = {
    name: "Financy",
    firstMessage: "Hi, I am Vapi. How can we help you?",
    transcriber: {
      provider: "deepgram",
      model: "nova-2",
      language: "en-US",
    },
    voice: {
      provider: "playht",
      voiceId: "jennifer",
    },
    model: {
      provider: "openai",
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "",
        },
      ],
    },
  };

  useEffect(() => {
    vapi.on("call-start", () => {
      setConnecting(true);
      setConnected(false);
      setShowPublicKeyInvalidMessage(false);
    });

    vapi.on("call-end", () => {
      setConnecting(true);
      setConnected(true);
      setShowPublicKeyInvalidMessage(false);
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

  let callStartTime = null;

  const listeners = {
    onCallStart: (call) => {
      setConnecting(false);
      setConnected(true);
      setShowPublicKeyInvalidMessage(false);

      callStartTime = new Date();
      setCallId(call.id);

      const event = {
        event: "Call started",
        timestamp: callStartTime.toISOString(),
        callId: call.id,
      };

      setCallHistory((prevHistory) => [...prevHistory, event]);
    },

    onCallEnd: async (reason) => {
      setConnecting(false);
      setConnected(false);
      setShowPublicKeyInvalidMessage(false);

      const endTime = new Date();
      const duration = (endTime - callStartTime) / 1000;

      setCallHistory((prevHistory) => [
        ...prevHistory,
        {
          event: "Call ended",
          timestamp: endTime.toISOString(),
          duration: `${duration} seconds`,
          reason: reason?.msg || "Unknown",
        },
      ]);
    },

    onError: (err) => {
      console.error("Error occurred:", err);
      setError(err.msg || "An error occurred");
    },
  };

  useEffect(() => {
    if (vapi) {
      Object.entries(listeners).forEach(([event, handler]) => {
        vapi.on(event, handler);
      });

      return () => {
        Object.entries(listeners).forEach(([event, handler]) => {
          vapi.off(event, handler);
        });
      };
    }
  }, [listeners]);
  const fetchAllCalls = async () => {
    const data = await getAllCalls();
    console.log(data);
  };

  useEffect(() => {
    fetchAllCalls();
  }, []);

  const startCall = async () => {
    setConnecting(true);
    setConnected(false);
    SetEndCallButton(true);
    setError("");

    try {
      const call = await vapi.start(assistantOptions);
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
      console.error("Error fetching call details after end:", err.message);
    }
  };

  const closeCall = () => {
    setCallOpen(false);
  };

  return (
    <div className="mx-auto  w-full rounded-xl">
      <div
        className="float-end hover:text-emerald-950 hover:font-extrabold text-2xl cursor-pointer"
        onClick={closeCall}
      >
        <RxCross1 className="font-bold" />
      </div>

      <h2 className="text-2xl font-semibold mb-4">Vapi Integration</h2>

      {error && <p className="text-red-500 mb-4">{`Error: ${error}`}</p>}

      {showPublicKeyInvalidMessage && (
        <p className="text-red-500 mb-4">Public Key is invalid or missing.</p>
      )}

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

      {callDetails && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-semibold text-lg">Call Details</h3>
          <p>Call ID: {callDetails.id}</p>
          <p>Status: {callDetails.status}</p>
          <p>Timestamp: {callDetails.timestamp}</p>
        </div>
      )}
    </div>
  );
};

const usePublicKeyInvalid = () => {
  const [showPublicKeyInvalidMessage, setShowPublicKeyInvalidMessage] =
    useState(false);

  useEffect(() => {
    if (showPublicKeyInvalidMessage) {
      const timer = setTimeout(() => {
        setShowPublicKeyInvalidMessage(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showPublicKeyInvalidMessage]);

  return { showPublicKeyInvalidMessage, setShowPublicKeyInvalidMessage };
};

export default VapiIntegration;
