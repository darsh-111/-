import { useEffect, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { initLanguage } from './i18n';
import { Loading } from './components/common';
import ErrorBoundary from './components/common/ErrorBoundary';
import AppRoutes from './routes/AppRoutes';

// Global styles in index.css (tokens merged there)

function App() {
  useEffect(() => {
    initLanguage();
  }, []);

  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Suspense fallback={<Loading fullScreen />}>
          <AppRoutes />
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
