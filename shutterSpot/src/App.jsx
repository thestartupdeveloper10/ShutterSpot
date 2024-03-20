import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from "./component/NavBar"
import Home from './component/Home';
import Photographer_Details from './component/Phographer-Details';
import ChipTabs from './component/NavBar';




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
          </Routes>
        </div>
      </div>
    </Router>
    </>
  )
}

export default App
