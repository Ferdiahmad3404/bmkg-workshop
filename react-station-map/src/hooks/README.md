# Hooks

Folder ini berisi custom React hooks untuk logic yang dapat digunakan kembali.

## Best Practices:

1. **Naming convention** - Awali nama dengan "use" (e.g., `useLocalStorage.ts`)
2. **Single responsibility** - Satu hook untuk satu tujuan spesifik
3. **Type safety** - Gunakan TypeScript generics untuk flexibility
4. **Dependencies** - Pastikan dependencies array sudah benar
5. **Return values** - Kembalikan array atau object sesuai kebutuhan

## Contoh:

```typescript
// useLocalStorage.ts
import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}
```

## Common Hooks:

- `useFetch` - Untuk fetching data
- `useDebounce` - Untuk debouncing input
- `useLocalStorage` - Untuk localStorage access
- `useWindowSize` - Untuk responsive behavior
- `useClickOutside` - Untuk mendeteksi klik di luar element
