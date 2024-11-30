"use client";

import {MapContainer, TileLayer} from "react-leaflet";
import "leaflet/dist/leaflet.css";

function LeafletMap({id, coordinates, zoom}) {
    return <div className="h-[600px] w-full">
        <MapContainer
            key = {id}
            center={coordinates}
            zoom={zoom}
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