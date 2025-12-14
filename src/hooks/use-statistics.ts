/**
 * Statistics React Hooks
 * Custom hooks for fetching and managing statistics data
 */

import { useState, useEffect, useCallback } from 'react';
import { statisticsApi } from '@/lib/api/statistics';
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
 * Generic hook interface
 */
interface UseApiResult<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

/**
 * Hook for fetching public alumni statistics
 */
export function useAlumniStatsPublic(options: AlumniStatsQueryOptions = {}): UseApiResult<AlumniStatsPublicResponse> {
    const [data, setData] = useState<AlumniStatsPublicResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const response: ApiResponse<AlumniStatsPublicResponse> = await statisticsApi.alumni.getPublic(options);

            if (response.success) {
                setData(response.data);
            } else {
                setError(response.message || 'Failed to fetch alumni statistics');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    }, [options]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
}

/**
 * Hook for fetching dashboard alumni statistics
 */
export function useAlumniStatsDashboard(options: AlumniStatsQueryOptions = {}): UseApiResult<AlumniStatsDashboardResponse> {
    const [data, setData] = useState<AlumniStatsDashboardResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const response: ApiResponse<AlumniStatsDashboardResponse> = await statisticsApi.alumni.getDashboard(options);

            if (response.success) {
                setData(response.data);
            } else {
                setError(response.message || 'Failed to fetch dashboard alumni statistics');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    }, [options]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
}

/**
 * Hook for alumni search and filtering
 */
export function useAlumniSearch(initialQuery: AlumniSearchQuery = {}) {
    const [data, setData] = useState<AlumniSearchResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [query, setQuery] = useState<AlumniSearchQuery>(initialQuery);

    const search = useCallback(async (searchQuery?: AlumniSearchQuery) => {
        try {
            setLoading(true);
            setError(null);

            const queryToUse = searchQuery || query;
            const response: ApiResponse<AlumniSearchResponse> = await statisticsApi.alumni.search(queryToUse);

            if (response.success) {
                setData(response.data);
            } else {
                setError(response.message || 'Failed to search alumni');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    }, [query]);

    const updateQuery = useCallback((newQuery: Partial<AlumniSearchQuery>) => {
        setQuery(prev => ({ ...prev, ...newQuery }));
    }, []);

    const resetQuery = useCallback(() => {
        setQuery(initialQuery);
    }, [initialQuery]);

    const goToPage = useCallback((page: number) => {
        const newQuery = { ...query, page };
        setQuery(newQuery);
        return search(newQuery);
    }, [query, search]);

    // Auto-search when query changes
    useEffect(() => {
        if (query.page !== undefined) {
            search();
        }
    }, [query.search, query.department, query.classYearFrom, query.classYearTo,
        query.city, query.industry, query.employmentLevel, query.sortBy, query.sortOrder]);

    return {
        data,
        loading,
        error,
        query,
        updateQuery,
        resetQuery,
        search,
        goToPage,
        refetch: () => search()
    };
}

/**
 * Hook for fetching public job statistics
 */
export function useJobStatsPublic(options: JobStatsQueryOptions = {}): UseApiResult<JobStatsPublicResponse> {
    const [data, setData] = useState<JobStatsPublicResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const response: ApiResponse<JobStatsPublicResponse> = await statisticsApi.jobs.getPublic(options);

            if (response.success) {
                setData(response.data);
            } else {
                setError(response.message || 'Failed to fetch job statistics');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    }, [options]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
}

/**
 * Hook for fetching dashboard job statistics
 */
export function useJobStatsDashboard(options: JobStatsQueryOptions = {}): UseApiResult<JobStatsDashboardResponse> {
    const [data, setData] = useState<JobStatsDashboardResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const response: ApiResponse<JobStatsDashboardResponse> = await statisticsApi.jobs.getDashboard(options);

            if (response.success) {
                setData(response.data);
            } else {
                setError(response.message || 'Failed to fetch dashboard job statistics');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    }, [options]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
}

/**
 * Hook for fetching public business statistics
 */
export function useBusinessStatsPublic(options: BusinessStatsQueryOptions = {}): UseApiResult<BusinessStatsPublicResponse> {
    const [data, setData] = useState<BusinessStatsPublicResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const response: ApiResponse<BusinessStatsPublicResponse> = await statisticsApi.businesses.getPublic(options);

            if (response.success) {
                setData(response.data);
            } else {
                setError(response.message || 'Failed to fetch business statistics');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    }, [options]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
}

/**
 * Hook for fetching dashboard business statistics
 */
export function useBusinessStatsDashboard(options: BusinessStatsQueryOptions = {}): UseApiResult<BusinessStatsDashboardResponse> {
    const [data, setData] = useState<BusinessStatsDashboardResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const response: ApiResponse<BusinessStatsDashboardResponse> = await statisticsApi.businesses.getDashboard(options);

            if (response.success) {
                setData(response.data);
            } else {
                setError(response.message || 'Failed to fetch dashboard business statistics');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    }, [options]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
}

/**
 * Hook for fetching public combined statistics
 */
export function useAllStatsPublic(options: AllStatsQueryOptions = {}): UseApiResult<AllStatsPublicResponse> {
    const [data, setData] = useState<AllStatsPublicResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const response: ApiResponse<AllStatsPublicResponse> = await statisticsApi.all.getPublic(options);

            if (response.success) {
                setData(response.data);
            } else {
                setError(response.message || 'Failed to fetch combined statistics');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    }, [options]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
}

/**
 * Hook for fetching dashboard combined statistics
 */
export function useAllStatsDashboard(options: AllStatsQueryOptions = {}): UseApiResult<AllStatsDashboardResponse> {
    const [data, setData] = useState<AllStatsDashboardResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const response: ApiResponse<AllStatsDashboardResponse> = await statisticsApi.all.getDashboard(options);

            if (response.success) {
                setData(response.data);
            } else {
                setError(response.message || 'Failed to fetch combined dashboard statistics');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    }, [options]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
}

/**
 * Hook for real-time statistics updates
 */
export function useRealTimeStats(refreshInterval: number = 300000) { // 5 minutes default
    const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
    const publicStats = useAllStatsPublic();
    const [isRealTimeEnabled, setIsRealTimeEnabled] = useState<boolean>(true);

    useEffect(() => {
        if (!isRealTimeEnabled) return;

        const interval = setInterval(() => {
            publicStats.refetch();
            setLastUpdate(new Date());
        }, refreshInterval);

        return () => clearInterval(interval);
    }, [refreshInterval, isRealTimeEnabled, publicStats.refetch]);

    return {
        ...publicStats,
        lastUpdate,
        isRealTimeEnabled,
        toggleRealTime: () => setIsRealTimeEnabled(prev => !prev)
    };
}