export interface Country {
    id: number;
    name: string;
    code: string;
}

export interface CountriesResponse {
    success: boolean;
    message: string;
    data: {
        countries: Country[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    };
}

export type CountryOption = {
    value: string;
    label: string;
};
