import './App.css'
import Board5 from './Pages/HomePage/Board'
import Home from './Pages/HomePage/Home';
import {  BrowserRouter as Link,  Routes,  Route} from "react-router-dom";
const App=()=>{
  return(
    <div className="container">
      <div className='top-bar'>
        <h1 style={{margin:'0px'}}>Chowka Bhara</h1>
      </div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/board5x5' element={<Board5/>}/>
       </Routes>
    </div>
  )
}

export default App;