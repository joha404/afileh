import { useState, useEffect } from "react";
import padLock from "../assets/images/padLock.png";
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
  const [levelup1, setLevelup1] = useState(false);
  const [levelup2, setLevelup2] = useState(false);
  const [levelup3, setLevelup3] = useState(false);
  const [levelup4, setLevelup4] = useState(false);
  const [levelup5, setLevelup5] = useState(false);
  const [levelup6, setLevelup6] = useState(false);

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

  const module1 = assistantInfo.slice(0, 3);
  const module2 = assistantInfo.slice(3, 6);

  return (
    <>
      {/* Module 1 */}
      <div>
        {assistantInfo.length === 0 ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          <>
            <h1 className="text-2xl mb-4 text-left font-semibold">Module 1</h1>
            {module1.map((assistant, index) => (
              <AssignmentLevel
                key={assistant.id}
                assistantInfo={assistant}
                setLevelup={
                  index === 0
                    ? setLevelup1
                    : index === 1
                    ? setLevelup2
                    : setLevelup3
                }
              />
            ))}
          </>
        )}
      </div>

      {/* Module 2 - Locked */}
      <h1 className="text-2xl mt-8 mb-4 font-semibold text-left">Module 2</h1>
      <div className="relative mt-10 select-none pointer-events-none rounded-lg overflow-hidden">
        <div className="absolute inset-0 z-1 bg-black/20 backdrop-blur-xs flex justify-center items-center">
          <img src={padLock} alt="Locked" className="w-20 h-20" />
        </div>
        <div className="relative z-0 opacity-50">
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
                assistantInfo={assistantInfo}
                setLevelup={
                  index === 0
                    ? setLevelup4
                    : index === 1
                    ? setLevelup5
                    : setLevelup6
                }
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Assignment;
