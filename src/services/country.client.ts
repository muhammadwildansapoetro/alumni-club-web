import { API } from "@/lib/axios";
import { CountriesResponse, CountryOption } from "@/types/country";

/**
 * Fetches countries with pagination and search support
 * Used by AsyncSelect loadOptions function
 */
export const fetchCountries = async (
    search: string = "",
    page: number = 1,
    limit: number = 50,
): Promise<{ options: CountryOption[]; hasMore: boolean }> => {
    try {
        const res = await API.get<CountriesResponse>("/location/countries", {
            params: { search, page, limit },
        });

        console.log("res", res);

        const data = res.data.data;
        const options = data.countries.map((country) => ({
            value: country.id.toString(),
            label: country.name,
        }));

        return {
            options,
            hasMore: page < data.pagination.totalPages,
        };
    } catch (error) {
        console.error("Failed to fetch countries:", error);
        return { options: [], hasMore: false };
    }
};
