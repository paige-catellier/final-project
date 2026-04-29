import "./Header.css";
import logo from "../../images/logo.svg";
import logoDark from "../../images/logo-dark.svg";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Header({
  handleLogInClick,
  isLoggedIn,
  currentUser,
  handleLogout,
  activeModal,
}) {
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
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (!activeModal) {
      closeMenu();
    }
  });

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
      {!activeModal && (
        <button
          type="button"
          className={`header__menu-btn ${
            isMenuOpen ? "header__menu-btn_close" : ""
          }`}
          onClick={handleMenuToggle}
          aria-label="Open menu"
        />
      )}

      {isMenuOpen && (
        <div className="header__mobile-menu">
          <NavLink to="/" onClick={closeMenu}>
            Home
          </NavLink>

          {isLoggedIn && (
            <NavLink to="/saved-news" onClick={closeMenu}>
              Saved Articles
            </NavLink>
          )}

          {!isLoggedIn ? (
            <button
              type="button"
              onClick={() => {
                closeMenu();
                handleLogInClick();
              }}
            >
              Sign in
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                closeMenu();
                onLogoutClick();
              }}
            >
              {"Log out"}
            </button>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
