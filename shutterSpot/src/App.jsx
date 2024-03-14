import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from "./component/NavBar"
import Home from './component/Home';



function App() {
 

  return (
    <>
       <Router>
      <div className="App w-full h-full">
        <NavBar />
        <div className="main h-[200vh]">
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        </div>
      </div>
    </Router>
    </>
  )
}

export default App
