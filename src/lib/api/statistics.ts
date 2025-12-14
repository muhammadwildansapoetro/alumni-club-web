/**
 * Statistics API Client
 * Handles all statistics-related API calls based on backend documentation
 */

import { apiClient } from './api-client';
import type {
    AlumniStatsPublicResponse,
    AlumniStatsDashboardResponse,
    AlumniSearchQuery,
    AlumniSearchResponse,
    JobStatsPublicResponse,
    JobStatsDashboardResponse,
    BusinessStatsPublicResponse,
    BusinessStatsDashboardResponse,
    AllStatsPublicResponse,
    AllStatsDashboardResponse,
    AlumniStatsQueryOptions,
    JobStatsQueryOptions,
    BusinessStatsQueryOptions,
    AllStatsQueryOptions,
    ApiResponse
} from '@/types/api';

/**
 * Build query string from options object
 */
function buildQueryString(options: Record<string, any> = {}): string {
    const params = new URLSearchParams();

    Object.entries(options).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            params.append(key, value.toString());
        }
    });

    const queryString = params.toString();
    return queryString ? `?${queryString}` : '';
}

/**
 * Alumni Statistics API
 */
export const alumniStatsApi = {
    /**
     * Get public alumni statistics
     */
    async getPublic(options: AlumniStatsQueryOptions = {}): Promise<ApiResponse<AlumniStatsPublicResponse>> {
        const queryString = buildQueryString(options);
        const response = await apiClient(`/statistics/alumni/public${queryString}`);
        return response.json();
    },

    /**
     * Get dashboard alumni statistics (requires authentication)
     */
    async getDashboard(options: AlumniStatsQueryOptions = {}): Promise<ApiResponse<AlumniStatsDashboardResponse>> {
        const queryString = buildQueryString(options);
        const response = await apiClient(`/statistics/alumni/dashboard${queryString}`);
        return response.json();
    },

    /**
     * Search and filter alumni data
     */
    async search(query: AlumniSearchQuery): Promise<ApiResponse<AlumniSearchResponse>> {
        // Set default values
        const searchParams = {
            page: 1,
            limit: 12,
            sortBy: 'name' as const,
            sortOrder: 'asc' as const,
            ...query
        };

        const queryString = buildQueryString(searchParams);
        const response = await apiClient(`/statistics/alumni/search${queryString}`);
        return response.json();
    }
};

/**
 * Job Statistics API
 */
export const jobStatsApi = {
    /**
     * Get public job statistics
     */
    async getPublic(options: JobStatsQueryOptions = {}): Promise<ApiResponse<JobStatsPublicResponse>> {
        const queryString = buildQueryString(options);
        const response = await apiClient(`/statistics/jobs/public${queryString}`);
        return response.json();
    },

    /**
     * Get dashboard job statistics (requires authentication)
     */
    async getDashboard(options: JobStatsQueryOptions = {}): Promise<ApiResponse<JobStatsDashboardResponse>> {
        const queryString = buildQueryString(options);
        const response = await apiClient(`/statistics/jobs/dashboard${queryString}`);
        return response.json();
    }
};

/**
 * Business Statistics API
 */
export const businessStatsApi = {
    /**
     * Get public business statistics
     */
    async getPublic(options: BusinessStatsQueryOptions = {}): Promise<ApiResponse<BusinessStatsPublicResponse>> {
        const queryString = buildQueryString(options);
        const response = await apiClient(`/statistics/businesses/public${queryString}`);
        return response.json();
    },

    /**
     * Get dashboard business statistics (requires authentication)
     */
    async getDashboard(options: BusinessStatsQueryOptions = {}): Promise<ApiResponse<BusinessStatsDashboardResponse>> {
        const queryString = buildQueryString(options);
        const response = await apiClient(`/statistics/businesses/dashboard${queryString}`);
        return response.json();
    }
};

/**
 * Combined Statistics API
 */
export const allStatsApi = {
    /**
     * Get public combined statistics from all modules
     */
    async getPublic(options: AllStatsQueryOptions = {}): Promise<ApiResponse<AllStatsPublicResponse>> {
        const queryString = buildQueryString(options);
        const response = await apiClient(`/statistics/all/public${queryString}`);
        return response.json();
    },

    /**
     * Get dashboard combined statistics from all modules (requires authentication)
     */
    async getDashboard(options: AllStatsQueryOptions = {}): Promise<ApiResponse<AllStatsDashboardResponse>> {
        const queryString = buildQueryString(options);
        const response = await apiClient(`/statistics/all/dashboard${queryString}`);
        return response.json();
    }
};

/**
 * Main statistics API object
 */
export const statisticsApi = {
    alumni: alumniStatsApi,
    jobs: jobStatsApi,
    businesses: businessStatsApi,
    all: allStatsApi
};

export default statisticsApi;