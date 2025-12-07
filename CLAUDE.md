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
- **Framework**: Next.js 16.0.3 with App Router
- **React**: 19.2.0 with TypeScript 5 (strict mode)
- **Styling**: Tailwind CSS v4 with CSS-in-JS approach and OKLCH color space
- **UI Components**: Shadcn/ui (new-york variant) with Radix UI primitives, data tables, and skeleton components
- **State Management**: Zustand with persistence middleware for authentication
- **Forms**: React Hook Form + Zod validation
- **Charts**: ApexCharts with React wrapper
- **Maps**: Leaflet with React integration
- **Data Fetching**: Axios with centralized API client, SWR for server state
- **Security**: Custom DES/RSA hybrid encryption for query parameters, JWT authentication with Bearer tokens
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
│   │   └── api-client.ts   # Centralized API client with auth
│   ├── utils.ts            # Utility functions (cn, isNumeric, abbreviation)
│   └── encryption.ts       # Crypto utilities (DES, RSA hybrid encryption)
├── hooks/                  # Custom React hooks
│   └── use-mobile.ts       # Mobile detection
├── services/               # API service layer
│   └── auth.service.ts     # Authentication API calls
├── stores/                 # State management
│   └── auth.store.ts       # Zustand auth store with persistence
├── types/                  # TypeScript type definitions
│   ├── api.ts              # Comprehensive API types
│   ├── alumni.ts           # Alumni-specific types
│   └── auth.ts             # Authentication types
├── config/                 # Configuration
├── constant/               # Application constants
└── data/                   # Static data (dummy data)
```

## Key Patterns

### Authentication & Security
- JWT-based authentication with Bearer token authorization
- Zustand store with persistence for auth state management
- Centralized API client with automatic token injection
- Query parameter encryption using DES (hex-encoded for WAF safety)
- Hybrid RSA+AES-GCM encryption implementation (currently commented)
- Protected routes through dashboard structure
- Auth provider for initialization on app startup
- Client-side form validation with Zod schemas

### Form Handling
- Consistent use of React Hook Form + Zod for type-safe validation
- Unified error handling patterns
- Mobile-first responsive forms

### API Architecture
- Centralized API client (`src/lib/api/api-client.ts`) with automatic token handling
- Service layer pattern (`src/services/`) separating API calls from components
- Comprehensive TypeScript types in `src/types/api.ts` for all API responses
- Zustand for client state, SWR for server state synchronization
- Error boundary pattern for graceful API error handling

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
- `NEXT_PUBLIC_QUERY_ENCRYPTION_KEY` - For query string encryption
- `NEXT_PUBLIC_RSA_PUBLIC_KEY` - For hybrid encryption (optional)

## Development Notes

- Path alias: `@/*` maps to `./src/*`
- Husky pre-commit hooks for code quality
- ESLint with Next.js configuration (no-explicit-any disabled)
- Mobile-first responsive design approach
- Zustand for global authentication state management
- Progress bar integration via @bprogress/next
- Comprehensive API type definitions in `src/types/api.ts`
- Authentication flow handled by AuthProvider and Zustand store

## Code Style

- 4-space tabs
- 150 character line width
- TypeScript strict mode
- Consistent use of Shadcn/ui patterns
- Form validation with Zod schemas
- Client components marked with `use client` directive

## Codebase Assessment & Recommendations

### Current Status: ⭐⭐⭐⭐ (4/5) - Good Foundation with Room for Improvement

### ✅ Excellent Best Practices Found:
1. **Modern Architecture**: Next.js 16 with App Router properly implemented
2. **Component Organization**: Well-structured directory with clear separation of concerns
3. **Design System**: Excellent Shadcn/ui integration with consistent theming
4. **TypeScript**: Strict mode enabled with good type inference
5. **Tooling**: Modern ESLint flat config, Husky hooks, Prettier integration
6. **Form Validation**: Proper React Hook Form + Zod implementation
7. **Mobile-First**: Responsive design approach with mobile detection

### ⚠️ Critical Issues Needing Attention:

#### **Security (High Priority)**
- **DES encryption is cryptographically weak** - should migrate to AES-256
- Missing input validation on encrypted queries (hook was removed, but encryption still exists)

#### **Code Quality**
- Missing performance optimizations (`useMemo`, `useCallback`)
- Hook `use-ecnrypt-query.ts` has been removed (was typo of use-encrypt-query)

#### **Type Safety**
- Comprehensive API types now exist in `src/types/api.ts`
- Some components lack proper return type annotations
- Some areas still return `Record<string, any>` instead of typed interfaces

### 🎯 Improvement Tasks:

#### **Priority 1 (Security)**
1. **Replace DES with AES-256 encryption**
   - File: `src/lib/encryption.ts`
   - Replace DES implementation with AES-256-CBC or AES-256-GCM
   - Update environment variables for AES keys

2. **Add input validation for encrypted queries**
   - File: `src/lib/encryption.ts` (query encryption hook was removed)
   - Validate encrypted data format before decryption
   - Add proper error handling for invalid data

#### **Priority 2 (Code Quality)**
1. **Enhance TypeScript definitions**
   - ✅ `src/types/api.ts` already exists with comprehensive types
   - Add proper interface definitions for remaining components
   - Replace remaining `Record<string, any>` with typed interfaces

2. **Implement performance optimizations**
   - File: `src/components/chart/industry-chart.ts:33` - Add `useMemo` for expensive calculations
   - File: `src/components/input/search-input.tsx` - Add `useCallback` for event handlers

3. **Enhance authentication flow**
   - ✅ Zustand store implemented in `src/stores/auth.store.ts`
   - ✅ AuthProvider added in `src/providers/auth-provider.tsx`
   - Review and optimize token refresh mechanism

#### **Priority 3 (User Experience)**
1. **Add error boundaries for graceful failures**
   - Create error boundary component
   - Wrap critical components with error boundaries

2. **Implement loading states for async operations**
   - Add loading indicators for form submissions
   - Add skeleton states for data fetching

3. **Enhance accessibility with proper ARIA labels**
   - File: `src/components/input/search-input.tsx` - Add ARIA labels
   - File: `src/components/topbar/mobile-navigation-menu.tsx` - Add keyboard navigation

### 📊 Specific File References:

**Security Issues:**
- `src/lib/encryption.ts` - Weak DES encryption implementation

**Performance Issues:**
- `src/components/chart/industry-chart.ts:33` - Missing memoization
- `src/components/input/search-input.tsx` - Missing useCallback

**Code Quality Issues:**
- Query encryption hook removed (typo was `use-ecnrypt-query.ts`)

### Next Steps for Tomorrow:
1. Start with Priority 1 security fixes
2. Run security audit after encryption changes
3. Add type definitions for better type safety
4. Test authentication flow improvements
5. Verify performance optimizations

This assessment provides a clear roadmap for production readiness.