import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { CONFIG } from '@/config';

export interface ApiError {
    code: string;
    message: string;
    details?: any;
    timestamp: string;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}

export class BaseApiService {
    protected client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: CONFIG.api.baseURL,
            timeout: CONFIG.api.timeout,
            headers: CONFIG.api.headers,
        });

        this.setupInterceptors();
    }

    private setupInterceptors() {
        // Request interceptor for auth token
        this.client.interceptors.request.use(
            (config) => {
                // Only access localStorage on client side
                if (typeof window !== 'undefined') {
                    const token = localStorage.getItem('auth_token');
                    if (token) {
                        config.headers.Authorization = `Bearer ${token}`;
                    }
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // Response interceptor for error handling
        this.client.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response?.status === 401 && typeof window !== 'undefined') {
                    // Token expired or invalid - only run on client side
                    localStorage.removeItem('auth_token');
                    localStorage.removeItem('user_data');
                    window.location.href = '/login';
                }
                return Promise.reject(this.handleError(error));
            }
        );
    }

    private handleError(error: any): ApiError {
        if (error.response) {
            // Server responded with error status
            return {
                code: error.response.data.code || 'HTTP_ERROR',
                message: error.response.data.message || error.response.data.error || error.response.data.detail || 'Server error',
                details: error.response.data.details,
                timestamp: new Date().toISOString(),
            };
        } else if (error.request) {
            // Request was made but no response received
            return {
                code: 'NETWORK_ERROR',
                message: 'Network error occurred',
                timestamp: new Date().toISOString(),
            };
        } else {
            // Something happened in setting up the request
            return {
                code: 'CLIENT_ERROR',
                message: error.message || 'Client error occurred',
                timestamp: new Date().toISOString(),
            };
        }
    }

    // HTTP Methods with generic types
    public async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        const response = await this.client.get<ApiResponse<T>>(url, config);
        return response.data;
    }

    public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        const response = await this.client.post<ApiResponse<T>>(url, data, config);
        return response.data;
    }

    public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        const response = await this.client.put<ApiResponse<T>>(url, data, config);
        return response.data;
    }

    public async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        const response = await this.client.patch<ApiResponse<T>>(url, data, config);
        return response.data;
    }

    public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        const response = await this.client.delete<ApiResponse<T>>(url, config);
        return response.data;
    }
}