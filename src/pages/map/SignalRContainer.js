import React, {useEffect, useState} from "react";
import {HubConnectionBuilder, JsonHubProtocol} from "@microsoft/signalr";
import DTMap from "./DTMap";
import MapManager from "./MapManager";
import ServerLinks from "../../util/ServerLinks";
const SignalRContainer = () => {
    const [ connection, setConnection ] = useState(null);

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl(ServerLinks.MAP_MICROSERVICE_SIGNALR_HUB)
            .withAutomaticReconnect()
            .withHubProtocol(new JsonHubProtocol())
            .build();
        setConnection(newConnection);
        newConnection.start();
    }, []);

    const sendPolygonsInfos = async ( polygonsInfo) => {
        if (connection._connectionStarted) {
            try {
                await connection.invoke("SendPolygonsInfo", polygonsInfo);
            }
            catch(e) {
                console.log(e);
            }
        }
        else {
            alert('No connection to server yet.');
        }
    }

    const sendMarkerInfo = async ( markerInfo) => {
        /*await sendByMethod('Send', polygonsInfo);*/
        if (connection._connectionStarted) {
            try {
                await connection.invoke("SendMarkerInfo", markerInfo);
            }
            catch(e) {
                console.log(e);
            }
        }
        else {
            alert('No connection to server yet.');
        }
    }

    const removeMarkerInfo = async ( markerInfo) => {
        if (connection._connectionStarted) {
            try {
                await connection.invoke("RemoveMarkerInfo", markerInfo);
            }
            catch(e) {
                console.log(e);
            }
        }
        else {
            alert('No connection to server yet.');
        }
    }


    return <MapManager removeMarkerInfo={removeMarkerInfo} sendMarkerInfo={sendMarkerInfo} sendPolygonInfo={sendPolygonsInfos}> </ MapManager>
}

export default SignalRContainer;