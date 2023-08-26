import './App.css'
import Board5 from './Pages/HomePage/Board5';
import Board7 from './Pages/HomePage/Board7';
import Board9 from './Pages/HomePage/Board9';
import Home from './Pages/HomePage/Home';
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';


const App = () => {
  return (
      <div className="container">
        <div className='top-bar'>
          <div className="menu-left">
            <div className="dropdown">
              <button className="menu-icon">
                <FontAwesomeIcon icon={faBars} />
              </button>
              <div className="dropdown-content">
                <Link to="/">Home</Link>
                <Link to="/about">About Us</Link>
                <Link to="/contact">Contact Us</Link>
              </div>
            </div>
          </div>
          <h1 className="logo">Chowka Bhara</h1>
          <div className="menu-right">
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact Us</Link>
          </div>
        </div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/board5x5' element={<Board5 />} />
          <Route path='/board7x7' element={<Board7 />} />
          <Route path='/board9x9' element={<Board9 />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/contact' element={<ContactUs />} />
        </Routes>
      </div>
  )
}

const AboutUs = () => {
  return <div className='text'>About Us Content</div>
}

const ContactUs = () => {
  return <div className='text'>Contact Us Content</div>
}

export default App;
