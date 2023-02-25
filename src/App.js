import React, { useState } from 'react'
import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NotesState from './context/notes/NotesState';
import Alert from './Components/Alert';
import Login from './Components/Login';
import Signup from './Components/Signup';



function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }

  return (
    <>
      <NotesState>
        <Router>
          <Navbar showAlert={showAlert}/>

          <Alert alert={alert} />

          <Routes>
            <Route exact path="/" key={1} element={<Home showAlert={showAlert} />} />


            <Route exact path="/about" key={2} element={<About />} />

            <Route exact path="/login" key={3} element={<Login showAlert={showAlert} />} />


            <Route exact path="/signup" key={4} element={<Signup showAlert={showAlert} />} />


          </Routes>
        </Router>
      </NotesState>
    </>

  );
}

export default App;
