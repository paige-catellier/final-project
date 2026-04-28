import "./Header.css";
import logo from "../../images/logo.svg";
import logoDark from "../../images/logo-dark.svg";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function Header({ handleLogInClick, isLoggedIn, currentUser, handleLogout }) {
  const location = useLocation();
  const isSavedNewsPage = location.pathname === "/saved-news";
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onLogoutClick = () => {
    handleLogout();
    navigate("/");
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`header ${
        isLoggedIn && isSavedNewsPage ? "header_saved" : ""
      }`}
    >
      <NavLink to="/" className="header__logo-link">
        <img
          className="header__logo"
          src={isSavedNewsPage ? logoDark : logo}
          alt="News Explorer Logo"
        />
      </NavLink>

      <div className="header__nav">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `header__link ${isActive ? "header__link_active" : ""}`
          }
        >
          Home
        </NavLink>
        {isLoggedIn && (
          <NavLink
            to="/saved-news"
            className={({ isActive }) =>
              `header__link ${isActive ? "header__link_active" : ""}`
            }
          >
            Saved Articles
          </NavLink>
        )}

        {!isLoggedIn ? (
          <button className="header__signin-btn" onClick={handleLogInClick}>
            Sign In
          </button>
        ) : (
          <button className="header__signin-btn" onClick={onLogoutClick}>
            {currentUser?.name || "Log Out"}
            <span className="header__logout-icon" />
          </button>
        )}
      </div>
      {/* <button
        className="header__menu-btn"
        type="button"
        onClick={handleMenuToggle}
      ></button>
      <section>
        {isMenuOpen && (
          <div className="header__mobile-menu">
            <NavLink to="/" onClick={() => setIsMenuOpen(false)}>
              Home
            </NavLink>

            {isLoggedIn && (
              <NavLink to="/saved-news" onClick={() => setIsMenuOpen(false)}>
                Saved Articles
              </NavLink>
            )}

            {!isLoggedIn ? (
              <button onClick={handleLogInClick}>Sign in</button>
            ) : (
              <button onClick={handleLogout}>{currentUser?.name}</button>
            )}
          </div>
        )}
      </section> */}
    </header>
  );
}

export default Header;
