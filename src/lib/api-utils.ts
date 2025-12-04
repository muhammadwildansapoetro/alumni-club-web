import { ApiError } from '@/services/base-api.service';

// Error handling helper
export const handleApiError = (error: any): string => {
    if (error?.code === 'NETWORK_ERROR') {
        return 'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.';
    }

    if (error?.code === 'HTTP_ERROR' && error?.message?.toLowerCase().includes('coba lagi')) {
        return 'Terlalu banyak percobaan. Silakan tunggu 15 menit sebelum mencoba lagi.';
    }

    return error?.message || 'Terjadi kesalahan yang tidak diketahui.';
};

// Check if error is rate limiting
export const isRateLimitError = (error: any): boolean => {
    return error?.code === 'HTTP_ERROR' &&
           (error?.message?.toLowerCase().includes('coba lagi') ||
            error?.message?.toLowerCase().includes('too many requests'));
};

// Generic API error class for better error handling
export class ApiRequestError extends Error {
    public code: string;
    public details?: any;
    public timestamp: string;

    constructor(error: ApiError) {
        super(error.message);
        this.name = 'ApiRequestError';
        this.code = error.code;
        this.details = error.details;
        this.timestamp = error.timestamp;
    }
}