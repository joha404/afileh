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
      <div className="flex justify-center -mt-8">
        <div
          onClick={onEndCallClick}
          className="mt-4 px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-lg font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 text-center inline-flex items-center justify-center cursor-pointer"
        >
          End Call
        </div>
      </div>
    </div>
  );
};

export default ActiveCallDetail;
