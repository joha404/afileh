import { TbMicrophone } from "react-icons/tb";
import VolumeLevel from "./call/VolumeLevel";
import { MdCallEnd } from "react-icons/md";
import { BiSolidMicrophoneOff } from "react-icons/bi";

const ActiveCallDetail = ({ volumeLevel, onEndCallClick }) => {
  return (
    <div className=" -mt-12 ">
      <div className="flex flex-col items-center justify-center  ">
        {/* <AssistantSpeechIndicator isSpeaking={assistantIsSpeaking} /> */}
        <VolumeLevel volume={volumeLevel} />
      </div>
      <div className="flex gap-4 justify-between -mt-8">
        <div
          className="mt-4 text-center cursor-pointer h-14 w-14 bg-red-600 rounded-full flex justify-center items-center text-white text-2xl hover:bg-red-800"
          onClick={onEndCallClick}
        >
          <MdCallEnd />
        </div>
      </div>
    </div>
  );
};

export default ActiveCallDetail;
