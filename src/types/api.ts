// API Response Types
export interface ApiResponse<T = any> {
    success: boolean;
    data: T;
    message?: string;
    timestamp?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}

// Auth Types
export interface LoginRequest {
    username: string;
    password: string;
    rememberMe?: boolean;
}

export interface LoginResponse {
    success: boolean;
    data: {
        token: string;
        refreshToken: string;
        user: User;
        expiresIn: number;
    };
    message: string;
}

export interface User {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    profilePicture?: string;
    phone?: string;
    address?: Address;
    createdAt: string;
    updatedAt: string;
    lastLoginAt?: string;
    isActive: boolean;
}

export type UserRole = 'admin' | 'moderator' | 'member' | 'guest';

export interface Address {
    street: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
}

// Alumni Types
export interface Alumni {
    id: string;
    userId: string;
    nim: string; // Nomor Induk Mahasiswa
    fullName: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    dateOfBirth: string;
    placeOfBirth: string;
    gender: 'male' | 'female';
    address?: Address;
    studyProgram: StudyProgram;
    admissionYear: number;
    graduationYear?: number;
    gpa?: number;
    status: AlumniStatus;
    currentJob?: JobInfo;
    achievements?: Achievement[];
    socialMedia?: SocialMedia;
    profilePicture?: string;
    isVerified: boolean;
    isPublic: boolean;
    createdAt: string;
    updatedAt: string;
}

export type AlumniStatus = 'active' | 'inactive' | 'alumni' | 'dropped_out' | 'transferred';

export interface StudyProgram {
    id: string;
    name: string;
    code: string;
    faculty: string;
    degree: 'S1' | 'S2' | 'S3';
    department: string;
}

export interface JobInfo {
    company: string;
    position: string;
    industry: string;
    startDate: string;
    endDate?: string; // null if current
    description?: string;
    location?: string;
    isCurrentJob: boolean;
}

export interface Achievement {
    id: string;
    title: string;
    description: string;
    date: string;
    category: AchievementCategory;
    level: 'local' | 'national' | 'international';
    issuer?: string;
}

export type AchievementCategory =
    | 'academic'
    | 'sports'
    | 'arts'
    | 'leadership'
    | 'research'
    | 'community_service'
    | 'entrepreneurship'
    | 'other';

export interface SocialMedia {
    linkedin?: string;
    instagram?: string;
    twitter?: string;
    facebook?: string;
    website?: string;
}

// Search and Filter Types
export interface AlumniSearchParams {
    page?: number;
    limit?: number;
    search?: string;
    studyProgram?: string;
    graduationYear?: number;
    graduationYearFrom?: number;
    graduationYearTo?: number;
    admissionYear?: number;
    city?: string;
    province?: string;
    industry?: string;
    company?: string;
    status?: AlumniStatus;
    isVerified?: boolean;
    sortBy?: SortField;
    sortOrder?: 'asc' | 'desc';
}

export type SortField =
    | 'fullName'
    | 'admissionYear'
    | 'graduationYear'
    | 'gpa'
    | 'createdAt'
    | 'updatedAt';

// Form Types
export interface AlumniRegistrationRequest {
    user: {
        email: string;
        password: string;
        confirmPassword: string;
        firstName: string;
        lastName: string;
        phone?: string;
    };
    alumni: {
        nim: string;
        dateOfBirth: string;
        placeOfBirth: string;
        gender: 'male' | 'female';
        studyProgramId: string;
        admissionYear: number;
        address?: Address;
    };
}

export interface AlumniUpdateRequest {
    firstName?: string;
    lastName?: string;
    phone?: string;
    dateOfBirth?: string;
    placeOfBirth?: string;
    gender?: 'male' | 'female';
    address?: Address;
    currentJob?: JobInfo;
    socialMedia?: SocialMedia;
}

// Statistics and Dashboard Types
export interface AlumniStatistics {
    totalAlumni: number;
    activeAlumni: number;
    verifiedAlumni: number;
    byStudyProgram: Array<{
        program: string;
        count: number;
        percentage: number;
    }>;
    byGraduationYear: Array<{
        year: number;
        count: number;
    }>;
    byIndustry: Array<{
        industry: string;
        count: number;
        percentage: number;
    }>;
    byLocation: Array<{
        province: string;
        count: number;
        percentage: number;
    }>;
    recentRegistrations: Alumni[];
}

export interface DashboardStats {
    totalUsers: number;
    totalAlumni: number;
    activeJobs: number;
    upcomingEvents: number;
    recentActivities: Activity[];
}

export interface Activity {
    id: string;
    type: 'registration' | 'profile_update' | 'job_update' | 'achievement_added';
    userId: string;
    userName: string;
    description: string;
    timestamp: string;
    metadata?: Record<string, any>;
}

// Event Types
export interface Event {
    id: string;
    title: string;
    description: string;
    type: EventType;
    startDate: string;
    endDate: string;
    location: string;
    isVirtual: boolean;
    maxParticipants?: number;
    currentParticipants: number;
    organizer: string;
    imageUrl?: string;
    registrationDeadline?: string;
    isPublished: boolean;
    createdAt: string;
    updatedAt: string;
}

export type EventType =
    | 'reunion'
    | 'seminar'
    | 'workshop'
    | 'networking'
    | 'fundraising'
    | 'career_day'
    | 'webinar'
    | 'other';

export interface EventRegistration {
    id: string;
    eventId: string;
    userId: string;
    registrationDate: string;
    status: 'confirmed' | 'pending' | 'cancelled';
    notes?: string;
}

// News/Blog Types
export interface NewsArticle {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    authorId: string;
    authorName: string;
    categoryId: string;
    categoryName: string;
    tags: string[];
    featuredImage?: string;
    isPublished: boolean;
    isFeatured: boolean;
    viewCount: number;
    publishedAt?: string;
    createdAt: string;
    updatedAt: string;
}

export interface NewsCategory {
    id: string;
    name: string;
    slug: string;
    description?: string;
    color: string;
}

// Contact/Message Types
export interface ContactMessage {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    status: 'new' | 'read' | 'replied' | 'archived';
    createdAt: string;
    updatedAt: string;
}

// Error Types
export interface ApiError {
    code: string;
    message: string;
    details?: Record<string, any>;
    timestamp: string;
}

export interface ValidationError extends ApiError {
    field: string;
    value: any;
}

// Configuration Types
export interface AppConfig {
    maintenance: boolean;
    version: string;
    features: {
        registration: boolean;
        jobBoard: boolean;
        events: boolean;
        news: boolean;
        search: boolean;
    };
    limits: {
        maxUploadSize: number;
        maxRegistrationsPerPage: number;
        maxSearchResults: number;
    };
}

// Utility Types
export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;