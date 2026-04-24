import "./About.css";
import aboutplaceholder from "../../images/aboutplaceholder.png";

function About() {
  return (
    <section className="about">
      <img className="about__image" src={aboutplaceholder} alt="Author" />
      <div className="about__info">
        <h2 className="about__title">About the author</h2>
        <p className="about__bio">
          Hello, I'm Paige! I have a background in marketing and always loved
          the creative side to my work. I worked a lot with clients and helped
          design and edit their websites. This is what led me here! I gained all
          the fundamentals of web development through Triple Ten such as, HTML,
          CSS, JavaScript, React, Node, and Express.
        </p>
      </div>
    </section>
  );
}

export default About;
