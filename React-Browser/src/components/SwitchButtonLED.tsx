import React, { useState } from 'react';
import ApiLed from '../services/ApiLed';

const SwitchButtonLED: React.FC = () => {

    const [toggleState, setToggleState] = useState<boolean>(false);

    const handleToggle = () => {
      setToggleState(!toggleState);
    };
  
    const handleApiCallFailed = () => {
      setToggleState(false);
    };

    return (
        <>
            <div className="d-flex justify-content-center align-items-center gap-3 mt-3">
                <button
                    className={`btn ${toggleState ? 'btn-success' : 'btn-secondary'}`}
                    onClick={handleToggle}
                >
                    {toggleState ? 'LEDをオフにします' : 'LEDをオンにします'}
                </button>
            </div>
            <div className='text-center'>
                現在の状態: LEDは
                <span className='text-danger bold'>
                    {toggleState ? '点灯' : '消灯'}
                </span>
                しています
            </div>
            <ApiLed toggleState={toggleState} onApiCallFailed={handleApiCallFailed} />
        </>
    );
}

export default SwitchButtonLED;
