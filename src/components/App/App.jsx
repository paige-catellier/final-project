import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";

function App() {
  return (
    <BrowserRouter>
      <div className="page">
        <div className="page__content">
          <Header />
        </div>
        <Routes>
          <Route path="/" element={<div>Home Page - Coming Soon!</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
