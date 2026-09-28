import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router';
import { PublicOnlyRoute } from './routes/PublicOnlyRoute';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { AuthProvider } from './context/AuthProvider';
import LoginPage from './pages/LoginPage/LoginPage';
import ProfilePage from './pages/ProfilePage';
import DashboardPage from './pages/DashboardPage';
import DayOverviewPage from './pages/DayOverviewPage';
import TaskPageSkeleton from './components/TaskPageSkeleton';

const TaskPage = lazy(() => import('./pages/TaskPage'));

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/" element={<DashboardPage />} />
          <Route
            path="/tasks/:taskId"
            element={
              <Suspense fallback={<TaskPageSkeleton />}>
                <TaskPage />
              </Suspense>
            }
          />
          <Route path="/days/:dayId" element={<DayOverviewPage />} />
        </Route>
        <Route element={<PublicOnlyRoute />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
