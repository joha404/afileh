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
    <div className="w-full flex flex-col bg-white sm:p-5 p-3 rounded-[8px]">
      <div className="w-full flex flex-col gap-5 justify-start items-start rounded-xl sm:p-5 p-3 bg-[#EEF2F5]">
        <div className="w-full flex flex-col sm:p-5 p-3 rounded-[8px] bg-white">
          <div className="w-full flex flex-col gap-5 justify-start items-start rounded-xl p-3 bg-[#EEF2F5]">
            <div className="w-full flex flex-col xl:flex-row gap-6 bg-[#FAFAFA] p-3 rounded-lg">
              {/* LEFT: Image + Info */}
              <div className="flex flex-1 gap-4 xl:gap-6">
                <div className="w-[147px] h-[158px] flex-shrink-0 overflow-hidden rounded-md">
                  <img
                    src={
                      assistant?.avatar_url ||
                      "https://as2.ftcdn.net/v2/jpg/11/60/26/41/1000_F_1160264132_mNa38Wh7M3Qy2cRgD8J9VDCcxnUNB5T2.jpg"
                    }
                    alt="Assignment"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-col justify-around gap-2">
                  <h3 className="text-lg sm:text-xl font-semibold">
                    {assistant?.assistant_name}
                  </h3>

                  {messages.length > 0 ? (
                    messages.map((msg, index) => (
                      <p
                        key={index}
                        className="text-sm sm:text-base text-[#545357]"
                      >
                        {msg.content.slice(0, 300)}
                        {msg.content.length > 300 ? "..." : ""}
                      </p>
                    ))
                  ) : (
                    <p className="text-sm sm:text-base text-[#545357]">
                      {assistant?.description}
                    </p>
                  )}
                </div>
              </div>

              {/* RIGHT: Mark + Call Button */}
              <div className="w-full xl:w-[300px] flex flex-col justify-between items-start xl:items-end gap-3">
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
                  className="w-full xl:w-auto sm:px-4 py-2 flex items-center justify-center gap-2 bg-[#3EC65D] hover:bg-[#448153] text-white rounded-lg"
                >
                  <FiPhoneCall className="text-lg sm:text-xl" />
                  <span className="text-sm sm:text-base font-medium">
                    Start Call Now
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {callOpen && (
          <div className="fixed inset-0 z-10 backdrop-blur-md bg-black/30 flex justify-center items-center">
            <div className="bg-white p-8 rounded-2xl sm:w-[90%] lg:w-[30%]">
              <VapiIntegration
                onClose={handleCallClose}
                assistantId={assistant?.assistant_id}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
