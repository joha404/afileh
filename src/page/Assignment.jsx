import { useState, useEffect } from "react";
import { CiLock } from "react-icons/ci";
import AssignmentLevel from "@/components/Asssignment/AssignmentLevel";
import { getAllAssignment } from "@/components/api/assignment";

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
  const [assistantInfo, setAssistantInfo] = useState([]);
  const [levelups, setLevelups] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const fetchAssignment = async () => {
    try {
      const res = await getAllAssignment();
      setAssistantInfo(res.data);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  useEffect(() => {
    fetchAssignment();
  }, []);

  const handleLevelUp = (index) => {
    const updated = [...levelups];
    updated[index] = true;
    setLevelups(updated);
  };

  const isModule2Unlocked = levelups.slice(0, 3).every((lvl) => lvl === true);

  const module1 = assistantInfo.slice(0, 3);
  const module2 = assistantInfo.slice(3, 6);

  return (
    <>
      {/* Module 1 */}
      <div>
        <h1 className="text-2xl mb-4 text-left font-semibold">Module 1</h1>
        {assistantInfo.length === 0 ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          module1.map((assistant, index) => (
            <AssignmentLevel
              key={assistant.id}
              assistantInfo={assistant}
              setLevelup={() => handleLevelUp(index)}
            />
          ))
        )}
      </div>

      {/* Module 2 */}
      <h1 className="text-2xl mt-8 mb-4 font-semibold text-left">Module 2</h1>
      <div
        className={`relative mt-10 rounded-lg overflow-hidden ${
          !isModule2Unlocked ? "select-none pointer-events-none opacity-50" : ""
        }`}
      >
        {!isModule2Unlocked && (
          <div className="absolute inset-0 z-10 bg-black/20 backdrop-blur-sm flex justify-center items-center">
            <CiLock size={32} className="text-white" />
          </div>
        )}
        <div className="relative z-0">
          {assistantInfo.length === 0 ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            module2.map((assistant, index) => (
              <AssignmentLevel
                key={assistant.id}
                assistantInfo={assistant}
                setLevelup={() => handleLevelUp(index + 3)}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Assignment;
