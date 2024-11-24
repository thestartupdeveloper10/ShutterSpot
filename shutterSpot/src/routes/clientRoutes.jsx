import { Navigate } from 'react-router-dom';
import HomePage from '@/pages/home/Home';
import ServicesPage from '@/pages/services/ServicesPage';
import PhotographersListingPage from '@/pages/customer/all_photographers/PhotographersListingPage';
import PhotographerDetails from '@/pages/customer/photographer_details/Phographer-Details';
import BookingsPage from '@/pages/customer/booking/book';
import ClientProfile from '@/pages/customer/customerProfile/CustomerProfile';
import ClientLayout from '@/layouts/ClientLayout';

const clientRoutes = [
  {
    path: '/',
    element: <ClientLayout />,
    children: [
      { path: '', element: <HomePage /> },
      { path: 'services', element: <ServicesPage /> },
      { path: 'photographers', element: <PhotographersListingPage /> },
      { path: 'photographer/:id', element: <PhotographerDetails /> },
      { path: 'bookings', element: <BookingsPage /> },
      { path: 'profile', element: <ClientProfile /> },
    ],
  },
];

export default clientRoutes;
