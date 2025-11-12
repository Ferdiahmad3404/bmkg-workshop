# Pages

Folder ini berisi komponen-komponen halaman (page components) yang merepresentasikan route/view dalam aplikasi.

## Best Practices:

1. **Route mapping** - Satu folder per route/feature
2. **Lazy loading** - Gunakan React.lazy untuk code splitting
3. **Page composition** - Compose dari smaller components
4. **Data fetching** - Handle data fetching di page level
5. **Layout consistency** - Gunakan layout components

## Struktur yang Disarankan:

```
pages/
├── Home/
│   ├── HomePage.tsx
│   ├── HomePage.styles.css
│   └── index.ts
├── Dashboard/
│   ├── DashboardPage.tsx
│   └── index.ts
├── Stations/
│   ├── StationListPage.tsx
│   ├── StationDetailPage.tsx
│   └── index.ts
└── NotFound/
    ├── NotFoundPage.tsx
    └── index.ts
```

## Contoh:

```typescript
// pages/Home/HomePage.tsx
import { useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { StationMap } from '@/components/features/StationMap';
import { stationService } from '@/services/api/station.service';
import type { Station } from '@/types';
import './HomePage.styles.css';

export function HomePage() {
  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const data = await stationService.getStations();
        setStations(data);
      } catch (error) {
        console.error('Failed to fetch stations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStations();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home-page">
      <Header />
      <main className="home-page__content">
        <h1>BMKG Station Map</h1>
        <StationMap stations={stations} />
      </main>
    </div>
  );
}

export default HomePage;

// pages/Home/index.ts
export { HomePage as default } from './HomePage';

// pages/Dashboard/DashboardPage.tsx
import { useAuth } from '@/contexts';
import { Redirect } from 'react-router-dom';

export function DashboardPage() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="dashboard-page">
      <h1>Welcome, {user?.name}</h1>
      {/* Dashboard content */}
    </div>
  );
}

export default DashboardPage;

// pages/NotFound/NotFoundPage.tsx
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants';

export function NotFoundPage() {
  return (
    <div className="not-found-page">
      <h1>404</h1>
      <p>Page not found</p>
      <Link to={ROUTES.HOME}>Go back to home</Link>
    </div>
  );
}

export default NotFoundPage;
```

## Router Setup Example:

```typescript
// App.tsx
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ROUTES } from '@/constants';

// Lazy load pages
const HomePage = lazy(() => import('@/pages/Home'));
const DashboardPage = lazy(() => import('@/pages/Dashboard'));
const NotFoundPage = lazy(() => import('@/pages/NotFound'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
          <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
```

## Tips:

- Gunakan lazy loading untuk meningkatkan performance
- Pisahkan concerns: data fetching, business logic, dan presentation
- Gunakan custom hooks untuk logic yang kompleks
- Implementasi error boundaries untuk error handling
