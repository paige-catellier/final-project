import About from "./About.css";

function About() {
  return (
    <section className="about">
      <div className="about__container">
        <div className="about__image">
          <img src="https://via.placeholder.com/150" alt="Author" />
        </div>
        <div className="about__info">
          <h2 className="about__title">About the author</h2>
          <p className="about__bio">About paragraph here!</p>
        </div>
      </div>
    </section>
  );
}

export default About;
