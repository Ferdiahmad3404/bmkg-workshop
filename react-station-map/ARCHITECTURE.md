# React TypeScript Project Architecture

## 📁 Struktur Folder

Proyek ini menggunakan struktur folder best practices untuk aplikasi React TypeScript yang scalable dan maintainable.

```
src/
├── assets/           # Static assets (images, fonts, etc.)
├── components/       # Reusable React components
├── constants/        # Application constants
├── contexts/         # React Context providers
├── hooks/           # Custom React hooks
├── pages/           # Page components (routes)
├── services/        # API and external services
├── types/           # TypeScript type definitions
└── utils/           # Utility functions
```

## 📂 Penjelasan Folder

### 🧩 Components (`/src/components`)
Berisi komponen-komponen React yang dapat digunakan kembali.

**Struktur yang disarankan:**
- `common/` - Komponen umum (Button, Input, Modal, dll)
- `layout/` - Komponen layout (Header, Footer, Sidebar)
- `features/` - Komponen spesifik fitur
- `ui/` - Komponen UI primitif

**Best Practices:**
- Satu komponen per file
- Gunakan PascalCase untuk nama file
- Definisikan TypeScript interfaces untuk props
- Gunakan functional components dengan hooks

### 🪝 Hooks (`/src/hooks`)
Berisi custom React hooks untuk logic yang dapat digunakan kembali.

**Best Practices:**
- Awali nama dengan "use" (e.g., `useLocalStorage`)
- Satu hook untuk satu tujuan spesifik
- Gunakan TypeScript generics untuk flexibility
- Return array atau object sesuai kebutuhan

**Contoh hooks yang umum:**
- `useFetch` - Data fetching
- `useDebounce` - Input debouncing
- `useLocalStorage` - LocalStorage access
- `useWindowSize` - Responsive behavior

### 🌐 Services (`/src/services`)
Berisi service layer untuk komunikasi dengan API dan external services.

**Best Practices:**
- Pisahkan API calls dari komponen
- Implementasi error handling yang konsisten
- Definisikan types untuk request/response
- Centralized configuration

### 📝 Types (`/src/types`)
Berisi TypeScript type definitions dan interfaces.

**Best Practices:**
- Gunakan PascalCase untuk types/interfaces
- Grupkan types berdasarkan domain
- Export dari index.ts untuk kemudahan import
- Hindari penggunaan `any`

### 🛠️ Utils (`/src/utils`)
Berisi utility functions dan helper functions.

**Best Practices:**
- Buat pure functions (no side effects)
- Single responsibility per function
- Type safety dengan TypeScript
- Unit testable

**Contoh utils:**
- Date formatting/manipulation
- String operations
- Validation helpers
- Format helpers (currency, number)

### 📌 Constants (`/src/constants`)
Berisi konstanta-konstanta aplikasi.

**Best Practices:**
- Gunakan UPPER_SNAKE_CASE untuk primitif
- Kelompokkan berdasarkan domain
- Gunakan `as const` untuk literal types
- Hindari magic numbers/strings

**Contoh constants:**
- API endpoints
- Route paths
- Storage keys
- Configuration values

### 🔄 Contexts (`/src/contexts`)
Berisi React Context providers untuk state management global.

**Best Practices:**
- Buat custom hook untuk consume context
- Type safety untuk context values
- Throw error jika digunakan di luar provider
- Separate contexts untuk different concerns

**Contoh contexts:**
- AuthContext - Authentication state
- ThemeContext - Theme management
- LanguageContext - Internationalization

### 📄 Pages (`/src/pages`)
Berisi komponen halaman yang merepresentasikan routes.

**Best Practices:**
- Satu folder per route/feature
- Gunakan lazy loading untuk code splitting
- Compose dari smaller components
- Handle data fetching di page level

## 🎯 Import Path Alias

Gunakan path alias untuk import yang lebih clean:

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/hooks/*": ["./src/hooks/*"],
      "@/services/*": ["./src/services/*"],
      "@/types/*": ["./src/types/*"],
      "@/utils/*": ["./src/utils/*"],
      "@/constants/*": ["./src/constants/*"],
      "@/contexts/*": ["./src/contexts/*"],
      "@/pages/*": ["./src/pages/*"]
    }
  }
}
```

**Usage:**
```typescript
// ❌ Bad
import { Button } from '../../../../components/common/Button';

// ✅ Good
import { Button } from '@/components/common/Button';
```

## 🔐 Environment Variables

Gunakan file `.env` untuk configuration:

```env
VITE_API_BASE_URL=https://api.example.com
VITE_APP_NAME=BMKG Station Map
```

**Access dalam kode:**
```typescript
const apiUrl = import.meta.env.VITE_API_BASE_URL;
```

## 📦 Component Pattern

**Struktur file komponen:**
```
Button/
├── Button.tsx         # Component logic
├── Button.styles.css  # Component styles (optional)
├── Button.test.tsx    # Unit tests (optional)
└── index.ts          # Export file
```

**index.ts:**
```typescript
export { Button } from './Button';
export type { ButtonProps } from './Button';
```

## 🧪 Testing

Buat test file sejajar dengan file yang ditest:
```
components/
├── Button/
│   ├── Button.tsx
│   └── Button.test.tsx
```

## 📚 Dokumentasi

Setiap folder memiliki `README.md` dengan:
- Tujuan folder
- Best practices
- Contoh code
- Tips dan guidelines

## 🚀 Next Steps

1. Pelajari setiap folder README untuk detail lebih lanjut
2. Lihat contoh-contoh yang ada
3. Ikuti naming conventions dan best practices
4. Maintain consistency di seluruh project

## 🤝 Contributing

Saat menambahkan code baru:
1. Pilih folder yang tepat berdasarkan responsibility
2. Ikuti naming conventions yang ada
3. Tambahkan types/interfaces yang diperlukan
4. Dokumentasikan jika perlu
5. Keep it simple and maintainable

---

**Happy Coding! 🎉**
