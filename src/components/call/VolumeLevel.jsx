import React, { useEffect, useRef, useState } from "react";
import voiceJson from "../../utils/voice.json";
import Lottie from "lottie-react";

const VolumeLevel = ({ volume }) => {
  const lottieRef = useRef();
  const [frameCount, setFrameCount] = useState(0);

  useEffect(() => {
    if (lottieRef.current && lottieRef.current.getDuration) {
      const totalFrames = lottieRef.current.getDuration(true);
      setFrameCount(totalFrames);
    }
  }, []);

  useEffect(() => {
    if (frameCount > 0 && lottieRef.current) {
      const normalized = Math.min(Math.max(volume, 0), 1);
      const targetFrame = Math.floor(normalized * frameCount);
      lottieRef.current.goToAndStop(targetFrame, true);
    }
  }, [volume, frameCount]);

  return (
    <div className="p-4 flex flex-col items-center justify-center">
      <Lottie
        lottieRef={lottieRef}
        animationData={voiceJson}
        loop={false}
        autoplay={false}
        style={{ width: 120, height: 120 }}
      />
    </div>
  );
};

export default VolumeLevel;
