import React, { useState } from "react";
import { FiPhoneCall } from "react-icons/fi";
import { BeatLoader } from "react-spinners";
import VapiIntegration from "@/utils/VapiIntegration";

export default function AssignmentLevel({ assistantInfo, setLevelup }) {
  const [callOpen, setCallOpen] = useState(false);
  const [score, setScore] = useState(assistantInfo?.marks || 0);
  const [loading, setLoading] = useState(false);

  const handleCallClose = () => {
    setCallOpen(false);
  };

  if (!assistantInfo || typeof assistantInfo !== "object") {
    return (
      <div className="w-full flex justify-center items-center p-5 bg-white rounded-lg">
        <p className="text-gray-500">Invalid assistant data.</p>
      </div>
    );
  }

  const CreateAiCall = (id) => {
    setCallOpen(true);
  };

  const assistant = assistantInfo?.assistant;
  const messages = assistantInfo?.model?.messages || [];

  return (
    <div className="w-full flex flex-col bg-white p-3 sm:p-5 rounded-lg">
      <div className="flex flex-col gap-4 sm:gap-5 bg-[#EEF2F5] p-3 sm:p-5 rounded-xl">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 bg-[#FAFAFA] p-4 sm:p-6 rounded-lg">
          {/* LEFT: Image and Description */}
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="w-full sm:w-[147px] h-[180px] sm:h-[158px] flex-shrink-0 overflow-hidden rounded-md">
              <img
                src={
                  assistant?.avatar_url ||
                  "https://as2.ftcdn.net/v2/jpg/11/60/26/41/1000_F_1160264132_mNa38Wh7M3Qy2cRgD8J9VDCcxnUNB5T2.jpg"
                }
                alt="Assignment"
                className="w-full h-full object-cover rounded-md"
              />
            </div>

            <div className="flex flex-col gap-2 justify-start">
              <h3 className="text-lg sm:text-xl font-semibold">
                {assistant?.assistant_name}
              </h3>

              {messages.length > 0 ? (
                messages.map((msg, index) => (
                  <p
                    key={index}
                    className="text-sm sm:text-base text-[#545357] leading-relaxed"
                  >
                    {msg.content.slice(0, 300)}
                    {msg.content.length > 300 ? "..." : ""}
                  </p>
                ))
              ) : (
                <p className="text-sm sm:text-base text-[#545357] leading-relaxed">
                  {assistant?.description}
                </p>
              )}
            </div>
          </div>

          {/* RIGHT: Score & Button */}
          <div className="w-full sm:w-[300px] flex flex-col justify-between gap-3 items-start sm:items-end">
            <h4 className="text-sm sm:text-base font-medium text-gray-800">
              Mark:{" "}
              <span className="text-[#3EC65D] font-semibold">
                {loading ? (
                  <BeatLoader size={8} color="#3EC65D" />
                ) : (
                  `${score}%`
                )}
              </span>
            </h4>
            <button
              onClick={() => CreateAiCall(assistant.assistant_id)}
              className="w-full sm:w-auto px-4 py-2 flex items-center justify-center gap-2 bg-[#3EC65D] hover:bg-[#448153] text-white rounded-lg text-sm sm:text-base font-medium"
            >
              <FiPhoneCall className="text-lg sm:text-xl" />
              Start Call Now
            </button>
          </div>
        </div>
      </div>

      {/* Call Modal */}
      {callOpen && (
        <div className="fixed inset-0 z-10 backdrop-blur-md bg-black/30 flex justify-center items-center px-4">
          <div className="bg-white p-6 sm:p-8 rounded-2xl w-full max-w-md">
            <VapiIntegration
              onClose={handleCallClose}
              assistantId={assistant?.assistant_id}
            />
          </div>
        </div>
      )}
    </div>
  );
}
