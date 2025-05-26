import { getAllCalls } from "@/components/api/callLog";
import { useEffect, useState } from "react";
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
      const userTokenRaw = localStorage.getItem("userInfo");
      const currentEmail = userTokenRaw ? userTokenRaw : null;
      if (!currentEmail) {
        console.warn("⚠️ No currentEmail found in localStorage");
        setCallLogAll([]);
        setLoading(false);
        return;
      }

      const allCallLog = await getAllCalls();

      const userCalls = allCallLog.filter((call) => {
        const email = call.assistantOverrides?.variableValues?.email
          ?.trim()
          .toLowerCase();
        return email === currentEmail;
      });
      if (userCalls == []) {
        setCallLogAll([]);
      } else {
        setCallLogAll(userCalls);
        console.log(userCalls);
      }
    } catch (err) {
      console.error(err);
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

      {loading && (
        <div className="w-full overflow-x-auto rounded-t-xl custom-scrollbar">
          <table className="w-full text-left bg-[#EEF2F5] animate-pulse">
            <thead>
              <tr className="bg-black text-white">
                <th className="px-6 py-3">Call Type</th>
                <th className="px-6 py-3">Call Duration</th>
                <th className="px-6 py-3">Time</th>
                <th className="px-6 py-3">Summary</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {[...Array(5)].map((_, index) => (
                <tr key={index} className="border-b border-gray-300">
                  <td className="px-6 py-4">
                    <div className="h-4 bg-gray-300 rounded w-34"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 bg-gray-300 rounded w-50"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 bg-gray-300 rounded w-40"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-8 bg-gray-300 rounded w-36"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && error && (
        <h1 className="text-red-500 text-center py-10">{error}</h1>
      )}

      {!loading && !error && callLogAll.length === 0 && (
        <h1 className="text-center py-10 text-lg text-gray-600">
          No call log available
        </h1>
      )}

      {!loading && !error && callLogAll.length > 0 && (
        <div className="w-full overflow-x-auto rounded-t-xl custom-scrollbar">
          <table className="w-full text-left bg-[#EEF2F5]">
            <thead>
              <tr className="bg-black text-white">
                <th className="px-6 py-3">Call Type</th>
                <th className="px-6 py-3">Call Duration</th>
                <th className="px-6 py-3">Time</th>
                <th className="px-6 py-3">Summary</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {callLogAll?.map((item, index) => (
                <tr key={index} className="border-b border-gray-300 ">
                  <td className="px-6 py-4">{item.type}</td>
                  <td className="px-6 py-4">
                    {item.startedAt && item.endedAt
                      ? calculateDuration(item.startedAt, item.endedAt)
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(item.createdAt).toLocaleString()}
                  </td>
                  <td
                    className="px-4 sm:px-6 sm:py-3 py-2 my-2 flex cursor-pointer
                     hover:bg-[#477a53] hover:text-white gap-3 items-center bg-[#3EC65D] w-fit rounded-lg"
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

      <CallSummaryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={selectedCall}
      />
    </div>
  );
};

export default CallLog;
