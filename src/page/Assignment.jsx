import { useState, useEffect } from "react";
import AssignmentLevel from "@/components/Asssignment/AssignmentLevel";
import { getAllAssignment } from "@/components/api/assignment";
import LockedModule from "@/components/Asssignment/LockedModule";

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
  const [assistantInfo, setAssistantInfo] = useState(null);

  const fetchAssignment = async () => {
    try {
      const res = await getAllAssignment();
      setAssistantInfo(res.data);
    } catch (error) {
      console.error("Error fetching assignments:", error);
      setAssistantInfo([]);
    }
  };

  useEffect(() => {
    fetchAssignment();
  }, []);

  if (!assistantInfo) {
    // Loading state
    return (
      <>
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </>
    );
  }

  // Filter helpers: convert string "true"/"false" to boolean
  const isUnlocked = (val) =>
    val === true || val === "true" || val === 1 || val === "1";

  // Partition assistants by unlocked state (handle strings/booleans)
  const module1 = assistantInfo.filter((assistant) =>
    isUnlocked(assistant.unlocked)
  );
  const module2 = assistantInfo.filter(
    (assistant) => !isUnlocked(assistant.unlocked)
  );

  const isModule2Unlocked = module1.length > 0;

  return (
    <>
      {/* Module 1 */}
      <div>
        <h1 className="text-2xl mb-4 text-left font-semibold">Module 1</h1>
        {module1.length === 0 ? (
          <p className="text-gray-500">No unlocked assistants available.</p>
        ) : (
          module1.map((assistant) => (
            <AssignmentLevel key={assistant.id} assistantInfo={assistant} />
          ))
        )}
      </div>

      {/* Module 2 */}
      <h1 className="text-2xl mt-8 mb-4 font-semibold text-left">Module 2</h1>
      <LockedModule
        isLocked={!isModule2Unlocked}
        module2={module2}
        AssignmentLevel={AssignmentLevel}
      />
    </>
  );
};

export default Assignment;
