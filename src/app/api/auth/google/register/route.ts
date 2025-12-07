import { NextRequest, NextResponse } from 'next/server';
import { googleAuthService } from '@/services/google-auth.service';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { token, department, classYear } = body;

        if (!token || !department || !classYear) {
            return NextResponse.json(
                { error: 'Token, department, and classYear are required' },
                { status: 400 }
            );
        }

        // Decode the Google token to get user information
        const decodedToken = googleAuthService.decodeGoogleToken(token);

        // For now, we'll create a mock user response
        // In a real application, you would:
        // 1. Verify the token with Google
        // 2. Create a new user record in your database with the additional info
        // 3. Generate your own JWT token

        const mockResponse = {
            user: {
                id: decodedToken.sub,
                email: decodedToken.email,
                name: decodedToken.name,
                avatar: decodedToken.picture,
                department,
                classYear,
            },
            token: `mock-jwt-${Date.now()}`, // In production, generate a proper JWT
            isNewUser: true,
        };

        return NextResponse.json(mockResponse);
    } catch (error: any) {
        console.error('Google registration error:', error);

        return NextResponse.json(
            {
                error: error.message || 'Registration failed'
            },
            { status: 500 }
        );
    }
}