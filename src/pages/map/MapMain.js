import DTMap from "./DTMap";
import React, {useState} from 'react';
import SidePanel from "./SidePanel";

const MapMain = () => {
    let [pinType, setPinType] = useState({
        color: 'blue',
        type: 'none'
    });
    let [isRemoveButtonActive, setRemoveButtonActive] = useState(false);
    function handlePinTypeChange(pinType) {
        setPinType(pinType);
    }
    function handleRemoveButtonActive(isRemoveButtonActive) {
        setRemoveButtonActive(isRemoveButtonActive);
    }
    return (
        <div>
            <SidePanel handlePinTypeChange={handlePinTypeChange} isRemoveButtonActive={isRemoveButtonActive} handleRemoveButtonActive={handleRemoveButtonActive}/>
            <DTMap pinType={pinType} isRemoveButtonActive={isRemoveButtonActive}/>
        </div>

    );


}

export default MapMain;