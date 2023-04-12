import React from 'react';
import Video from './components/Video';
import SwitchMenu from './components/SwitchMenu';

const App: React.FC = () => {
  return (
    <div className="container d-flex flex-column align-items-center">
      <Video/>
      <SwitchMenu/>
    </div>
  );
};

export default App;
