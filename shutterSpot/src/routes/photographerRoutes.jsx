import { Navigate } from 'react-router-dom';
import PhotographerDashboard from '@/pages/photographer/photographer_dashboard/PhotographerDashboard';
import PhotographerDetailsPage from '@/pages/photographer/addDetails/PhotographerDetailsPage';
import UserProfile from '@/pages/photographer/userProfile/UserProfile';
import BookingManagement from '@/pages/photographer/BookingManagement';
import PhotographerSettings from '@/pages/photographer/Settings';
// import PhotographerPortfolio from '@/pages/photographer/Portfolio';
import PhotographerLayout from '@/layouts/PhotographerLayout';
import { useSelector } from 'react-redux';
import Chat from '@/pages/photographer/chat/Chat';





const photographerRoutes = [
  {
    path: '/photographer',
    element: <PhotographerLayout />,
    children: [
      { path: '', element: <Navigate to="dashboard" replace /> },
      { path: 'dashboard', element: <PhotographerDashboard /> },
      { path: 'chat', element: <Chat /> },
      { path: 'profile', element: <UserProfile /> },
      { path: 'addDetails', element: <PhotographerDetailsPage /> },
      { path: 'bookings', element: <BookingManagement /> },
      { path: 'settings', element: <PhotographerSettings /> },
    ],
  },
];

export default photographerRoutes;
