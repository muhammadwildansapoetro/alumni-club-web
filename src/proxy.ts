import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const publicRoutes = ["/", "/login", "/register"];
    const isPublicRoute = publicRoutes.includes(pathname);

    if (isPublicRoute) {
        return NextResponse.next();
    }

    if (pathname.startsWith("/dashboard")) {
        const accessToken = request.cookies.get("access_token");
        const refreshToken = request.cookies.get("refresh_token");

        if (!accessToken && !refreshToken) {
            const loginUrl = new URL("/login", request.url);
            return NextResponse.redirect(loginUrl);
        }

        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
};
