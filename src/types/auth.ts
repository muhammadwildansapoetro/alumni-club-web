import type { User } from "./api";

// Re-export User type for convenience
export type { User } from "./api";

export interface GoogleUser {
    id: string;
    email: string;
    name: string;
    firstName: string;
    lastName: string;
    emailVerified: boolean;
}

export interface GoogleAuthRequest {
    token: string;
}

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

export interface GoogleAuthResponse {
    message: string;
    user: User;
    token: string;
    expiresIn: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    name: string;
    department: string;
    classYear: number;
}

export interface GoogleRegisterRequest {
    token: string;
    department: string;
    classYear: number;
}

export interface AuthState {
    // State
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;

    // Actions
    loginWithGoogle: (token: string) => Promise<void>;
    registerWithGoogle: (token: string, department: string, classYear: number) => Promise<void>;
    registerWithEmail: (email: string, password: string, name: string, department: string, classYear: number) => Promise<void>;
    logout: () => void;
    clearError: () => void;
    checkAuth: () => Promise<void>;
    refreshToken: () => Promise<void>;
    getToken: () => string | null;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

export interface ApiError {
    message: string;
    status?: number;
    code?: string;
}

export interface RegisterResponse {
    success: boolean;
    message: string;
    user: {
        id: string;
        email: string;
        name: string;
        emailVerified: boolean;
        profile: {
            department: string;
            classYear: number;
        };
    };
}

export interface VerifyEmailRequest {
    token: string;
}

export interface VerifyEmailResponse {
    success: boolean;
    message: string;
    user?: {
        id: string;
        email: string;
        name: string;
        emailVerified: boolean;
        profile?: any;
    };
}
