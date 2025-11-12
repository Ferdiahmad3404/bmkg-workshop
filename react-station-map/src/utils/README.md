# Utils

Folder ini berisi utility functions dan helper functions yang dapat digunakan di seluruh aplikasi.

## Best Practices:

1. **Pure functions** - Buat functions yang pure (no side effects)
2. **Single responsibility** - Satu function untuk satu tugas
3. **Type safety** - Gunakan TypeScript untuk parameter dan return types
4. **Unit testable** - Buat functions yang mudah di-test
5. **Documentation** - Tambahkan JSDoc untuk functions yang kompleks

## Struktur yang Disarankan:

```
utils/
├── date.utils.ts      # Date formatting, manipulation
├── string.utils.ts    # String operations
├── validation.utils.ts # Validation helpers
├── format.utils.ts    # Formatting helpers
└── index.ts           # Central export
```

## Contoh:

```typescript
// date.utils.ts
/**
 * Format date to readable string
 * @param date - Date object or string
 * @param format - Format pattern (default: 'DD/MM/YYYY')
 * @returns Formatted date string
 */
export function formatDate(
  date: Date | string,
  format: string = 'DD/MM/YYYY'
): string {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  
  return format
    .replace('DD', day)
    .replace('MM', month)
    .replace('YYYY', String(year));
}

export function isDateInPast(date: Date): boolean {
  return date < new Date();
}

// string.utils.ts
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + '...';
}

// validation.utils.ts
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// format.utils.ts
export function formatCurrency(
  amount: number,
  currency: string = 'IDR'
): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency,
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('id-ID').format(num);
}
```
