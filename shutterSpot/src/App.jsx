import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Photographer_Details from './pages/photographer_details/Phographer-Details';
import Book from './pages/booking/book';
import UserLogin from './pages/userLogin';
import UserRegister from './pages/userRegister';




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
            <Route path='/login' element={< UserLogin/> } />
            <Route path='/register' element={< UserRegister/> } />
          </Routes>
        </div>
      </div>
    </Router>
    </>
  )
}

export default App
