import React from 'react';
import SwitchButtonConeUnit from './SwitchButtonConeUnit';
import SwitchButtonLED from './SwitchButtonLED';

const SwitchMenu: React.FC = () => {
    return (
        <div className="container mt-4">
            <div className='row'>
                <div className='col'>
                    <h1 className='text-center'>
                        ConeUnit
                    </h1>
                    <SwitchButtonConeUnit />
                </div>
                <div className='col'>
                    <h1 className='text-center'>
                        LED
                    </h1>
                    <SwitchButtonLED />
                </div>
            </div>
        </div>
    );
};

export default SwitchMenu;
