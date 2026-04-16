import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import SuccessModal from "../SuccessModal/SuccessModal";
import SavedNews from "../SavedNews/SavedNews";
import { getNews } from "../../utils/api";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);

  const handleSaveArticle = (article) => {
    const isAlreadySaved = savedArticles.some(
      (item) => item.url === article.url
    );
    if (isAlreadySaved) {
      setSavedArticles((prev) =>
        prev.filter((item) => item.url !== article.url)
      );
    } else {
      setSavedArticles((prev) => [...prev, article]);
    }
  };

  const handleSubmit = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
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

  const handleSearch = (keyword) => {
    setIsLoading(true);

    getNews(keyword)
      .then((data) => {
        console.log(data);
        setSearchResults(data.articles);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
          <Route
            path="/"
            element={
              <Main
                onSearch={handleSearch}
                articles={searchResults}
                isLoading={isLoading}
                onSaveArticle={handleSaveArticle}
                savedArticles={savedArticles}
                isLoggedIn={isLoggedIn}
              />
            }
          />
          <Route
            path="/saved-news"
            element={
              <SavedNews
                savedArticles={savedArticles}
                onSaveArticle={handleSaveArticle}
              />
            }
          />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
