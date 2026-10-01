import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router';
import { PublicOnlyRoute } from './routes/PublicOnlyRoute';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { AuthProvider } from './context/AuthProvider';
import { ActivityProvider } from './context/ActivityProvider';
import FullscreenGate from './components/FullscreenGate';
import LoginPage from './pages/LoginPage/LoginPage';
import ProfilePage from './pages/ProfilePage';
import DashboardPage from './pages/DashboardPage';
import DayOverviewPage from './pages/DayOverviewPage';
import TaskPageSkeleton from './components/TaskPageSkeleton';
import NotFoundPage from './pages/NotFoundPage';
import TypingTestPage from './pages/TypingTestPage/TypingTestPage';

const TaskPage = lazy(() => import('./pages/TaskPage'));
import ReferencePage from './pages/ReferencePage';
import { useParams } from 'react-router';

function ReferenceRoute() {
  const { dayId } = useParams();

  if (!dayId) {
    return null;
  }

  return <ReferencePage dayId={dayId} />;
}
export default function App() {
  return (
    <AuthProvider>
      <FullscreenGate>
        <ActivityProvider>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/" element={<DashboardPage />} />
              <Route path="/typing-test" element={<TypingTestPage />} />
              <Route
                path="/tasks/:taskId"
                element={
                  <Suspense fallback={<TaskPageSkeleton />}>
                    <TaskPage />
                  </Suspense>
                }
              />
              <Route path="/days/:dayId" element={<DayOverviewPage />} />
              <Route path="/days/:dayId/references" element={<ReferenceRoute />} />
            </Route>
            <Route element={<PublicOnlyRoute />}>
              <Route path="/login" element={<LoginPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </ActivityProvider>
      </FullscreenGate>
    </AuthProvider>
  );
}
