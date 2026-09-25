// App.tsx
import { Routes, Route } from 'react-router';
import LoginPage from './pages/LoginPage/LoginPage';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}
