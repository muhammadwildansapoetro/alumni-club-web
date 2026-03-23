# Guide: Get Alumni List with Pagination

This guide describes how the frontend should implement the "Get Alumni List / Users List" feature, including pagination and filtering.

## 1. API Endpoint Details

- **Method:** `GET`
- **URL Path:** `/users`
- **Authentication Required:** Yes. You must include the JWT token in the `Authorization` header (`Bearer <token>`).

## 2. Query Parameters

The endpoint accepts several optional query parameters for pagination, searching, and filtering.

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `page` | `number` (as string) | `1` | The page number to retrieve. Must be > 0. |
| `limit` | `number` (as string) | `10` | Number of items per page. Maximum allows up to `100`. |
| `search` | `string` | - | Search keyword (matches against `name`, `email`, or user profile's `fullName`). |
| `department` | `string` | - | Filter by department. Allowed values: `"TEP"`, `"TPN"`, `"TIN"`. |
| `entryYear` | `string` | - | Filter by the alumni's entry year (e.g., `"2015"`). |
| `cityId` | `string` | - | Filter by the city ID where the alumni is located. |
| `provinceId`| `string` | - | Filter by the province ID. |
| `countryId` | `string` | - | Filter by the country ID. |

### Example Request URL

```http
GET /users?page=1&limit=10&search=budi&department=TEP&entryYear=2018
```

## 3. Request Header Example

```js
const headers = {
  "Authorization": `Bearer ${token}`, // Replace with the actual session token
  "Content-Type": "application/json",
};
```

## 4. Response Format

The API returns a JSON object containing `success`, `message`, and the `data`. The `data` object is split into `items` (the array of users/alumni) and `pagination` (metadata).

### Successful Response (`200 OK`) Example

```json
{
  "success": true,
  "message": "Berhasil mengambil daftar pengguna",
  "data": {
    "items": [
      {
        "id": "cm7b...123",
        "email": "budi@example.com",
        "name": "Budi Santoso",
        "role": "USER",
        "authMethod": "EMAIL",
        "profile": {
          "id": 1,
          "fullName": "Budi Santoso, S.T.",
          "department": "TEP",
          "entryYear": 2018,
          "graduationYear": 2022,
          "furtherEducations": null,
          "cityId": 3171,
          "cityName": "Jakarta Pusat",
          "provinceId": 31,
          "provinceName": "DKI Jakarta",
          "countryId": null,
          "countryName": null,
          "workExperiences": [],
          "linkedInUrl": "https://linkedin.com/..."
        },
        "createdAt": "2024-02-18T10:00:00.000Z",
        "updatedAt": "2024-02-18T10:00:00.000Z"
      }
      // ... up to `limit` items
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 52,
      "totalPages": 6
    }
  }
}
```

## 5. Integrating on the Frontend

### Type Definitions (TypeScript)

To ensure type safety, you can use these types for the response and query parameters.

```typescript
// Query parameters sent to the API
export interface AlumniListQuery {
  page?: number;
  limit?: number;
  search?: string;
  department?: "TEP" | "TPN" | "TIN";
  entryYear?: string | number;
  cityId?: string | number;
  provinceId?: string | number;
  countryId?: string | number;
}

export interface AlumniProfile {
  id: number;
  fullName: string | null;
  department: string;
  entryYear: number;
  graduationYear: number | null;
  furtherEducations: any | null;
  cityId: number | null;
  cityName: string | null;
  provinceId: number | null;
  provinceName: string | null;
  countryId: number | null;
  countryName: string | null;
  workExperiences: any | null;
  linkedInUrl: string | null;
}

export interface AlumniUser {
  id: string;
  email: string;
  name: string;
  role: "USER" | "ADMIN";
  authMethod: string;
  profile: AlumniProfile | null;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedAlumniResponse {
  success: boolean;
  message: string;
  data: {
    items: AlumniUser[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}
```

### Fetch Function Example

This is a reusable API helper using standard `fetch` that you can import into your Next.js frontend or React Query context.

```typescript
export const getAlumniList = async (
  token: string,
  params: AlumniListQuery = {}
): Promise<PaginatedAlumniResponse> => {
  // 1. Build query string
  const queryParams = new URLSearchParams();

  if (params.page) queryParams.append("page", params.page.toString());
  if (params.limit) queryParams.append("limit", params.limit.toString());
  if (params.search) queryParams.append("search", params.search);
  if (params.department) queryParams.append("department", params.department);
  if (params.entryYear) queryParams.append("entryYear", params.entryYear.toString());
  if (params.cityId) queryParams.append("cityId", params.cityId.toString());
  if (params.provinceId) queryParams.append("provinceId", params.provinceId.toString());
  if (params.countryId) queryParams.append("countryId", params.countryId.toString());

  // 2. Perform Fetch
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users?${queryParams.toString()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Ensure token is provided
      },
      next: { revalidate: 0 }, // Adjust cache duration or use 'cache: no-store' if needed
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Gagal mengambil data alumni");
  }

  return response.json();
};
```

## 6. Implementation Notes & Best Practices

1. **Debounce Searches**: The `search` parameter is an insensitive match across name, email, and full name. This could be somewhat slow on a very large table. Be sure to *debounce* inputs on the frontend (e.g., wait 300ms–500ms after the user stops typing) before triggering the API request to prevent spamming the backend.
2. **Missing Profiles**: Users deleted via `softDelete` (where `deletedAt` is not null) are excluded by default. Only users who have not been soft deleted will be returned.
3. **Empty states:** Check `data.items.length === 0` to display an empty state placeholder for search/filters that return nothing.
4. **Error Handling**: Use guard clauses and ensure you gracefully handle `401 Unauthorized` responses by redirecting the user to sign-in or automatically attempting to refresh their session.
