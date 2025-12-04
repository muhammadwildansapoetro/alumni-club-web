import { BaseApiService } from './base-api.service';
import { User } from '@/stores/auth.store';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
    expiresIn: string;
  };
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  department: string;
  classYear: number;
}

export interface RegisterResponse {
  success: boolean;
  message?: string;
  data?: any;
}

export interface RefreshTokenResponse {
  token: string;
}

export class AuthService extends BaseApiService {
  private static instance: AuthService;

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await this.post<LoginResponse['data']>('/auth/login', {
      email: credentials.email,
      password: credentials.password,
    });

    return {
      success: true,
      message: 'Login successful',
      data: response.data,
    };
  }

  async register(userData: RegisterRequest): Promise<RegisterResponse> {
    const response = await this.post<any>('/auth/register', userData);
    return response;
  }

  async refreshToken(): Promise<RefreshTokenResponse> {
    const response = await this.post<RefreshTokenResponse>('/auth/refresh');
    return response.data;
  }

  async logout(): Promise<void> {
    try {
      await this.post('/auth/logout');
    } catch {
      // Continue with client-side logout even if server logout fails
      // Error is already handled by base service
    }
  }

  validateToken(token: string): boolean {
    try {
      // Basic JWT token validation
      const parts = token.split('.');
      if (parts.length !== 3) return false;

      // Decode payload to check expiration
      const payload = JSON.parse(atob(parts[1]));
      const currentTime = Date.now() / 1000;

      return payload.exp > currentTime;
    } catch {
      return false;
    }
  }

  async getCurrentUser(): Promise<User> {
    const response = await this.get<User>('/auth/me');
    return response.data;
  }
}

// Export singleton instance for easy usage
export const authService = AuthService.getInstance();