import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import About from "./Components/About";
import Navbar from "./Components/Navbar";
import NoteState from "./Context/noteState";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Alert from "./Components/Alert"
function App() {
  

  return (
    <NoteState>
      <Router>
        <Navbar />
        <Alert/>
        <div className="container my-3">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/signup" element={<Signup/>} />
          </Routes>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;
