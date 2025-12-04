import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { CONFIG } from '@/config';

// Simple API wrapper without complex service patterns
class ApiWrapper {
  private client: AxiosInstance;

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
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user_data');
          window.location.href = '/login';
        }
        return Promise.reject(this.handleError(error));
      }
    );
  }

  private handleError(error: any): any {
    if (error.response) {
      return {
        code: error.response.data.code || 'HTTP_ERROR',
        message: error.response.data.message || error.response.data.error || error.response.data.detail || 'Server error',
        details: error.response.data.details,
        timestamp: new Date().toISOString(),
      };
    } else if (error.request) {
      return {
        code: 'NETWORK_ERROR',
        message: 'Network error occurred',
        timestamp: new Date().toISOString(),
      };
    } else {
      return {
        code: 'CLIENT_ERROR',
        message: error.message || 'Client error occurred',
        timestamp: new Date().toISOString(),
      };
    }
  }

  async post(url: string, data?: any, config?: AxiosRequestConfig) {
    const response = await this.client.post(url, data, config);
    return response.data;
  }

  async get(url: string, config?: AxiosRequestConfig) {
    const response = await this.client.get(url, config);
    return response.data;
  }

  get axiosInstance() {
    return this.client;
  }
}

// Create a single instance
const apiWrapper = new ApiWrapper();

// Export wrapper functions
export const api = {
  auth: {
    login: async (email: string, password: string) => {
      return apiWrapper.post('/auth/login', { email, password });
    },
    register: async (userData: {
      email: string;
      password: string;
      name: string;
      department: string;
      classYear: number;
    }) => {
      return apiWrapper.post('/auth/register', userData);
    },
    logout: async () => {
      return apiWrapper.post('/auth/logout');
    },
    getCurrentUser: async () => {
      return apiWrapper.get('/auth/me');
    },
    refreshToken: async () => {
      return apiWrapper.post('/auth/refresh');
    },
    validateToken: (token: string): boolean => {
      try {
        const parts = token.split('.');
        if (parts.length !== 3) return false;

        const payload = JSON.parse(atob(parts[1]));
        const currentTime = Date.now() / 1000;

        return payload.exp > currentTime;
      } catch {
        return false;
      }
    },
  },
};

export const handleApiError = (error: any): string => {
  if (error?.code === 'NETWORK_ERROR') {
    return 'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.';
  }

  if (error?.code === 'HTTP_ERROR' && error?.message?.toLowerCase().includes('coba lagi')) {
    return 'Terlalu banyak percobaan. Silakan tunggu 15 menit sebelum mencoba lagi.';
  }

  return error?.message || 'Terjadi kesalahan yang tidak diketahui.';
};

export const isRateLimitError = (error: any): boolean => {
  return error?.code === 'HTTP_ERROR' &&
         (error?.message?.toLowerCase().includes('coba lagi') ||
          error?.message?.toLowerCase().includes('too many requests'));
};

export const apiClient = apiWrapper.axiosInstance;