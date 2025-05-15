import { getAllCalls } from "@/components/api/callLog";
import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import { TbMessage2Up } from "react-icons/tb";
import CallSummaryModal from "@/components/common/CallSummaryModal";

const CallLog = () => {
  const [callLogAll, setCallLogAll] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCall, setSelectedCall] = useState(null);

  const calculateDuration = (startedAt, endedAt) => {
    const start = new Date(startedAt);
    const end = new Date(endedAt);
    const durationInSeconds = Math.floor((end - start) / 1000);

    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;

    return `${minutes} Minutes ${seconds} Seconds`;
  };

  const fetchCallLog = async () => {
    setLoading(true);
    setError("");
    try {
      const allCallLog = await getAllCalls();
      setCallLogAll(allCallLog);
    } catch (err) {
      setError("Failed to load call logs. Please try again.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCallLog();
  }, []);

  const handleCallSummary = (call) => {
    const { id, type, startedAt, endedAt, createdAt, analysis } = call;
    const duration =
      startedAt && endedAt ? calculateDuration(startedAt, endedAt) : "N/A";

    const callData = {
      id,
      type,
      duration,
      createdAt: new Date(createdAt).toLocaleString(),
      summary: analysis?.summary || "No summary available",
    };

    setSelectedCall(callData);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full bg-white rounded-lg sm:p-6 p-3 flex flex-col sm:gap-5 gap-2">
      <h1 className="sm:text-2xl text-xl font-semibold">Call Log</h1>

      {loading ? (
        <div className=" h-[70vh] w-full flex justify-center items-center py-10">
          <HashLoader size={100} />
        </div>
      ) : error ? (
        <h1 className="text-red-500 text-center py-10">{error}</h1>
      ) : (
        <div className="w-full overflow-x-auto rounded-t-xl custom-scrollbar">
          <table className="w-full text-left bg-[#EEF2F5]">
            <thead>
              <tr className="bg-black text-white">
                <th className="px-6 py-3 text-nowrap sm:text-xl text-sm font-medium">
                  Call Type
                </th>
                <th className="px-6 py-[14px] text-nowrap sm:text-xl text-sm font-medium">
                  Call Duration
                </th>
                <th className="px-6 py-[14px] text-nowrap sm:text-xl text-sm font-medium">
                  Time
                </th>
                <th className="px-6 py-[14px] text-nowrap sm:text-xl text-sm font-medium">
                  Summary
                </th>
              </tr>
            </thead>
            <tbody className="sm:text-xl text-sm  bg-white">
              {callLogAll?.slice(0, 10).map((item, index) => (
                <tr key={index} className="border-b border-[#EEF2F5]">
                  <td className="text-nowrap px-4 lg:px-6 sm:py-5 py-3">
                    {item.type}
                  </td>
                  <td className="text-nowrap px-4 lg:px-6 sm:py-5 py-3">
                    {item.startedAt && item.endedAt
                      ? calculateDuration(item.startedAt, item.endedAt)
                      : "N/A"}
                  </td>
                  <td className="text-nowrap px-4 lg:px-6 sm:py-5 py-3">
                    {new Date(item.createdAt).toLocaleString()}
                  </td>
                  <td
                    className="px-4 sm:px-6 text-nowrap sm:py-3 py-2 mt-4 flex cursor-pointer hover:bg-[#477a53] hover:text-white gap-3 items-center bg-[#3EC65D] w-fit rounded-lg"
                    onClick={() => handleCallSummary(item)}
                  >
                    <TbMessage2Up />
                    Summary
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      <CallSummaryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={selectedCall}
      />
    </div>
  );
};

export default CallLog;
