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
// const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID; // Not used here, used in functions

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
        const err: ApiError = {
            message: data.error || data.message || "Unknown error",
            status: res.status,
        };
        throw err;
    }

    return data;
}

export const googleAuthService = {
    // Initialize Google OAuth - no longer needed for popup approach
    async initGoogleAuth(): Promise<void> {
        return Promise.resolve();
    },

    // Initialize method kept for compatibility but does nothing
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    initialize(_callback: (response: GoogleCredentialResponse) => void) {
        // No-op for popup approach
    },

    // Render button method kept for compatibility but does nothing
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    renderButton(_element: HTMLElement) {
        // No-op for popup approach
    },

    // Load Google GSI script dynamically
    loadGoogleScript(): Promise<void> {
        return new Promise((resolve, reject) => {
            // If script is already loaded, resolve
            if (window.google?.accounts?.id) {
                resolve();
                return;
            }

            // Check if script is already being loaded
            if (document.querySelector('script[src="https://accounts.google.com/gsi/client"]')) {
                const checkLoaded = setInterval(() => {
                    if (window.google?.accounts?.id) {
                        clearInterval(checkLoaded);
                        resolve();
                    }
                }, 100);
                return;
            }

            const script = document.createElement("script");
            script.src = "https://accounts.google.com/gsi/client";
            script.async = true;
            script.defer = true;

            script.onload = () => {
                // Give it a moment to fully initialize
                setTimeout(() => {
                    if (window.google?.accounts?.id) {
                        resolve();
                    } else {
                        reject(new Error("Google Identity Services failed to initialize"));
                    }
                }, 100);
            };

            script.onerror = () => {
                reject(new Error("Failed to load Google Identity Services script"));
            };

            document.head.appendChild(script);
        });
    },

    // Use Google Sign-In with popup
    async signInWithPopup(): Promise<string> {
        return new Promise(async (resolve, reject) => {
            const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

            if (!GOOGLE_CLIENT_ID) {
                reject(new Error("Google Client ID is not configured"));
                return;
            }

            try {
                // Load the Google script
                await this.loadGoogleScript();

                if (!window.google?.accounts?.id) {
                    reject(new Error("Google Identity Services not available"));
                    return;
                }

                // Create a temporary div for the sign-in button
                const tempDiv = document.createElement("div");
                tempDiv.style.position = "absolute";
                tempDiv.style.top = "-9999px";
                tempDiv.style.left = "-9999px";
                document.body.appendChild(tempDiv);

                // Initialize Google Sign-In
                window.google.accounts.id.initialize({
                    client_id: GOOGLE_CLIENT_ID,
                    callback: (response: GoogleCredentialResponse) => {
                        resolve(response.credential);
                        // Clean up the temporary div
                        document.body.removeChild(tempDiv);
                    },
                    auto_select: false,
                });

                // Render a hidden button and programmatically click it
                window.google.accounts.id.renderButton(tempDiv, {
                    type: "standard",
                    size: "large",
                    text: "signin_with",
                    theme: "outline",
                    width: 250,
                    click_listener: () => {
                        // Button was clicked
                    },
                });

                // Programmatically trigger the sign-in flow
                setTimeout(() => {
                    const button = tempDiv.querySelector('div[role="button"]');
                    if (button) {
                        (button as HTMLElement).click();
                    } else {
                        // Fallback to prompt method
                        window.google.accounts.id.prompt((notification: any) => {
                            if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
                                document.body.removeChild(tempDiv);
                                reject(new Error("Google Sign-In was cancelled or not displayed"));
                            }
                        });
                    }
                }, 100);

                // Set a timeout to clean up if no response
                setTimeout(() => {
                    if (document.body.contains(tempDiv)) {
                        document.body.removeChild(tempDiv);
                    }
                }, 10000);
            } catch (error) {
                reject(error);
            }
        });
    },

    decodeGoogleToken(token: string): GoogleDecodedToken {
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

