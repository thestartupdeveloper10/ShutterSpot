import { Navigate } from 'react-router-dom';
import HomePage from '@/pages/home/Home';
import ServicesPage from '@/pages/services/ServicesPage';
import PhotographersListingPage from '@/pages/customer/all_photographers/PhotographersListingPage';
import PhotographerDetails from '@/pages/customer/photographer_details/Phographer-Details';
import BookingsPage from '@/pages/customer/booking/book';
import ClientProfile from '@/pages/customer/customerProfile/CustomerProfile';
import ClientLayout from '@/layouts/ClientLayout';
import CategoryPhotographers from '@/pages/customer/CategoryPhotographers';
import Mybooking from '@/pages/customer/myBooking/Mybooking';
import Favourites from '@/pages/customer/favourites/Favourites';
import Messages from '@/pages/customer/messages/Messages';
import Notifications from '@/pages/customer/notifications/Notifications';

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
      {path:'my-bookings', element:<Mybooking/>},
      {path:'favourites', element:<Favourites/>},
      {path:'messages', element:<Messages/>},
      {path:'notifications', element:<Notifications/>},
      { path: 'profile', element: <ClientProfile /> },
      { path: 'photographers/category/:category', element: <CategoryPhotographers /> },
    ],
  },
];

export default clientRoutes;
