"use client";

import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";
import { AlumniDataDummy } from "@/data/dummy/alumni";
import { MapPin } from "lucide-react";
import ReactDOMServer from "react-dom/server";

const getMajorColor = (major: string) => {
    switch (major) {
        case "tep":
            return "#16a34a";
        case "tpn":
            return "#dc2626";
        case "tin":
            return "#ea580c";
        default:
            return "#4b5563";
    }
};

const createLucideIcon = (color: string) =>
    L.divIcon({
        html: ReactDOMServer.renderToString(<MapPin size={28} color={color} strokeWidth={2.5} />),
        className: "lucide-marker",
        iconSize: [10, 10],
        iconAnchor: [14, 28],
    });

export default function WorkLocationMapContainer() {
    const [geoData, setGeoData] = useState(null);

    useEffect(() => {
        fetch("/geojson/indonesia-province.geojson")
            .then((r) => r.json())
            .then((d) => setGeoData(d));
    }, []);

    return (
        <MapContainer center={[-2.5, 118]} zoom={5} style={{ height: "400px", width: "100%" }} className="rounded-xl">
            <TileLayer url="https://cartodb-basemaps-a.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}.png" />

            {geoData && (
                <GeoJSON
                    data={geoData}
                    style={() => ({
                        color: "#555",
                        weight: 1.2,
                        fillOpacity: 0,
                    })}
                />
            )}

            {AlumniDataDummy.map((alumni) => (
                <Marker key={alumni.id} position={[alumni.lat, alumni.lng]} icon={createLucideIcon(getMajorColor(alumni.major))}>
                    <Popup>{alumni.name}</Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
