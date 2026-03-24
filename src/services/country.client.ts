import { API } from "@/lib/axios";
import { AllCountriesResponse, CountriesResponse, CitiesResponse, CityOption, CountryOption, ProvincesResponse, ProvinceOption, Country } from "@/types/country";

export const fetchCountries = async (search: string = ""): Promise<CountryOption[]> => {
    try {
        if (search) {
            const res = await API.get<CountriesResponse>("/location/countries", {
                params: { search, page: 1, limit: 100 },
            });
            return res.data.data.items.map((country: Country) => ({
                value: country.id.toString(),
                label: country.name,
            }));
        }

        const res = await API.get<AllCountriesResponse>("/location/countries", {
            params: { paginate: false },
        });
        return res.data.data.map((country: Country) => ({
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
