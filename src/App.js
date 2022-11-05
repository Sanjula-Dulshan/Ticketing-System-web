import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BusRoute from "./components/BusRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import Login from "./components/Login";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/busroute" element={<BusRoute />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
