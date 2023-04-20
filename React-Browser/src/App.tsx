import React from 'react';
import Video from './components/Video';
import SwitchMenu from './components/SwitchMenu';
import { useStreaming } from './components/useStreaming';

const App: React.FC = () => {
  const streamingID = 5; // ここに適切なストリーミングIDを入力してください
  const debug = true;

  const videoElement = useStreaming(debug, streamingID);

  return (
    <div className="container d-flex flex-column align-items-center">
      <Video videoElement={videoElement} />
      <SwitchMenu />
    </div>
  );
};

export default App;
