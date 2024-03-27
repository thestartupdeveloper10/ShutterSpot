import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './component/Home';
import Photographer_Details from './component/Phographer-Details';
import ChipTabs from './component/NavBar';
import Book from './component/book';
import UserLogin from './component/userLogin';



function App() {
 

  return (
    <>
       <Router>
      <div className="App w-full h-full bg-[#fbe4d8]">
        < ChipTabs />
        <div className="main">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/photographer' element={<Photographer_Details />} />
            <Route path='/book' element={< Book/>} />
            <Route path='/login' element={< UserLogin/> } />
          </Routes>
        </div>
      </div>
    </Router>
    </>
  )
}

export default App
