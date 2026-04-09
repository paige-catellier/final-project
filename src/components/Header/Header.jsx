import "./Header.css";
import logo from "../../images/logo.svg";
import { NavLink } from "react-router-dom";

function Header({ handleLogInClick, isLoggedIn }) {
  return (
    <header className="header">
      <NavLink to="/">
        <img className="header__logo" src={logo} alt="News Explorer Logo" />
        <button className="header__home-btn">Home</button>
      </NavLink>
      <button className="header__signin-btn">Sign In</button>
    </header>
  );
}

export default Header;
