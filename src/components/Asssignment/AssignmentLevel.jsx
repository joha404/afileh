import React, { useState, useEffect } from "react";
import { FaLock } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
import assignment_image from "../../assets/images/ai_caller_profile.png";
import VapiIntegration from "@/utils/VapiIntegration";
import { getAllCalls } from "../api/callLog";
import { BeatLoader } from "react-spinners";

export default function AssignmentLevel({ assistantInfo, setLevelup }) {
  const [callOpen, setCallOpen] = useState(false);
  const [lock, setLock] = useState(false);
  const [score1, setScore1] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (assistantInfo?.name) {
      fetchAssistantScore();
    }
  }, [assistantInfo]);

  const fetchAssistantScore = async () => {
    setLoading(true);
    try {
      const userTokenRaw = localStorage.getItem("userInfo");
      const currentEmail = userTokenRaw?.trim().toLowerCase();
      if (!currentEmail) return;

      const allCalls = await getAllCalls();

      const assistantCalls = allCalls.filter((call) => {
        const email =
          call.assistantOverrides?.variableValues?.email?.toLowerCase();
        const name = call.assistant?.name;
        return email === currentEmail && name === assistantInfo?.name;
      });

      let bestScore = 0;

      assistantCalls.forEach((call) => {
        const { score } = calculateCallScore(call);
        bestScore = Math.max(bestScore, score);
      });

      setScore1(bestScore);
      if (typeof setLevelup === "function") {
        setLevelup(bestScore);
      }
    } catch (error) {
      console.error("Error fetching assistant score:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCallClose = () => {
    setCallOpen(false);
    fetchAssistantScore(); // Refresh score after call ends
  };

  const calculateCallScore = (callData) => {
    const successEvaluation = callData.analysis?.successEvaluation === "true";
    const start = new Date(callData.startedAt);
    const end = new Date(callData.endedAt);
    const durationInSeconds = (end - start) / 1000;

    const totalMessages = callData.messages?.length || 0;

    if (totalMessages < 1) {
      set(setScore1(0));
    }
    const cost = callData.cost || 0;

    const systemContent =
      callData.model?.messages?.find((msg) => msg.role === "system")?.content ||
      "";
    const contentLength = systemContent.length;

    const successScore = successEvaluation ? 15 : 0;
    const durationScore = Math.min((durationInSeconds / 60) * 15, 15);
    const messageScore = Math.min(totalMessages * 1.5);
    const contentLengthScore = Math.min((contentLength / 1000) * 8.5, 8);

    const rawTotal =
      successScore + durationScore + messageScore + contentLengthScore;

    const totalScore = parseFloat(Math.min(rawTotal, 100).toFixed(2)); // cap total to 100

    return {
      callId: callData.id,
      score: totalScore,
      successEvaluation,
      durationInSeconds,
      costInUSD: cost,
      contentLength,
    };
  };

  return (
    <div className="w-full flex flex-col bg-white sm:p-5 p-3 rounded-[8px]">
      <div className="w-full flex flex-col sm:gap-3">
        <div className="w-full flex flex-col gap-5 justify-start items-start rounded-xl sm:p-5 p-3 bg-[#EEF2F5] relative">
          {lock && (
            <div className="w-full h-full absolute top-0 left-0 bg-[rgba(217,217,217,0.50)] backdrop-blur-[5px] z-10 flex justify-center items-center">
              <span className="w-16 h-16 bg-[#FF5A54] mt-10 text-4xl flex justify-center items-center rounded-full text-white">
                <FaLock />
              </span>
            </div>
          )}

          <div className="w-full flex xl:flex-row flex-col sm:gap-6 gap-3 xl:justify-left xl:items-left p-3 bg-[#FAFAFA] rounded-lg">
            <div className="sm:min-w-[147px] h-[158px] overflow-hidden">
              <img
                src={assignment_image}
                alt="Assignment"
                className="w-auto h-full object-contain"
              />
            </div>

            <div className="w-full flex flex-col gap-2">
              <h3 className="sm:text-xl text-lg font-semibold">
                {assistantInfo?.name || "Unknown Assistant"}
              </h3>
              {assistantInfo?.model?.messages?.length > 0 ? (
                assistantInfo.model.messages.map((msg, index) => (
                  <p
                    key={index}
                    className="sm:text-lg xs:text-base text-sm text-[#545357]"
                  >
                    {msg.content.slice(0, 300)}
                    {msg.content.length > 300 ? "..." : ""}
                  </p>
                ))
              ) : (
                <p className="sm:text-lg xs:text-base text-sm text-[#545357]">
                  Description is not available.
                </p>
              )}
            </div>

            <div className="flex w-auto sm:w-[250px] md:w-[280px] lg:w-[300px] flex-col xl:items-end">
              <h4>
                Mark:{" "}
                <span className="text-[#3EC65D] font-semibold">
                  {loading ? (
                    <BeatLoader size={8} color="#3EC65D" />
                  ) : (
                    `${score1}%`
                  )}
                </span>
              </h4>
              <button
                onClick={() => setCallOpen(true)}
                className="w-full sm:p-3 p-2 flex items-center gap-3 cursor-pointer bg-[#3EC65D] hover:bg-[#448153] text-white rounded-lg mt-4"
              >
                <FiPhoneCall className="sm:text-2xl" />
                <span className="sm:text-xl font-medium">Start Call Now</span>
              </button>
            </div>
          </div>
        </div>

        {callOpen && (
          <div className="fixed inset-0 z-10 bg-black/50 backdrop-blur-xs flex justify-center items-center">
            <div className="bg-white p-8 rounded-2xl sm:w-[90%] lg:w-[30%]">
              <VapiIntegration
                onClose={handleCallClose}
                assistantInfo={assistantInfo}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
