# Constants

Folder ini berisi konstanta-konstanta yang digunakan di seluruh aplikasi.

## Best Practices:

1. **UPPER_SNAKE_CASE** - Gunakan untuk konstanta primitif
2. **Grouped by domain** - Kelompokkan berdasarkan domain/fitur
3. **Type safety** - Gunakan `as const` untuk literal types
4. **Centralized** - Satu tempat untuk semua magic numbers/strings
5. **Environment aware** - Pisahkan config dari constants

## Struktur yang Disarankan:

```
constants/
├── index.ts           # Central export
├── app.constants.ts   # App-wide constants
├── api.constants.ts   # API endpoints, codes
└── routes.constants.ts # Route paths
```

## Contoh:

```typescript
// app.constants.ts
export const APP_NAME = 'BMKG Station Map';
export const APP_VERSION = '1.0.0';

export const STORAGE_KEYS = {
  TOKEN: 'auth_token',
  USER: 'user_data',
  THEME: 'app_theme',
} as const;

export const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export const DATE_FORMAT = {
  DEFAULT: 'DD/MM/YYYY',
  WITH_TIME: 'DD/MM/YYYY HH:mm',
  ISO: 'YYYY-MM-DD',
} as const;

// api.constants.ts
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
  },
  USERS: {
    LIST: '/users',
    DETAIL: (id: string) => `/users/${id}`,
    CREATE: '/users',
    UPDATE: (id: string) => `/users/${id}`,
    DELETE: (id: string) => `/users/${id}`,
  },
  STATIONS: {
    LIST: '/stations',
    DETAIL: (id: string) => `/stations/${id}`,
  },
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
} as const;

// routes.constants.ts
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  STATIONS: {
    LIST: '/stations',
    DETAIL: (id: string) => `/stations/${id}`,
    CREATE: '/stations/new',
    EDIT: (id: string) => `/stations/${id}/edit`,
  },
  PROFILE: '/profile',
  SETTINGS: '/settings',
  NOT_FOUND: '*',
} as const;

export const PUBLIC_ROUTES = [
  ROUTES.HOME,
  ROUTES.LOGIN,
] as const;

// index.ts
export * from './app.constants';
export * from './api.constants';
export * from './routes.constants';
```

## Tips:

- Hindari hardcoded values di komponen
- Gunakan constants untuk URLs, API endpoints, storage keys
- Gunakan `as const` untuk type narrowing
- Dokumentasikan constants yang tidak jelas
