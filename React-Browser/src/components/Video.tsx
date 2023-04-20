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
      {videoElement ? (
        <video ref={videoRef} autoPlay playsInline width="1280" height="720" />
      ) : (
        <div
          style={{ width: '1280', height: '720', textAlign: 'center', backgroundColor: '#f0f0f0' }}
        >
          <p style={{ padding: '1em' }}>ビデオが利用できません</p>
        </div>
      )}
    </div>
  );
};

export default Video;
