import { API } from "@/lib/axios";
import { CountriesAllResponse, CitiesResponse, CityOption, CountryOption, ProvincesResponse, ProvinceOption } from "@/types/country";

/**
 * Fetches all countries at once (paginate=false) with optional search.
 */
export const fetchCountries = async (search: string = ""): Promise<CountryOption[]> => {
    try {
        const res = await API.get<CountriesAllResponse>("/location/countries", {
            params: { search, paginate: false },
        });

        return res.data.data.map((country) => ({
            value: country.id.toString(),
            label: country.name,
        }));
    } catch (error) {
        console.error("Failed to fetch countries:", error);
        return [];
    }
};

export const fetchProvinces = async (
    search: string = "",
    page: number = 1,
    limit: number = 100,
): Promise<{ options: ProvinceOption[]; hasMore: boolean }> => {
    try {
        const res = await API.get<ProvincesResponse>("/location/provinces", {
            params: { search, page, limit },
        });

        const { items, pagination } = res.data.data;

        return {
            options: items.map((p) => ({ value: p.id.toString(), label: p.name })),
            hasMore: page < pagination.totalPages,
        };
    } catch (error) {
        console.error("Failed to fetch provinces:", error);
        return { options: [], hasMore: false };
    }
};

export const fetchCities = async (
    search: string = "",
    provinceId?: number,
    page: number = 1,
    limit: number = 100,
): Promise<{ options: CityOption[]; hasMore: boolean }> => {
    try {
        const res = await API.get<CitiesResponse>("/location/cities", {
            params: { search, page, limit, ...(provinceId ? { provinceId } : {}) },
        });

        const { items, pagination } = res.data.data;

        return {
            options: items.map((c) => ({ value: c.id.toString(), label: c.name })),
            hasMore: page < pagination.totalPages,
        };
    } catch (error) {
        console.error("Failed to fetch cities:", error);
        return { options: [], hasMore: false };
    }
};
