// App.tsx
import { Routes, Route } from 'react-router';
import LoginPage from './pages/LoginPage/LoginPage';
import ProfilePage from './pages/ProfilePage';
import DashboardPage from './pages/DashboardPage';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/" element={<DashboardPage />} />
    </Routes>
  );
}
