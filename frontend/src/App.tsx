import { Routes, Route } from 'react-router';
import LoginPage from './pages/LoginPage/LoginPage';
import ProfilePage from './pages/ProfilePage';
import DashboardPage from './pages/DashboardPage';
import TaskPage from './pages/TaskPage';
import DayOverviewPage from './pages/DayOverviewPage';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/" element={<DashboardPage />} />
      <Route path="/tasks/:taskId" element={<TaskPage />}></Route>
      <Route path="/days/:dayId" element={<DayOverviewPage />} />
    </Routes>
  );
}
