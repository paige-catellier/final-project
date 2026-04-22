import "./About.css";
import aboutplaceholder from "../../images/aboutplaceholder.png";

function About() {
  return (
    <section className="about">
      <img className="about__image" src={aboutplaceholder} alt="Author" />
      <div className="about__info">
        <h2 className="about__title">About the author</h2>
        <p className="about__bio">About paragraph here!</p>
      </div>
    </section>
  );
}

export default About;
