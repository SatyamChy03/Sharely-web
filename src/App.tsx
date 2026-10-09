import { lazy, Suspense, type ReactNode } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from './components/layout/ErrorBoundary';
import { Layout } from './components/layout/Layout';
import { PageLoader } from './components/layout/PageLoader';
import { PlatformProvider } from './lib/PlatformContext';
import { Home } from './pages/Home';

const Download = lazy(() => import('./pages/Download'));
const Install = lazy(() => import('./pages/Install'));
const NotFound = lazy(() => import('./pages/NotFound'));

const lazyPage = (page: ReactNode) => <Suspense fallback={<PageLoader />}>{page}</Suspense>;

export function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <PlatformProvider>
        <ErrorBoundary>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="download" element={lazyPage(<Download />)} />
              <Route path="install" element={lazyPage(<Install />)} />
              <Route path="*" element={lazyPage(<NotFound />)} />
            </Route>
          </Routes>
        </ErrorBoundary>
      </PlatformProvider>
    </BrowserRouter>
  );
}
