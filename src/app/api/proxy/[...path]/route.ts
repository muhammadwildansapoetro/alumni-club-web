import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

async function proxyRequest(request: NextRequest, path: string) {
    const url = `${API_URL}/${path}`;

    const headers = new Headers();
    headers.set("Content-Type", "application/json");

    // Forward cookies from the browser to the backend
    const cookieHeader = request.headers.get("cookie");
    if (cookieHeader) {
        headers.set("Cookie", cookieHeader);
    }

    const fetchOptions: RequestInit = {
        method: request.method,
        headers,
    };

    // Forward body for non-GET/HEAD requests
    if (request.method !== "GET" && request.method !== "HEAD") {
        try {
            fetchOptions.body = await request.text();
        } catch {
            // No body
        }
    }

    const res = await fetch(url, fetchOptions);

    const data = await res.text();
    const response = new NextResponse(data, {
        status: res.status,
        headers: {
            "Content-Type": res.headers.get("Content-Type") || "application/json",
        },
    });

    // Forward Set-Cookie headers from the backend, stripping Domain so
    // the cookie is set on the frontend domain instead of the API domain
    const setCookies = res.headers.getSetCookie();
    for (const cookie of setCookies) {
        const cleaned = cookie
            .replace(/;\s*[Dd]omain=[^;]*/g, "")
            .replace(/;\s*[Ss]ame[Ss]ite=[^;]*/g, "; SameSite=Lax");
        response.headers.append("Set-Cookie", cleaned);
    }

    return response;
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
    const { path } = await params;
    return proxyRequest(request, path.join("/"));
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
    const { path } = await params;
    return proxyRequest(request, path.join("/"));
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
    const { path } = await params;
    return proxyRequest(request, path.join("/"));
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
    const { path } = await params;
    return proxyRequest(request, path.join("/"));
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
    const { path } = await params;
    return proxyRequest(request, path.join("/"));
}
