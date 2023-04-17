import React from 'react';
import Video from './components/Video';
import SwitchMenu from './components/SwitchMenu';
import { useStreaming } from './components/useStreaming';
import { JanusObject } from './components/useStreaming';

const App: React.FC = () => {
  const streamingID = 5; // ここに適切なストリーミングIDを入力してください
  const debug = true;
  const janusObject: JanusObject = {
    streamingHandle: null,
    janusInstance: null,
    video: null,
    thumbnail: '',
    prepared: false,
    bitrate: 0,
  };

  const { videoElement } = useStreaming(debug, streamingID, janusObject);

  return (
    <div className="container d-flex flex-column align-items-center">
      <Video videoElement={videoElement} />
      <SwitchMenu />
    </div>
  );
};

export default App;
