# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FTIP Alumni Club Web Application - A Next.js 16 application for Fakultas Teknologi Industri Pertanian Universitas Padjadjaran alumni management platform.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run ESLint
npm run lint

# Format code with Prettier
npm run pretty

# Install Git hooks (runs automatically on install)
npm run prepare
```

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 16.0.10 with App Router
- **React**: 19.2.3 with TypeScript 5 (strict mode)
- **Styling**: Tailwind CSS v4 with CSS-in-JS approach and OKLCH color space
- **UI Components**: Shadcn/ui (new-york variant) with Radix UI primitives, data tables, and skeleton components
- **State Management**: Zustand v5.0.9 with persistence middleware for authentication
- **Forms**: React Hook Form + Zod validation (used in registration)
- **Charts**: ApexCharts with React wrapper
- **Maps**: Leaflet with React integration
- **Data Fetching**: Axios with centralized API client
- **Authentication**: Google OAuth via popup approach
- **Encryption**: AES-256-GCM encryption for sensitive data
- **Notifications**: Sonner for toast notifications
- **Icons**: Lucide React
- **Progress**: @bprogress/next for progress indicators
- **Dates**: Moment.js for date manipulation

### Directory Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (landing-page)/     # Public sections (hero, search, stats)
│   ├── dashboard/          # Protected dashboard area
│   ├── login/              # Authentication pages
│   ├── register/           # Registration pages
│   └── globals.css         # Global styles
├── components/             # Reusable components
│   ├── ui/                 # Shadcn/ui base components (data tables, skeleton, etc.)
│   ├── topbar/             # Navigation components
│   ├── card/               # Card layouts
│   ├── chart/              # Chart components
│   ├── input/              # Input components
│   └── map/                # Map components
├── providers/              # Context providers
│   └── auth-provider.tsx   # Authentication state initialization
├── lib/                    # Utilities and helpers
│   ├── api/                # API client and utilities
│   │   ├── api-client.ts   # Centralized API client with auth
│   │   └── alumni.ts       # Alumni API definitions
│   ├── encryption.ts       # AES-256-GCM encryption utilities
│   └── utils.ts            # Utility functions (cn, isNumeric, abbreviation)
├── hooks/                  # Custom React hooks
│   ├── use-encrypt-query.ts # Query parameter encryption hook
│   └── use-mobile.ts       # Mobile detection
├── services/               # API service layer
│   ├── auth.service.ts     # Traditional auth API calls (not implemented)
│   └── google-auth.service.ts  # Google OAuth service
├── stores/                 # State management
│   └── auth.store.ts       # Zustand auth store with persistence
├── types/                  # TypeScript type definitions
│   ├── api.ts              # Comprehensive API types
│   ├── alumni.ts           # Alumni-specific types
│   └── auth.ts             # Authentication types
├── utils/                  # Additional utilities
│   └── encryption-helpers.ts # Encryption helper functions
├── proxy.ts                # Route protection and authentication middleware
└── data/                   # Static data (dummy data)
```

## Key Patterns

### Authentication & Security
- Google OAuth authentication via popup approach
- Zustand store with persistence for auth state management
- Enhanced JWT validation (expiration check and token encryption)
- Route protection via proxy.ts middleware
- Cookie-based authentication using Zustand persistence with encrypted tokens
- Auth provider for initialization on app startup
- Form validation with Zod schemas (implemented in registration)
- **AES-256-GCM encryption** for sensitive data storage and transmission
- Encrypted query parameters for URL security
- API client with automatic encryption/decryption of sensitive fields

### Form Handling
- React Hook Form + Zod validation for registration form
- Google OAuth integration for authentication
- Mobile-first responsive forms

### API Architecture
- Enhanced API client (`src/lib/api/api-client.ts`) with automatic token handling and encryption
- Service layer pattern (`src/services/`) separating API calls from components
- Comprehensive TypeScript types in `src/types/api.ts` for all API responses
- Zustand for client state management with encrypted sensitive data
- Google Auth service for OAuth integration with token encryption
- Automatic field-level encryption for sensitive data (email, location, etc.)

### Component Architecture
- Server components for pages, client components for interactivity
- Shadcn/ui components with design tokens system
- Mobile detection hook for responsive behavior
- Dark mode support configured

### Styling System
- Tailwind CSS v4 with inline CSS custom properties
- Design token system for consistent theming
- Prettier with Tailwind plugin for code formatting

## Environment Variables

Required for development:
- `NEXT_PUBLIC_API_URL` - Backend API URL (default: http://localhost:8000)
- `NEXT_PUBLIC_GOOGLE_CLIENT_ID` - Google OAuth Client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth Client Secret
- `GOOGLE_REDIRECT_URI` - Google OAuth Redirect URI
- `NODE_ENV` - Environment (development/production)
- `NEXT_PUBLIC_ENCRYPTION_KEY` - AES-256 encryption key (base64 encoded)
- `ENCRYPTION_SALT_ROUNDS` - PBKDF2 iterations for key derivation (default: 100000)

## Development Notes

- Path alias: `@/*` maps to `./src/*`
- Husky pre-commit hooks for code quality
- ESLint with Next.js configuration (no-explicit-any disabled)
- Mobile-first responsive design approach
- Zustand for global authentication state management
- Progress bar integration via @bprogress/next
- Comprehensive API type definitions in `src/types/api.ts`
- Authentication flow handled by Google OAuth + AuthProvider + Zustand store
- Route protection implemented via proxy.ts middleware
- **AES-256-GCM encryption** implemented for sensitive data protection
- Encrypted query parameters prevent data exposure in URLs
- API client with automatic field-level encryption
- Token encryption for secure authentication storage

## Code Style

- 4-space tabs
- 150 character line width
- TypeScript strict mode
- Consistent use of Shadcn/ui patterns
- Form validation with Zod schemas
- Client components marked with `use client` directive

## Codebase Assessment & Recommendations

### Current Status: ⭐⭐⭐⭐ (4/5) - Strong Foundation with Advanced Security

### ✅ Excellent Best Practices Found:
1. **Modern Architecture**: Next.js 16 with App Router properly implemented
2. **Component Organization**: Well-structured directory with clear separation of concerns
3. **Design System**: Excellent Shadcn/ui integration with consistent theming
4. **TypeScript**: Strict mode enabled with good type inference
5. **Tooling**: Modern ESLint flat config, Husky hooks, Prettier integration
6. **Google OAuth Integration**: Properly implemented with popup authentication
7. **Mobile-First**: Responsive design approach with mobile detection
8. **Advanced Encryption**: AES-256-GCM encryption implemented for sensitive data

### ⚠️ Areas for Improvement:

#### **Security (Medium Priority)**
- **Enhanced JWT validation** - Expiration check + token encryption implemented
- **Mock token validation** - Development mock tokens still pass validation (acceptable for development)
- **No traditional authentication** - Only Google OAuth available (acceptable design choice)

#### **Code Quality**
- Performance optimization implemented (`useDebouncedCallback` in search input)
- Limited form validation (only implemented in registration)
- SWR package installed but not implemented
- Some components use `any` types (chart components)

#### **Feature Gaps**
- Traditional email/password authentication not implemented (by design)
- Limited API integration beyond Google auth
- Error handling patterns implemented but could be expanded
- Comprehensive form validation system implemented for registration

### 🎯 Improvement Tasks:

#### **Priority 1 (Security & Authentication)**
1. **Enhance JWT validation**
   - File: `src/proxy.ts:3-22`
   - ✅ Token encryption implemented in auth store
   - Add signature verification for production (future enhancement)
   - Implement token refresh mechanism (future enhancement)

2. **Expand encryption coverage**
   - ✅ AES-256-GCM encryption implemented in `src/lib/encryption.ts`
   - ✅ Environment variables configured for encryption keys
   - ✅ Query parameter encryption implemented via `src/hooks/use-encrypt-query.ts`
   - Extend encryption to additional data fields as needed

3. **Traditional authentication consideration**
   - Current Google OAuth-only approach is secure and user-friendly
   - Consider email/password option if use case demands it
   - Two-factor authentication could be added as optional enhancement

#### **Priority 2 (Code Quality & Performance)**
1. **Implement performance optimizations**
   - File: `src/components/chart/industry-chart.tsx:33` - Add `useMemo` for industry calculations
   - Replace `any` types in chart components with proper interfaces
   - ✅ Add `useCallback` for event handlers where needed (search input implemented)

2. **Complete API integration**
   - Implement SWR for server state management (package already installed)
   - Complete alumni API service in `src/lib/api/alumni.ts`
   - Add proper error handling for API failures

3. **Enhance form validation**
   - Extend Zod validation to all forms beyond registration
   - Create reusable form validation schemas
   - Add real-time validation feedback

#### **Priority 3 (Features & User Experience)**
1. **Add comprehensive error boundaries**
   - Create error boundary component
   - Wrap critical dashboard components
   - Add error reporting/logging

2. **Implement loading states**
   - Add skeleton components for data loading
   - Implement loading indicators for async operations
   - Add progress indicators for API calls

3. **Enhance accessibility**
   - Add ARIA labels throughout the application
   - Implement keyboard navigation for mobile menus
   - Add screen reader support for charts

### 📊 Specific File References:

**Security Implementation:**
- ✅ `src/lib/encryption.ts` - AES-256-GCM encryption with PBKDF2 key derivation
- ✅ `src/hooks/use-encrypt-query.ts` - Query parameter encryption hook
- ✅ `src/stores/auth.store.ts` - Encrypted token storage with masked logging
- ✅ `src/lib/api/api-client.ts` - Field-level encryption for sensitive data

**Performance Issues:**
- `src/components/chart/industry-chart.tsx:33` - Missing `useMemo` for expensive calculations
- Chart components using `any` types need proper interfaces

**Authentication Implementation:**
- ✅ `src/services/google-auth.service.ts` - Google OAuth with enhanced security
- ✅ `src/app/register/page.tsx` - Complete registration with Zod validation
- ✅ `src/app/login/page.tsx` - Google OAuth login only (no email/password)

**Encryption Implementation:**
- ✅ `src/utils/encryption-helpers.ts` - OAuth token and profile data encryption
- ✅ `.env` - Encryption key configuration with secure key generation
- Comprehensive error handling
- ✅ Encryption system fully implemented and production-ready

### Next Steps for Production:
1. **Immediate (Week 1):** Add `useMemo` to industry-chart.tsx and complete form validation enhancements
2. **Short-term (Week 2):** Implement SWR for server state management and complete API integration
3. **Medium-term (Month 1):** Add comprehensive error boundaries and loading states
4. **Long-term (Month 2):** Enhance accessibility with ARIA labels and keyboard navigation

This assessment provides a realistic roadmap focusing on security gaps and missing functionality before production deployment.