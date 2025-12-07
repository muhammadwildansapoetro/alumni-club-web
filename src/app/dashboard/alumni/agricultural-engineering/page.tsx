import { fetchAlumniDirectory } from "@/lib/api/alumni";
import AlumniPageClient from "./client";

// Make this page dynamic to avoid build-time data fetching
export const dynamic = 'force-dynamic';

export default async function AgriculturalEngineeringPage() {
    try {
        const initialAlumni = await fetchAlumniDirectory(1, 10, {
            department: "TEP",
        });

        return <AlumniPageClient initialAlumni={initialAlumni} />;
    } catch (error) {
        // Handle fetch errors gracefully
        console.error('Failed to fetch alumni data:', error);

        // Return empty data structure if fetch fails
        const emptyAlumni = {
            users: [],
            items: [],
            pagination: {
                page: 1,
                limit: 10,
                total: 0,
                totalPages: 0,
            },
        };

        return <AlumniPageClient initialAlumni={emptyAlumni} />;
    }
}
