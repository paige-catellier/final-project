import "./Footer.css";
import github from "../../images/github.svg";
import linkedin from "../../images/linkedin.svg";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__name">2026 Supersite, Powered by News API</p>
      <div className="footer__links">
        <a
          href="https://github.com/paige-catellier"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__link"
        >
          <img src={github} alt="GitHub" className="footer__icon" />
        </a>
        <a
          href="https://www.linkedin.com/in/paigecatellier444/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__link"
        >
          <img src={linkedin} alt="LinkedIn" className="footer__icon" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
