"use client";

import {MapContainer, TileLayer} from "react-leaflet";
import "leaflet/dist/leaflet.css";

function LeafletMap({id, coordinates}) {
    return <div className="h-[600px] w-full">
        <MapContainer
            key = {id}
            center={coordinates}
            zoom={6}
            style={{height: "100%", width: "100%"}}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
        </MapContainer>
    </div>
}

export default LeafletMap;