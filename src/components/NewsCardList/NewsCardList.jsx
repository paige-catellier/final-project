import "./NewsCardList.css";
import Preloader from "../Preloader/Preloader";
import { useState } from "react";

function NewsCardList({ articles, isLoading, savedArticles, onSaveArticle }) {
  if (isLoading) {
    return <Preloader />;
  }
  if (!articles.length) {
    return null;
  }

  return (
    <section className="news-card">
      <h2 className="news-card__title">Search results</h2>

      <div className="news-card__list">
        {articles.map((article, index) => {
          const formattedDate = new Date(
            article.publishedAt
          ).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          });
          const isSaved = savedArticles.some(
            (item) => item.url === article.url
          );

          return (
            <article className="card" key={index}>
              <img
                className="card__image"
                src={article.urlToImage || "No image avaliable"}
                alt={article.title || "News article"}
              />
              <button
                type="button"
                className={`card__save-btn ${
                  isSaved ? "card__save-btn_active" : ""
                }`}
                onClick={() => handleSaveArticle(article)}
              >
                Save
              </button>
              <div className="card__content">
                <p className="card__date">{formattedDate}</p>
                <h3 className="card__title">
                  {article.title || "No title available"}
                </h3>
                <p className="card__text">
                  {article.description || "No description available"}
                </p>
                <p className="card__source">
                  {article.source?.name || "Unknown source"}
                </p>
              </div>
            </article>
          );
        })}
      </div>

      <button className="news-card__btn">Show More</button>
    </section>
  );
}

export default NewsCardList;
