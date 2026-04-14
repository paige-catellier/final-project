import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import SuccessModal from "../SuccessModal/SuccessModal";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
  };

  const handleLoginClick = () => {
    setActiveModal("signin");
  };

  const handleSwitchToRegister = () => {
    setActiveModal("signup");
  };
  const handleSwitchToLogin = () => {
    setActiveModal("signin");
  };

  const closeModal = () => {
    setActiveModal("");
  };

  const handleSignupSuccess = () => {
    setActiveModal("success");
  };

  return (
    <BrowserRouter>
      <div className="page">
        <div className="page__content">
          <Header handleLogInClick={handleLoginClick} />
          <LoginModal
            isOpen={activeModal === "signin"}
            closeModal={closeModal}
            handleSubmit={handleSubmit}
            handleSwitch={handleSwitchToRegister}
            isLoading={isLoading}
          />
          <RegisterModal
            isOpen={activeModal === "signup"}
            closeModal={closeModal}
            handleSubmit={handleSubmit}
            handleSwitch={handleSwitchToLogin}
            isLoading={isLoading}
            onSuccess={handleSignupSuccess}
          />
          <SuccessModal
            isOpen={activeModal === "success"}
            closeModal={closeModal}
            handleSwitchToLogin={() => setActiveModal("signin")}
          />
        </div>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
