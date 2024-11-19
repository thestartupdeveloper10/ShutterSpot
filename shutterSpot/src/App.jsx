import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/home/Home';
import Photographer_Details from './pages/customer/photographer_details/Phographer-Details';
import Book from './pages/customer/booking/book';
import AuthPage from './pages/auth/AuthPage';
import PhotographersListingPage from './pages/customer/all_photographers/PhotographersListingPage';
import PhotographerDashboard from './pages/photographer/photographer_dashboard/PhotographerDashboard';
import PhotographerDetailsPage from './pages/photographer/addDetails/PhotographerDetailsPage';
import UserProfile from './pages/photographer/userProfile/UserProfile';
import CustomerProfile from './pages/customer/customerProfile/CustomerProfile';
import { useSelector } from 'react-redux';

function App() {
  const user = useSelector((state) => state.user);
  const currentUser = user?.currentUser;
  const isPhotographer = currentUser?.role === 'photographer';

  return (
    <Router>
      <div className="App w-full h-full bg-gray-50">
        <div className="main">
          <Routes>
            {/* Common Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/photographer/:id" element={<Photographer_Details />} />
            <Route path="/book" element={<Book />} />
            <Route path="/photographers" element={<PhotographersListingPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/photographer-dashboard" element={<PhotographerDashboard />} />

            {/* Conditional Routes */}
            {isPhotographer && !currentUser?.profile && (
              <Route path="/photographer-details" element={<PhotographerDetailsPage />} />
            )}

            {isPhotographer && currentUser?.profile && (
              <Route path="/photographerProfile/:id" element={<UserProfile userData={currentUser} />} />
            )}

            {!isPhotographer && currentUser && (
              <Route path="/clientProfile/:id" element={<CustomerProfile userData={currentUser} />} />
            )}

            {/* Fallback Route */}
            <Route
              path="*"
              element={
                !currentUser ? (
                  <Navigate to="/auth" replace />
                ) : isPhotographer && !currentUser?.profile ? (
                  <Navigate to="/photographer-details" replace />
                ) : isPhotographer && currentUser?.profile ? (
                  <Navigate to={`/photographerProfile/${currentUser.id}`} replace />
                ) : (
                  <Navigate to={`/clientProfile/${currentUser.id}`} replace />
                )
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
