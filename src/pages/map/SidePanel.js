import React from "react";
import { GiWheat } from "react-icons/gi";
import {MdRemoveCircleOutline} from "react-icons/md";
import SidePanelCanvas from "./SidePanelCanvas";
import './SidePanel.css';

const elements = [{
        type: "wheat",
        color: 'yellow',
        icon: <GiWheat className='icon'/>
    },
    {
        type: "iot",
        color: 'blue',
        icon: <GiWheat className='icon'/>
    },];

class SidePanel extends React.Component{
    render() {
        return (
            <SidePanelCanvas>
                <ul>
                    {
                        elements.map((el, index) => {
                            return(
                                <li key={index}>
                                    <button onClick={() => this.props.handlePinTypeChange({color: el.color, type: el.type})} >
                                        {el.icon}
                                    </button>
                                </li>
                            )
                        })
                    }
                    <li style={{marginTop: '80%'}}>
                        <button onClick={() => this.props.handleRemoveButtonActive(!this.props.isRemoveButtonActive)}><MdRemoveCircleOutline className='icon'/></button>
                    </li>
                </ul>
            </SidePanelCanvas>
        );
    }
}

export default SidePanel;