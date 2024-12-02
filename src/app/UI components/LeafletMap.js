"use client";

import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const customIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
    iconSize: [20, 20],
    iconAnchor: [12, 41],
})

function LeafletMap({id, coordinates, zoom}) {
    return <div className="h-[600px] w-full">
        <MapContainer
            className="rounded-md"
            key = {id}
            center={coordinates}
            zoom={zoom}
            style={{height: "100%", width: "100%"}}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={coordinates} icon={customIcon}>
                <Popup>
                    {id}
                </Popup>
            </Marker>
        </MapContainer>
    </div>
}

export default LeafletMap;