import lockImage from "../../assets/images/padlock.png";

function LockedModule({ isLocked, module2, AssignmentLevel }) {
  return (
    <div
      className="relative mt-10 rounded-lg overflow-hidden"
      style={isLocked ? { pointerEvents: "none", opacity: 0.5 } : {}}
    >
      {!isLocked && (
        <div className="absolute inset-0 z-10 bg-black/30 flex backdrop-blur-md justify-center items-center">
          <img src={lockImage} className="w-20 h-20 lg:w-44 lg:h-44" alt="" />
        </div>
      )}

      <div className="relative z-0">
        {module2.length === 0 ? (
          <p className="text-gray-500">No locked assistants available.</p>
        ) : (
          module2.map((assistant) => (
            <AssignmentLevel key={assistant.id} assistantInfo={assistant} />
          ))
        )}
      </div>
    </div>
  );
}

export default LockedModule;
