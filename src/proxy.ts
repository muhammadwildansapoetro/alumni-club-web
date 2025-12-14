import { NextRequest, NextResponse } from "next/server";

function validateToken(token: string): boolean {
    // For your specific backend token format (396 chars, non-JWT)
    // Just check if it exists and has reasonable length
    if (!token) {
        return false;
    }

    // Check if token has reasonable length (your backend returns 396 chars)
    if (token.length < 50) {
        return false;
    }

    return true;
}

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Public routes that don't require authentication
    const publicRoutes = ["/login", "/register"];
    const isPublicRoute = publicRoutes.includes(pathname) || pathname === "/";

    // If it's a public route, allow access
    if (isPublicRoute) {
        // If user is already authenticated and trying to access login/register, redirect to dashboard
        // Note: Zustand persist uses localStorage, not cookies, so this check may not work reliably
        // The main protection happens in the /dashboard section below
        if (pathname === "/login" || pathname === "/register") {
            // For now, allow access to login/register pages
            // Client-side logic will handle redirects if already authenticated
        }
        return NextResponse.next();
    }

    // Check if the route is under /dashboard
    if (pathname.startsWith("/dashboard")) {
        // Get token from auth-token cookie set by Zustand store
        const authTokenCookie = request.cookies.get("auth-token")?.value;

        if (!authTokenCookie) {
            // No token found, redirect to login
            const loginUrl = new URL("/login", request.url);
            // Store redirect path in a session cookie instead of URL parameter
            const response = NextResponse.redirect(loginUrl);
            response.cookies.set("redirect-path", pathname, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 60 * 5, // 5 minutes
            });
            return response;
        }

        if (!validateToken(authTokenCookie)) {
            // Invalid token, redirect to login
            const loginUrl = new URL("/login", request.url);
            // Store redirect path in a session cookie instead of URL parameter
            const response = NextResponse.redirect(loginUrl);
            response.cookies.set("redirect-path", pathname, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 60 * 5, // 5 minutes
            });
            return response;
        }

        // Token is valid, allow access
        return NextResponse.next();
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
