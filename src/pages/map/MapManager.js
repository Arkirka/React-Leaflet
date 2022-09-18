import DTMap from "./DTMap";
import React, {useState} from 'react';
import SidePanel from "./SidePanel";
import GrpcContainer from "./GrpcContainer";

const MapManager = (props) => {
    let [pinType, setPinType] = useState({
        category: "none",
        type: "none",
        color: "none",
        isUnique: false
    });
    let [categoriesProto, setCategoriesProto] = useState(null);
    let [figuresProto, setFiguresProto] = useState(null);
    let [isRemoveButtonActive, setRemoveButtonActive] = useState(false);
    function handleFigureCategoriesProto(categories) {
        setCategoriesProto(categories);
    }
    function handleFiguresProto(figures) {
        setFiguresProto(figures);
    }
    function handlePinTypeChange(pinType) {
        setPinType(pinType);
    }
    function handleRemoveButtonActive(isRemoveButtonActive) {
        setRemoveButtonActive(isRemoveButtonActive);
    }
    return (
        <div>
            <SidePanel categoriesProto={categoriesProto} pinType={pinType} handlePinTypeChange={handlePinTypeChange} isRemoveButtonActive={isRemoveButtonActive} handleRemoveButtonActive={handleRemoveButtonActive}/>
            <DTMap removeMarkerInfo={props.removeMarkerInfo} sendMarkerInfo={props.sendMarkerInfo} sendPolygonInfo={props.sendPolygonInfo} figuresProto={figuresProto} pinType={pinType} isRemoveButtonActive={isRemoveButtonActive}/>
            <GrpcContainer handleFigureCategoriesProto={handleFigureCategoriesProto} handleFiguresProto={handleFiguresProto}/>
        </div>

    );
}

export default MapManager;