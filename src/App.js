import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import NoteState from './Context/Notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import Alert from './components/Alert';
function App() {
  return (
    <>
    <NoteState>

    <Router> 
      <Navbar/>
      <Alert/>
      <div className="container">                                                                                     
    <Routes>
          <Route exact path="/" element={<Home/>}></Route>
          <Route exact path="/about" element={<About/>}></Route>
          <Route exact path="/login" element={<Login/>}></Route>
          <Route exact path="/signup" element={<Signup/>}></Route>
    </Routes>
    </div>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
