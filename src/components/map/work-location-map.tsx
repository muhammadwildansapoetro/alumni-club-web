"use client";

import dynamic from "next/dynamic";

// dynamic import, pastikan ssr: false
const WorkLocationMapContainer = dynamic(() => import("@/components/map/work-location-map-container"), {
    ssr: false,
});

export default function WorkLocationMap() {
    return (
        <div className="space-y-1">
            <h2 className="text-lg font-bold">Lokasi Kerja</h2>
            <WorkLocationMapContainer />
        </div>
    );
}
