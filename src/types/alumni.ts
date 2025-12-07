export interface AlumniDirectoryUser {
	id: string;
	name: string;
	email: string;
	profile: {
		fullName: string;
		department: string;
		classYear: number;
		city: string;
		industry: string;
		employmentLevel: string;
		jobTitle: string;
		companyName: string;
		linkedInUrl: string;
	};
	createdAt: string;
}

export interface AlumniDirectoryResponse {
	users: AlumniDirectoryUser[];
	pagination: {
		page: number;
		limit: number;
		total: number;
		totalPages: number;
	};
}

export interface AlumniFilters {
	search: string;
	department: string;
	classYear: number | null;
	city: string;
	industry: string;
}

export interface FilterOption {
	value: string;
	label: string;
}