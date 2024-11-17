import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Photographer_Details from './pages/customer/photographer_details/Phographer-Details';
import Book from './pages/customer/booking/book';
import AuthPage from './pages/auth/AuthPage';
import PhotographersListingPage from './pages/customer/all_photographers/PhotographersListingPage';
import PhotographerDashboard from './pages/photographer/photographer_dashboard/PhotographerDashboard';
import PhotographerDetailsPage from './pages/photographer/addDetails/PhotographerDetailsPage';
import UserProfile from './pages/photographer/userProfile/UserProfile';
import CustomerProfile from './pages/customer/customerProfile/CustomerProfile';




function App() {
 

  return (
    <>
       <Router>
      <div className="App w-full h-full bg-gray-50">
        <div className="main">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/photographer/:id' element={<Photographer_Details />} />
            <Route path='/book' element={< Book/>} />
            <Route path='/photographers' element={<PhotographersListingPage/> } />
            <Route path='/auth' element={<AuthPage/> } />
            <Route path='/photographer-dashboard' element={<PhotographerDashboard/> } />
            <Route path='/photographer-details' element={<PhotographerDetailsPage/> } />
            <Route path='/photographerProfile' element={<UserProfile/> } />
            <Route path='/clientProfile' element={<CustomerProfile/> } />
          </Routes>
        </div>
      </div>
    </Router>
    </>
  )
}

export default App
