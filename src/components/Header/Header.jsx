import "./Header.css";
import logo from "../../images/logo.svg";
import logoDark from "../../images/logo-dark.svg";
import { NavLink, useLocation } from "react-router-dom";

function Header({ handleLogInClick, isLoggedIn, currentUser, handleLogout }) {
  const location = useLocation();
  const isSavedNewsPage = location.pathname === "/saved-news";

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
          <button className="header__signin-btn" onClick={handleLogout}>
            {currentUser?.name || "Log Out"}
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
