import { useState, useEffect } from "react";
import padLock from "../assets/images/padLock.png";
import { getAllCalls } from "@/components/api/callLog";
import AssignmentLevel from "@/components/Asssignment/AssignmentLevel";
import { getAssistantById } from "@/components/api/assistant";
import Swal from "sweetalert2";

const SkeletonCard = () => (
  <div className="w-full flex flex-col gap-5 justify-start items-start rounded-xl sm:p-5 p-3 bg-[#EEF2F5] animate-pulse">
    <div className="w-full flex xl:flex-row flex-col sm:gap-6 gap-3 xl:justify-left xl:items-left p-3 bg-[#FAFAFA] rounded-lg">
      <div className="sm:min-w-[147px] h-[158px] bg-gray-300 rounded-lg" />
      <div className="w-full flex flex-col gap-2">
        <div className="h-6 bg-gray-300 rounded w-3/9" />
        <div className="h-4 bg-gray-300 rounded w-full" />
        <div className="h-4 bg-gray-300 rounded w-full" />
        <div className="h-4 bg-gray-300 rounded w-full" />
        <div className="h-4 bg-gray-300 rounded w-full" />
      </div>
      <div className="flex w-[300px] flex-col xl:items-end gap-3">
        <div className="h-5 bg-gray-300 rounded w-1/2" />
        <div className="h-10 bg-gray-300 rounded w-full" />
      </div>
    </div>
  </div>
);

const Assignment = () => {
  const [callLogAll, setCallLogAll] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [assistantList, setAssistantList] = useState(null);
  const [assistantList2, setAssistantList2] = useState(null);

  const [isLevelup1, setLevelup1] = useState(0);
  const [isLevelup2, setLevelup2] = useState(0);
  const [isLevelup3, setLevelup3] = useState(0);
  const [isLevelup4, setLevelup4] = useState(0);
  const [isLevelup5, setLevelup5] = useState(0);
  const [isLevelup6, setLevelup6] = useState(0);

  const [assistantIds, setAssistantIds] = useState([
    "bc79f469-6e0f-4f02-bfdc-86647aebc955",
    "30029f61-2307-44a9-9ed9-cc091045fb97",
    "50ed1ab8-8544-4622-9ea0-7902a788fdb6",
  ]);

  const [assistantIds2, setAssistantIds2] = useState([
    "e696043a-4f9f-4f70-903f-4581bc267ed3",
    "b50c3418-0da0-4e5b-8f69-c4d792a66a11",
    "7386de9d-5e8f-40c9-9977-cafa1a9a7728",
    "cb1a980c-73be-4aeb-a051-e61d40262a00",
  ]);

  // Fetch Module 1 assistants
  useEffect(() => {
    const fetchAssistants = async () => {
      try {
        const data = await Promise.all(
          assistantIds.map((id) => getAssistantById(id))
        );
        setAssistantList(data);
      } catch (error) {
        console.error("Error fetching assistants:", error);
      }
    };

    fetchAssistants();
  }, [assistantIds]);

  // Fetch Module 2 assistants
  useEffect(() => {
    const fetchAssistants2 = async () => {
      try {
        const data = await Promise.all(
          assistantIds2.map((id) => getAssistantById(id))
        );
        setAssistantList2(data);
      } catch (error) {
        console.error("Error fetching assistants for Module 2:", error);
      }
    };

    if (assistantIds2.length > 0) {
      fetchAssistants2();
    }
  }, [assistantIds2]);

  // Fetch call logs
  useEffect(() => {
    const fetchCallLog = async () => {
      setLoading(true);
      setError("");
      try {
        const allCallLog = await getAllCalls();
        setCallLogAll(Array.isArray(allCallLog) ? allCallLog : []);
      } catch (err) {
        setError("Failed to load call logs. Please try again.");
      }
      setLoading(false);
    };

    fetchCallLog();
  }, []);

  useEffect(() => {
    const updatedIds = [...assistantIds];
    const updatedIds2 = [...assistantIds2];
    let changed = false;

    const levelUps = [
      { score: isLevelup1, index: 0 },
      { score: isLevelup2, index: 1 },
      { score: isLevelup3, index: 2 },
    ];

    const promotedIndices = new Set();

    for (let { score, index } of levelUps) {
      if (score > 99 && !promotedIndices.has(index)) {
        if (updatedIds2.length > 0) {
          updatedIds.splice(index, 1);
          const newAssistant = updatedIds2.shift();
          updatedIds.splice(index, 0, newAssistant);
          promotedIndices.add(index);
          changed = true;

          Swal.fire({
            title: "Level Up!",
            text: "New assistant promoted.",
            icon: "success",
          });
        }
      }
    }

    if (changed) {
      setAssistantIds(updatedIds);
      setAssistantIds2(updatedIds2);

      // Reset all levelup values temporarily to ensure re-fetch of scores
      if (promotedIndices.has(0)) setLevelup1(0);
      if (promotedIndices.has(1)) setLevelup2(0);
      if (promotedIndices.has(2)) setLevelup3(0);
    }
  }, [isLevelup1, isLevelup2, isLevelup3]);

  return (
    <>
      {/* Module 1 */}
      <div>
        {!assistantList ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          <>
            <h1 className="text-2xl mb-4 text-left font-semibold">Module 1</h1>
            <AssignmentLevel
              assistantInfo={assistantList[0]}
              setLevelup={setLevelup1}
            />
            <AssignmentLevel
              assistantInfo={assistantList[1]}
              setLevelup={setLevelup2}
            />
            <AssignmentLevel
              assistantInfo={assistantList[2]}
              setLevelup={setLevelup3}
            />
          </>
        )}
      </div>

      {/* Module 2 - Locked */}
      <h1 className="text-2xl mt-8 mb-4 font-semibold text-left">Module 2</h1>
      <div className="relative mt-10 select-none pointer-events-none rounded-lg overflow-hidden">
        <div className="absolute inset-0 z-1 bg-black/20 backdrop-blur-xs flex justify-center items-center">
          <img src={padLock} alt="Locked" className="w-20 h-20 " />
        </div>
        <div className="relative z-0 opacity-50 ">
          {!assistantList2 ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            <>
              <AssignmentLevel
                assistantInfo={assistantList2[0]}
                setLevelup={setLevelup4}
              />
              <AssignmentLevel
                assistantInfo={assistantList2[1]}
                setLevelup={setLevelup5}
              />
              <AssignmentLevel
                assistantInfo={assistantList2[2]}
                setLevelup={setLevelup6}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Assignment;
