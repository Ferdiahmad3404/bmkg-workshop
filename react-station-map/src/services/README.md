# Services

Folder ini berisi service layer untuk komunikasi dengan API, database, atau external services.

## Best Practices:

1. **API abstraction** - Pisahkan API calls dari komponen
2. **Error handling** - Implementasi error handling yang konsisten
3. **Type safety** - Definisikan types untuk request/response
4. **Single responsibility** - Satu service per domain/resource
5. **Centralized config** - Base URL dan config di satu tempat

## Struktur yang Disarankan:

```
services/
├── api/
│   ├── client.ts        # Axios/Fetch client configuration
│   ├── auth.service.ts  # Authentication endpoints
│   └── user.service.ts  # User endpoints
└── storage/
    └── localStorage.service.ts
```

## Contoh:

```typescript
// api/client.ts
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptors
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// api/user.service.ts
import { apiClient } from './client';
import type { User } from '@/types';

export const userService = {
  getUsers: async (): Promise<User[]> => {
    const response = await apiClient.get('/users');
    return response.data;
  },
  
  getUserById: async (id: string): Promise<User> => {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  },
  
  createUser: async (userData: Partial<User>): Promise<User> => {
    const response = await apiClient.post('/users', userData);
    return response.data;
  },
};
```
