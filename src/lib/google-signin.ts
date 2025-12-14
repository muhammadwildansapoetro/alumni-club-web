import { googleAuthService } from "@/services/google-auth.service";

/**
 * Google Sign-In utility functions that can be used in any component
 * This allows you to create custom styled buttons while using the same functionality
 */

export interface GoogleSignInOptions {
    text?: "signin_with" | "signup_with" | "continue_with" | "signin";
}

/**
 * Initialize Google Sign-In and get the credential
 * Returns the Google ID token that can be sent to your backend
 */
export async function signInWithGoogle(options: GoogleSignInOptions = {}): Promise<string> {
    // Initialize Google Sign-In
    await googleAuthService.initializeGoogleSignIn();

    return new Promise((resolve, reject) => {
        // Create a temporary div for Google Sign-In button
        const tempDiv = document.createElement("div");
        tempDiv.style.position = "absolute";
        tempDiv.style.top = "-9999px";
        tempDiv.style.left = "-9999px";
        document.body.appendChild(tempDiv);

        // Initialize with callback
        window.google.accounts.id.initialize({
            client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            callback: (response: any) => {
                if (response.credential) {
                    resolve(response.credential);
                } else {
                    reject(new Error("No credential received from Google Sign-In"));
                }
                // Clean up
                document.body.removeChild(tempDiv);
            },
            auto_select: false,
        });

        // Render button and click it programmatically
        window.google.accounts.id.renderButton(tempDiv, {
            type: "standard",
            size: "large",
            text: options.text || "signin_with",
            theme: "outline",
            width: 250,
        });

        // Click the button
        setTimeout(() => {
            const button = tempDiv.querySelector('div[role="button"]');
            if (button) {
                (button as HTMLElement).click();
            } else {
                // Fallback to prompt
                window.google.accounts.id.prompt((notification: any) => {
                    if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
                        document.body.removeChild(tempDiv);
                        reject(new Error("Google Sign-In was cancelled or not displayed"));
                    }
                });
            }
        }, 100);

        // Timeout cleanup
        setTimeout(() => {
            if (document.body.contains(tempDiv)) {
                document.body.removeChild(tempDiv);
            }
            reject(new Error("Google Sign-In timed out. Please try again."));
        }, 10000);
    });
}

/**
 * Decode Google ID token to get user information
 */
export function decodeGoogleToken(token: string) {
    return googleAuthService.decodeGoogleToken(token);
}

/**
 * Check if Google Sign-In is available
 */
export function isGoogleSignInAvailable(): boolean {
    return !!(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID && window.google?.accounts?.id);
}