import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { apiClient } from './api/client';
import { ToastProvider } from './components/Toast';

async function start() {
  if (import.meta.env.VITE_USE_MOCKS === 'true') {
    const { installMockAdapter } = await import('./api/mockAdapter');
    installMockAdapter(apiClient);
  }

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <ToastProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ToastProvider>
    </StrictMode>
  );
}

void start();
