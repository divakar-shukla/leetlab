import { useState } from "react";
import {Toaster} from "react-hot-toast"

import "./App.css";
import {Route, Routes, Navigate} from "react-router-dom"
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";

function App() {
let authUser = null
  return (
    <div className="flex flex-col items-center justify-center">
      <Toaster/>
      <Routes>
        <Route
         path="/" 
         element={authUser ? <Home/> : <Navigate to={"/login"}/>}
         />

        <Route
         path="/login" 
         element={!authUser ? <Login/> : <Navigate to={"/"}/>}
         />
         
        <Route path="/register" element={<Register/>}/>
        <Route path="/About" element={<About/>}/>
      </Routes>
    </div>
  );
}

export default App;
