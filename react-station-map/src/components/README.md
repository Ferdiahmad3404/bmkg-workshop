# Components

Folder ini berisi komponen-komponen React yang dapat digunakan kembali (reusable components).

## Struktur yang Disarankan:

```
components/
├── common/          # Komponen umum (Button, Input, Card, dll)
├── layout/          # Komponen layout (Header, Footer, Sidebar, dll)
├── features/        # Komponen spesifik fitur
└── ui/              # Komponen UI primitif
```

## Best Practices:

1. **Satu komponen per file** - Gunakan PascalCase untuk nama file (e.g., `Button.tsx`)
2. **Props dengan TypeScript** - Selalu definisikan interface untuk props
3. **Default exports** - Gunakan default export untuk komponen utama
4. **Komponen fungsional** - Gunakan functional components dengan hooks
5. **Pemisahan concern** - Pisahkan logic dan presentasi jika perlu

## Contoh:

```typescript
// Button.tsx
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ 
  label, 
  onClick, 
  variant = 'primary' 
}) => {
  return (
    <button 
      className={`btn btn-${variant}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
```
