import { useState, useEffect } from "react";
import assignment_image from "../assets/images/ai_caller_profile.png";
import { FiPhoneCall } from "react-icons/fi";
import { FaLock } from "react-icons/fa";
import VapiIntegration from "@/utils/VapiIntegration.jsx";
import { HashLoader } from "react-spinners";
import { getAllCalls } from "@/components/api/callLog";

const Assignment = () => {
  const [callOpen, setCallOpen] = useState(false);
  const [callLogAll, setCallLogAll] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [lock, setLock] = useState(false);

  const calculateScore = (item) => {
    if (
      item.costBreakdown &&
      item.costBreakdown.total &&
      item.costBreakdown.stt
    ) {
      const { total, stt } = item.costBreakdown;
      const score = (stt / total) * 100;
      return score.toFixed(2);
    }
    return "N/A";
  };

  const fetchCallLog = async () => {
    setLoading(true);
    setError("");
    try {
      const allCallLog = await getAllCalls();
      console.log(allCallLog);
      setCallLogAll(Array.isArray(allCallLog) ? allCallLog : []);
    } catch (err) {
      console.error(err);
      setError("Failed to load call logs. Please try again.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCallLog();
  }, []);

  if (loading) {
    return (
      <div className="h-[70vh] w-full flex justify-center items-center py-10">
        <HashLoader size={100} />
      </div>
    );
  }

  if (error) {
    return <h1 className="text-red-500 text-center py-10">{error}</h1>;
  }

  return (
    <>
      <div className="w-full flex flex-col bg-white sm:p-5 p-3 rounded-[8px]">
        <h1 className="p-4 sm:text-2xl text-xl font-semibold">Module 1</h1>
        {callLogAll
          .slice()
          .reverse()
          .slice(0, 3)
          .map((item, index) => {
            const score = calculateScore(item);
            return (
              <div key={index} className="w-full flex flex-col sm:gap-3">
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
                    <div className="2xl w-full flex flex-col gap-2">
                      <h3 className="sm:text-xl text-lg font-semibold">
                        {item.assistant?.name ?? "Unknown Assistant"}
                      </h3>
                      <p className="sm:text-lg w-full xs:text-base text-sm text-[#545357]">
                        {item.analysis?.summary ??
                          "Description is not available."}
                      </p>
                    </div>
                    <div className="flex w-auto sm:w-[250px] md:w-[280px] lg:w-[300px] flex-col xl:items-end">
                      <h4>
                        Mark: <span className="text-[#3EC65D]">{score}</span>
                      </h4>
                      <button
                        onClick={() => setCallOpen(true)}
                        className="w-full sm:p-3 p-2 flex items-center gap-3 cursor-pointer bg-[#3EC65D] hover:bg-[#448153] text-white rounded-lg mt-4"
                      >
                        <FiPhoneCall className="sm:text-2xl" />
                        <span className="sm:text-xl font-medium">
                          Start Call Now
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
                {callOpen && (
                  <div className="fixed inset-0 z-10 bg-black/10  flex justify-center items-center">
                    <div className="bg-white p-8 rounded-2xl sm:w-[90%] lg:w-[30%]">
                      <VapiIntegration setCallOpen={setCallOpen} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
      </div>
      <div className="w-full flex flex-col bg-white sm:p-5 p-3 rounded-[8px]">
        <h1 className="p-4 sm:text-2xl text-xl font-semibold">Module 2</h1>
        {callLogAll
          .slice()
          .reverse()
          .slice(4, 7)
          .map((item, index) => {
            const score = calculateScore(item);
            return (
              <div key={index} className="w-full flex flex-col sm:gap-3">
                <div className="w-full flex flex-col gap-5 justify-start items-start rounded-xl sm:p-5 p-3 bg-[#EEF2F5] relative">
                  {lock && (
                    <div className="w-full h-full absolute top-0 left-0 bg-[rgba(217,217,217,0.50)] backdrop-blur-[5px] z-10 flex justify-center items-center">
                      <span className="w-16 h-16 bg-[#FF5A54] mt-10 text-4xl flex justify-center items-center rounded-full text-white">
                        <FaLock />
                      </span>
                    </div>
                  )}
                  <div className="w-full flex xl:flex-row flex-col sm:gap-6 gap-3 xl:justify-center xl:items-center p-3 bg-[#FAFAFA] rounded-lg">
                    <div className="sm:min-w-[147px] h-[158px] overflow-hidden">
                      <img
                        src={assignment_image}
                        alt="Assignment"
                        className="w-auto h-full object-contain"
                      />
                    </div>
                    <div className="2xl w-full flex flex-col gap-2">
                      <h3 className="sm:text-xl text-lg font-semibold">
                        {item.assistant?.name ?? "Unknown Assistant"}
                      </h3>
                      <p className="sm:text-lg w-full xs:text-base text-sm text-[#545357]">
                        {item.analysis?.summary ??
                          "Description is not available."}
                      </p>
                    </div>
                    <div className="flex w-[300px] flex-col xl:items-end">
                      <h4>
                        Mark: <span className="text-[#3EC65D]">{score}</span>
                      </h4>
                      <button
                        onClick={() => setCallOpen(true)}
                        className="w-full sm:p-3 p-2 flex items-center gap-3 cursor-pointer bg-[#3EC65D] hover:bg-[#448153] text-white rounded-lg mt-4"
                      >
                        <FiPhoneCall className="sm:text-2xl" />
                        <span className="sm:text-xl font-medium">
                          Start Call Now
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
                {callOpen && (
                  <div className="fixed inset-0  z-10 bg-black/20 flex justify-center items-center">
                    <div className="bg-white   p-8 rounded-2xl sm:w-[90%] lg:w-[30%]">
                      <VapiIntegration setCallOpen={setCallOpen} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Assignment;
