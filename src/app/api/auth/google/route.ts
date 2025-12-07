import { NextRequest, NextResponse } from 'next/server';
import { googleAuthService } from '@/services/google-auth.service';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { token, isRegistration, department, classYear } = body;

        if (!token) {
            return NextResponse.json(
                { error: 'Token is required' },
                { status: 400 }
            );
        }

        // Decode the Google token to get user information
        const decodedToken = googleAuthService.decodeGoogleToken(token);

        // Create user data from Google token
        const userData = {
            user: {
                id: decodedToken.sub,
                email: decodedToken.email,
                name: decodedToken.name,
                role: "user",
                authProvider: "google",
                profile: {
                    id: decodedToken.sub,
                    fullName: decodedToken.name,
                    department: department || null,
                    classYear: classYear || null,
                    city: null,
                    industry: null,
                    employmentLevel: null,
                    jobTitle: null,
                    companyName: null,
                },
                createdAt: new Date().toISOString(),
            },
        };

        // In production, call your backend API to validate/create user
        // const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/google`, {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ token, isRegistration, department, classYear })
        // });

        return NextResponse.json({
            message: "Authentication successful",
            ...userData,
            // TODO: In production, get token from your backend
            token: `google-auth-${Date.now()}`,
            expiresIn: "7d",
        });
    } catch (error: any) {
        console.error('Google auth error:', error);

        return NextResponse.json(
            {
                error: error.message || 'Authentication failed'
            },
            { status: 500 }
        );
    }
}