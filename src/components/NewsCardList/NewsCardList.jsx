import "./NewsCardList.css";
import Preloader from "../Preloader/Preloader";

function NewsCardList({
  articles,
  isLoading,
  hasSearched,
  errorMessage,
  visibleArticles,
  onShowMore,
  savedArticles,
  handleSaveArticle,
}) {
  if (!hasSearched) {
    return null;
  }

  if (isLoading) {
    return <Preloader />;
  }

  if (!articles.length) {
    return (
      <section className="news-card">
        <p className="news-card__message">Nothing found.</p>
        <p className="news-card__message-details">
          Sorry, but nothing matched your search terms.
        </p>
      </section>
    );
  }

  if (errorMessage) {
    return (
      <section className="news-card">
        <p className="news-card__message">
          Sorry, something went wrong during the request. Please try again
          later.
        </p>
      </section>
    );
  }

  const displayedArticles = articles.slice(0, visibleArticles);
  const hasMoreArticles = visibleArticles < articles.length;

  return (
    <section className="news-card">
      <h2 className="news-card__title">Search results</h2>

      <div className="news-card__list">
        {displayedArticles.map((article, index) => {
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
            <article className="card" key={article.url || index}>
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
      {hasMoreArticles && (
        <button className="news-card__btn" onClick={onShowMore}>
          Show More
        </button>
      )}
    </section>
  );
}

export default NewsCardList;
