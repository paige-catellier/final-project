import "./Header.css";
import logo from "../../images/logo.svg";
import { NavLink } from "react-router-dom";

function Header({ handleLogInClick, isLoggedIn }) {
  return (
    <header className="header">
      <NavLink to="/" className="header__logo-link">
        <img className="header__logo" src={logo} alt="News Explorer Logo" />
      </NavLink>

      <div className="header__nav">
        <button className="header__home-btn">Home</button>
        {isLoggedIn && (
          <NavLink to="/saved-news" className="header__saved-news">
            <button className="header__saved-articles">Saved Articles</button>
          </NavLink>
        )}

        {!isLoggedIn ? (
          <button className="header__signin-btn" onClick={handleLogInClick}>
            Sign In
          </button>
        ) : (
          <button className="header__signin-btn">Log Out</button>
        )}
      </div>
    </header>
  );
}

export default Header;
