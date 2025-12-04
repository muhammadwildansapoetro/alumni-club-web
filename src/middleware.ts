import { NextRequest, NextResponse } from "next/server";

function validateToken(token: string): boolean {
    try {
        // Basic JWT token validation
        const parts = token.split(".");
        if (parts.length !== 3) return false;

        // Decode payload to check expiration
        const payload = JSON.parse(atob(parts[1]));
        const currentTime = Date.now() / 1000;

        return payload.exp > currentTime;
    } catch {
        return false;
    }
}

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Public routes that don't require authentication
    const publicRoutes = ["/login", "/register"];
    const isPublicRoute = publicRoutes.includes(pathname) || pathname === "/";

    // If it's a public route, allow access
    if (isPublicRoute) {
        // If user is already authenticated and trying to access login/register, redirect to dashboard
        const authCookie = request.cookies.get("auth-storage")?.value;
        if (authCookie && (pathname === "/login" || pathname === "/register")) {
            try {
                const authData = JSON.parse(authCookie);
                const isAuthenticated = authData?.state?.isAuthenticated;
                if (isAuthenticated) {
                    return NextResponse.redirect(new URL("/dashboard", request.url));
                }
            } catch {
                // Invalid cookie format, continue to login page
            }
        }
        return NextResponse.next();
    }

    // Check if the route is under /dashboard
    if (pathname.startsWith("/dashboard")) {
        // Get token from cookies
        const authCookie = request.cookies.get("auth-storage")?.value;

        if (!authCookie) {
            // No token found, redirect to login
            const loginUrl = new URL("/login", request.url);
            loginUrl.searchParams.set("redirect", pathname);
            return NextResponse.redirect(loginUrl);
        }

        try {
            // Parse the cookie value (it's JSON from Zustand persist)
            const authData = JSON.parse(authCookie);
            const token = authData?.state?.token;
            const isAuthenticated = authData?.state?.isAuthenticated;

            if (!token || !isAuthenticated || !validateToken(token)) {
                // Invalid token, redirect to login
                const loginUrl = new URL("/login", request.url);
                loginUrl.searchParams.set("redirect", pathname);
                return NextResponse.redirect(loginUrl);
            }

            // Token is valid, allow access
            return NextResponse.next();
        } catch (error) {
            console.error("Error parsing auth cookie:", error);
            // Error parsing cookie or invalid token, redirect to login
            const loginUrl = new URL("/login", request.url);
            loginUrl.searchParams.set("redirect", pathname);
            return NextResponse.redirect(loginUrl);
        }
    }

    // For any other routes, allow access
    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public files
         */
        "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
    ],
};
