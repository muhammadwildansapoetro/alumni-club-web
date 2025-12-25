// import { fetchAlumniDirectory } from "@/lib/api/alumni";
import AlumniPageClient from "./client";

// Make this page dynamic to avoid build-time data fetching
export const dynamic = 'force-dynamic';

export default async function AgriculturalEngineeringPage() {
    // Return empty data structure for now since alumni API is not implemented yet
    const initialAlumni = {
        users: [],
        items: [],
        pagination: {
            page: 1,
            limit: 10,
            total: 0,
            totalPages: 0,
        },
    };

    return <AlumniPageClient initialAlumni={initialAlumni} />;
}
