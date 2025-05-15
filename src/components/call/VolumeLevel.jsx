import React from "react";

const numBars = 10;

const VolumeLevel = ({ volume }) => {
  return (
    <div className="p-4">
      <div className="text-black mb-2">
        <p className="text-lg font-semibold">Volume Level:</p>
      </div>
      <div className="flex mb-3 space-x-1">
        {Array.from({ length: numBars }, (_, i) => (
          <div
            key={i}
            className={`w-4 h-4 rounded-md transition-all duration-300 ${
              i / numBars < volume ? "bg-green-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
      <div className="text-black text-lg font-semibold">{volume}</div>
    </div>
  );
};

export default VolumeLevel;
