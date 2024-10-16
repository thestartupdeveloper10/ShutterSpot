import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Photographer_Details from './pages/photographer_details/Phographer-Details';
import Book from './pages/booking/book';
import AuthPage from './pages/auth/AuthPage';
import PhotographersListingPage from './pages/all_photographers/PhotographersListingPage';
import PhotographerDashboard from './pages/photographer_dashboard/PhotographerDashboard';
import PhotographerDetailsPage from './pages/photographer_dashboard/PhotographerDetailsPage';




function App() {
 

  return (
    <>
       <Router>
      <div className="App w-full h-full bg-[#fbe4d8]">
        <div className="main">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/photographer' element={<Photographer_Details />} />
            <Route path='/book' element={< Book/>} />
            <Route path='/find-photographer' element={<PhotographersListingPage/> } />
            <Route path='/auth' element={<AuthPage/> } />
            <Route path='/photographer-dashboard' element={<PhotographerDashboard/> } />
            <Route path='/photographerDetails' element={<PhotographerDetailsPage/> } />
          </Routes>
        </div>
      </div>
    </Router>
    </>
  )
}

export default App
