# Types

Folder ini berisi TypeScript type definitions, interfaces, dan types yang digunakan di seluruh aplikasi.

## Best Practices:

1. **Naming convention** - Gunakan PascalCase untuk types/interfaces
2. **File organization** - Grupkan types berdasarkan domain/fitur
3. **Export pattern** - Export dari index.ts untuk kemudahan import
4. **Avoid any** - Hindari penggunaan `any`, gunakan `unknown` jika perlu
5. **Reusability** - Buat types yang dapat digunakan kembali

## Struktur yang Disarankan:

```
types/
├── index.ts           # Central export file
├── user.types.ts      # User-related types
├── api.types.ts       # API request/response types
└── common.types.ts    # Common/shared types
```

## Contoh:

```typescript
// user.types.ts
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export type UserRole = 'admin' | 'user' | 'guest';

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserDto extends Partial<CreateUserDto> {
  id: string;
}

// api.types.ts
export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

// common.types.ts
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;

// index.ts
export * from './user.types';
export * from './api.types';
export * from './common.types';
```

## Tips:

- Gunakan `interface` untuk object shapes yang bisa di-extend
- Gunakan `type` untuk unions, intersections, atau mapped types
- Gunakan utility types bawaan TypeScript (`Partial`, `Pick`, `Omit`, dll)
