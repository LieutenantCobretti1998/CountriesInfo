"use client";

import {MapContainer, TileLayer} from "react-leaflet";
import "leaflet/dist/leaflet.css";

function LeafletMap({id}) {
    return <div key={id} style={{height: "400px", width: "100%"}}>
        <MapContainer
            key={id}
            center={[51.505, -0.09]} // Replace with your desired center
            zoom={5} // Replace with your desired zoom level
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