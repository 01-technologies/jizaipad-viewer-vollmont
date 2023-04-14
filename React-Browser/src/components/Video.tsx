import React, { useRef, useEffect } from 'react';

interface VideoProps {
  videoElement: HTMLVideoElement | null;
}

const Video: React.FC<VideoProps> = ({ videoElement }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoElement && videoRef.current) {
      videoRef.current.srcObject = videoElement.srcObject;
    }
  }, [videoElement]);

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline width="100%" height="auto" />
    </div>
  );
};

export default Video;
