export interface GoogleCredentialResponse {
    credential: string;
    select_by: string;
}

export interface GoogleDecodedToken {
    email: string;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    sub: string;
    iss: string;
    aud: string;
    exp: number;
    iat: number;
}

export interface GoogleAuthRequest {
    token: string;
}

export interface GoogleRegisterRequest {
    token: string;
    department: string;
    classYear: number;
}

export interface GoogleLoginResponse {
    message: string;
    user: {
        id: string;
        email: string;
        name: string;
        role: string;
        authProvider: string;
        profile: {
            id: string;
            fullName: string;
            department: string;
            classYear: number;
            city: string | null;
            industry: string | null;
            employmentLevel: string | null;
            jobTitle: string | null;
            companyName: string | null;
        };
        createdAt: string;
    };
    token: string;
}

export interface GoogleRegisterResponse {
    success: boolean;
    message: string;
    data: {
        user: {
            id: string;
            email: string;
            name: string;
            role: string;
            authProvider: string;
            createdAt: string;
        };
        alumniProfile: {
            id: string;
            fullName: string;
            department: string;
            classYear: number;
            createdAt: string;
        };
        token: string;
        expiresIn: string;
    };
}

// Legacy interface for backwards compatibility
export interface GoogleAuthResponse {
    message: string;
    user?: {
        id: string;
        email: string;
        name: string;
        role: string;
        authProvider: string;
        profile: {
            id: string;
            fullName: string;
            department: string;
            classYear: number;
            city: string | null;
            industry: string | null;
            employmentLevel: string | null;
            jobTitle: string | null;
            companyName: string | null;
        };
        createdAt: string;
    };
    token?: string;
    expiresIn?: string;
    requiresRegistration?: boolean;
    email?: string;
    name?: string;
}

export interface ApiError {
    message: string;
    status?: number;
    code?: string;
}

// Extend Window interface for Google GIS
declare global {
    interface Window {
        google: {
            accounts: {
                id: {
                    initialize: (config: any) => void;
                    renderButton: (element: HTMLElement, config: any) => void;
                    prompt: (callback?: (notification: any) => void) => void;
                };
            };
        };
    }

    interface GooglePromptNotification {
        isNotDisplayed: () => boolean;
        isSkippedMoment: () => boolean;
    }
}