import { Routes, Route } from 'react-router';
import { PublicOnlyRoute } from './routes/PublicOnlyRoute';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { AuthProvider } from './context/AuthProvider';
import LoginPage from './pages/LoginPage/LoginPage';
import ProfilePage from './pages/ProfilePage';
import DashboardPage from './pages/DashboardPage';
import TaskPage from './pages/TaskPage';
import DayOverviewPage from './pages/DayOverviewPage';

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<PublicOnlyRoute />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/" element={<DashboardPage />} />
          <Route path="/tasks/:taskId" element={<TaskPage />}></Route>
          <Route path="/days/:dayId" element={<DayOverviewPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
