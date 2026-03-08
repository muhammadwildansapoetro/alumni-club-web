export interface Country {
    id: number;
    name: string;
    code: string;
}

export interface Province {
    id: number;
    name: string;
    code: string | null;
    countryId: number | null;
}

export interface City {
    id: number;
    name: string;
    code: string | null;
    provinceId: number;
}

interface PaginationMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface CountriesResponse {
    success: boolean;
    message: string;
    data: {
        items: Country[];
        pagination: PaginationMeta;
    };
}

export interface CountriesAllResponse {
    success: boolean;
    message: string;
    data: Country[];
}

export interface ProvincesResponse {
    success: boolean;
    message: string;
    data: {
        items: Province[];
        pagination: PaginationMeta;
    };
}

export interface CitiesResponse {
    success: boolean;
    message: string;
    data: {
        items: City[];
        pagination: PaginationMeta;
    };
}

export type CountryOption = { value: string; label: string };
export type ProvinceOption = { value: string; label: string };
export type CityOption = { value: string; label: string };
