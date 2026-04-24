import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import SuccessModal from "../SuccessModal/SuccessModal";
import SavedNews from "../SavedNews/SavedNews";
import { getNews } from "../../utils/api";
import { authorize, register, checkToken } from "../../utils/auth";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [visibleArticles, setVisibleArticles] = useState(3);
  const [searchResults, setSearchResults] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = ({ email, password }) => {
    setIsLoading(true);

    authorize(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        return checkToken(res.token);
      })
      .then((userData) => {
        setCurrentUser(userData.data);
        setIsLoggedIn(true);
        closeModal();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleRegister = ({ email, password, username }) => {
    setIsLoading(true);

    register({ email, password, username })
      .then(() => {
        handleSignupSuccess();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) return;

    checkToken(token)
      .then((res) => {
        setCurrentUser(res.data);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.error(err);
        localStorage.removeItem("jwt");
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  const handleSubmit = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleSaveArticle = (article, keyword) => {
    const articleToSave = { ...article, keyword };
    const isAlreadySaved = savedArticles.some(
      (item) => item.url === article.url
    );
    if (isAlreadySaved) {
      setSavedArticles((prev) =>
        prev.filter((item) => item.url !== article.url)
      );
    } else {
      setSavedArticles((prev) => [...prev, articleToSave]);
    }
  };

  const handleDeleteArticle = (article) => {
    setSavedArticles((prev) => {
      return prev.filter((item) => item.url !== article.url);
    });
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
    setHasSearched(true);
    setErrorMessage("");
    setSearchResults([]);
    setVisibleArticles(3);

    const startTime = Date.now();

    getNews(keyword)
      .then((data) => {
        setSearchResults(data.articles || []);
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage(
          "Sorry, something went wrong during the request. Please try again later."
        );
      })
      .finally(() => {
        const elapsed = Date.now() - startTime;
        const minimumLoadingTime = 1000;
        const remainingTime = minimumLoadingTime - elapsed;

        setTimeout(
          () => {
            setIsLoading(false);
          },
          remainingTime > 0 ? remainingTime : 0
        );
      });
  };

  const handleShowMore = () => {
    setVisibleArticles((prev) => prev + 3);
  };

  return (
    <BrowserRouter>
      <div className="page">
        <div className="page__content">
          <Header
            handleLogInClick={handleLoginClick}
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
            handleLogout={handleLogout}
          />
          <LoginModal
            isOpen={activeModal === "signin"}
            closeModal={closeModal}
            handleLogin={handleLogin}
            handleSwitch={handleSwitchToRegister}
            isLoading={isLoading}
          />
          <RegisterModal
            isOpen={activeModal === "signup"}
            closeModal={closeModal}
            handleRegister={handleRegister}
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
                handleSaveArticle={handleSaveArticle}
                savedArticles={savedArticles}
                hasSearched={hasSearched}
                errorMessage={errorMessage}
                visibleArticles={visibleArticles}
                onShowMore={handleShowMore}
                isLoggedIn={isLoggedIn}
              />
            }
          />
          <Route
            path="/saved-news"
            element={
              <SavedNews
                savedArticles={savedArticles}
                currentUser={{ name: "Elise" }}
                handleDeleteArticle={handleDeleteArticle}
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
