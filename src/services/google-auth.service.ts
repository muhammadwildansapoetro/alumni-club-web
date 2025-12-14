import {
    GoogleCredentialResponse,
    GoogleDecodedToken,
    GoogleAuthRequest,
    GoogleRegisterRequest,
    GoogleLoginResponse,
    GoogleRegisterResponse,
    ApiError
} from "@/types/google-auth";

// Google OAuth configuration
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

async function request<T>(url: string, options: RequestInit): Promise<T> {
    // Get API base URL from environment
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

    const res = await fetch(`${apiUrl}${url}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
        },
    });

    const data = await res.json();

    if (!res.ok) {
        // Enhanced error parsing to extract detailed error information
        let errorMessage = "Unknown error";

        if (data.error) {
            // If the error contains detailed information (like the Prisma error), extract the relevant part
            if (typeof data.error === 'string' && data.error.includes('Invalid `prisma.')) {
                // Extract the actual error message from Prisma errors
                const lines = data.error.split('\n');
                const errorLine = lines.find((line: string) => line.includes('The column') || line.includes('does not exist'));
                if (errorLine) {
                    errorMessage = errorLine.trim();
                } else {
                    errorMessage = "Terjadi kesalahan pada database. Silakan hubungi administrator.";
                }
            } else {
                errorMessage = data.error;
            }
        } else if (data.message) {
            errorMessage = data.message;
        } else if (data.detail) {
            errorMessage = data.detail;
        }

        const err: ApiError = {
            message: errorMessage,
            status: res.status,
            details: data, // Preserve full error details for debugging
        };
        throw err;
    }

    return data;
}

export const googleAuthService = {
    // Initialize Google Sign-In with standard Google button approach
    async initializeGoogleSignIn(): Promise<void> {
        if (!GOOGLE_CLIENT_ID) {
            throw new Error("Google Client ID is not configured");
        }

        return new Promise((resolve, reject) => {
            // Load Google GSI script if not already loaded
            if (window.google?.accounts?.id) {
                // Initialize if already loaded
                window.google.accounts.id.initialize({
                    client_id: GOOGLE_CLIENT_ID,
                    callback: (response: GoogleCredentialResponse) => {
                        // This callback will be handled by the sign-in button
                    },
                    auto_select: false,
                });
                resolve();
                return;
            }

            // Load the Google script
            const script = document.createElement("script");
            script.src = "https://accounts.google.com/gsi/client";
            script.async = true;
            script.defer = true;

            script.onload = () => {
                if (window.google?.accounts?.id) {
                    // Initialize Google Sign-In
                    window.google.accounts.id.initialize({
                        client_id: GOOGLE_CLIENT_ID,
                        callback: (response: GoogleCredentialResponse) => {
                            // This callback will be handled by the sign-in button component
                        },
                        auto_select: false,
                    });
                    resolve();
                } else {
                    reject(new Error("Google Identity Services failed to initialize"));
                }
            };

            script.onerror = () => {
                reject(new Error("Failed to load Google Identity Services script"));
            };

            document.head.appendChild(script);
        });
    },

    // Render Google Sign-In button
    renderGoogleButton(element: HTMLElement, callback: (response: GoogleCredentialResponse) => void, options?: any): void {
        if (!window.google?.accounts?.id) {
            throw new Error("Google Identity Services not initialized");
        }

        // Initialize with the provided callback
        window.google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback,
            auto_select: false,
        });

        // Render the button
        window.google.accounts.id.renderButton(element, {
            type: "standard",
            size: "large",
            text: "signin_with",
            theme: "outline",
            width: 250,
            shape: "rectangular",
            ...options,
        });
    },

    // Show Google One Tap (optional)
    showOneTap(callback: (response: GoogleCredentialResponse) => void): void {
        if (!window.google?.accounts?.id) {
            console.warn("Google Identity Services not initialized");
            return;
        }

        window.google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback,
            auto_select: false,
        });

        window.google.accounts.id.prompt();
    },

    // Legacy method for compatibility - now uses initializeGoogleSignIn
    async initGoogleAuth(): Promise<void> {
        return this.initializeGoogleSignIn();
    },

    decodeGoogleToken(token: string): GoogleDecodedToken {
        // Check if this is a mock token (for development)
        if (token.startsWith('google-auth-')) {
            // Return mock decoded token for development
            return {
                sub: "mock-user-id",
                email: "user@example.com",
                name: "Mock User",
                given_name: "Mock",
                family_name: "User",
                picture: "",
                iss: "https://accounts.google.com",
                aud: "mock-client-id",
                exp: Math.floor(Date.now() / 1000) + 3600,
                iat: Math.floor(Date.now() / 1000)
            };
        }

        // JWT tokens are base64 encoded, split by dots
        const base64Url = token.split(".")[1];
        if (!base64Url) {
            throw new Error("Invalid Google token format");
        }

        // Convert base64url to base64
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

        // Decode base64
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
                .join(""),
        );

        const decoded = JSON.parse(jsonPayload);
        return decoded as GoogleDecodedToken;
    },

    // API method for Google login
    async signInWithGoogle(data: GoogleAuthRequest): Promise<GoogleLoginResponse> {
        return request<GoogleLoginResponse>("/auth/google", {
            method: "POST",
            body: JSON.stringify(data),
        });
    },

    // API method for Google registration
    async registerWithGoogle(data: GoogleRegisterRequest): Promise<GoogleRegisterResponse> {
        return request<GoogleRegisterResponse>("/auth/google/register", {
            method: "POST",
            body: JSON.stringify({
                token: data.token,
                department: data.department,
                classYear: data.classYear,
            }),
        });
    },
};

