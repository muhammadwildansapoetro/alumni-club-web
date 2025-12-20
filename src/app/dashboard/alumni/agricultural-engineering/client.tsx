"use client";

import type { AlumniDirectoryResponse } from "@/types/alumni";

interface AlumniDirectoryResponseWithItems extends AlumniDirectoryResponse {
    items: AlumniDirectoryResponse["users"];
}

interface ClientAlumniPageProps {
    initialAlumni: AlumniDirectoryResponseWithItems;
}

export default function ClientAlumniPage({ initialAlumni }: ClientAlumniPageProps) {
    const alumni = initialAlumni;

    return (
        <div>
            {alumni.items.map((a) => (
                <div key={a.id}>{a.name}</div>
            ))}
        </div>
    );
}
