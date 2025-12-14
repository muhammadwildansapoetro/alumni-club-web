import { apiClient } from "./api-client";
import type { AlumniDirectoryResponse, AlumniFilters } from "@/types/alumni";

export async function fetchAlumniDirectory(
    page: number = 1,
    limit: number = 10,
    filters: Partial<AlumniFilters> = {},
): Promise<AlumniDirectoryResponse & { items: AlumniDirectoryResponse["users"] }> {
    const searchParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...Object.fromEntries(
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            Object.entries(filters).filter(([_, value]) => value !== undefined && value !== ""),
        ),
    });

    const response = await apiClient(`/alumni/directory?${searchParams}`);

    if (!response.ok) {
        throw new Error(`Failed to fetch alumni directory: ${response.statusText}`);
    }

    const data = await response.json();

    // Return data with both `users` and `items` properties for compatibility
    return {
        ...data,
        items: data.users || [],
    };
}
