import "./Header.css";
import logo from "../../images/logo.svg";
//mport background from "../../images/background.png";
import { NavLink } from "react-router-dom";

function Header({ handleLogInClick, isLoggedIn }) {
  return (
    <header className="header">
      <NavLink to="/">
        <img className="header__logo" src={logo} alt="News Explorer Logo" />
      </NavLink>
    </header>
  );
}

export default Header;
