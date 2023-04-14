import React, { useState } from 'react';
import ApiConeUnit from '../services/ApiConeUnit';

const SwitchButtonConeUnit: React.FC = () => {

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
                    {toggleState ? 'ConeUnitを オフ にします' : 'ConeUnitを オン にします'}
                </button>
            </div>
            <div className='text-center'>
                現在の状態: ConeUnitは
                <span className='text-danger bold'>
                    {toggleState ? '稼働' : '停止'}
                </span>
                しています
            </div>
            <ApiConeUnit toggleState={toggleState} onApiCallFailed={handleApiCallFailed} />
        </>
    );
}

export default SwitchButtonConeUnit;
