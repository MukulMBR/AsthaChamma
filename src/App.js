import './App.css'
import Board from './Board'
import Home from './Home';
import {  BrowserRouter as Link,  Routes,  Route} from "react-router-dom";
const App=()=>{
  return(
    <div className="container">
      <div className='top-bar'>
        <h1 style={{margin:'0px'}}>Chowka Bhara</h1>
      </div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/board' element={<Board/>}/>
       </Routes>
    </div>
  )
}

export default App;