import { authService } from '@/services/auth.service';
import { ApiResponse } from '@/services/base-api.service';
import { handleApiError, isRateLimitError } from './api-utils';

// Reusable API functions for components
export const api = {
  // Auth functions
  auth: {
    login: (email: string, password: string) =>
      authService.login({ email, password }),
    register: (userData: {
      email: string;
      password: string;
      name: string;
      department: string;
      classYear: number;
    }) =>
      authService.register(userData),
    logout: () =>
      authService.logout(),
    getCurrentUser: () =>
      authService.getCurrentUser(),
    refreshToken: () =>
      authService.refreshToken(),
    validateToken: (token: string) =>
      authService.validateToken(token),
  },

  // Generic request function for one-off calls
  request: async <T>(
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    url: string,
    data?: any,
    config?: any
  ): Promise<ApiResponse<T>> => {
    switch (method) {
      case 'GET':
        return authService.get<T>(url, config);
      case 'POST':
        return authService.post<T>(url, data, config);
      case 'PUT':
        return authService.put<T>(url, data, config);
      case 'PATCH':
        return authService.patch<T>(url, data, config);
      case 'DELETE':
        return authService.delete<T>(url, config);
      default:
        throw new Error(`Unsupported method: ${method}`);
    }
  },

  // Direct access to axios instance for advanced usage
  client: authService['client'],
};

// Export error handling utilities
export { handleApiError, isRateLimitError };

// Legacy export for backward compatibility
export const apiClient = authService['client'];