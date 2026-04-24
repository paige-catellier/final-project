import "./SavedNews.css";

function SavedNews({ savedArticles, handleDeleteArticle, currentUser }) {
  const userName = currentUser?.name || "User";
  const articleCount = savedArticles.length;

  const keywords = [
    ...new Set(savedArticles.map((article) => article.keyword)),
  ];

  let keywordText = "";

  if (keywords.length === 1) {
    keywordText = keywords[0];
  } else if (keywords.length === 2) {
    keywordText = `${keywords[0]} and ${keywords[1]}`;
  } else if (keywords.length === 3) {
    keywordText = `${keywords[0]}, ${keywords[1]}, and ${keywords[2]}`;
  } else if (keywords.length > 3) {
    keywordText = `${keywords[0]}, ${keywords[1]}, and ${
      keywords.length - 2
    } other`;
  }

  return (
    <main className="saved-news">
      <section className="saved-news__header">
        <p className="saved-news__label">Saved articles</p>
        <h1 className="saved-news__title">
          {userName}, you have {articleCount} saved{" "}
          {articleCount === 1 ? "article" : "articles"}
        </h1>
        {keywords.length > 0 && (
          <p className="saved-news__keywords">
            By keywords:{" "}
            <span className="saved-news__keyword-text">{keywordText}</span>
          </p>
        )}
      </section>

      <section className="saved-news__cards">
        <div className="saved-news__list">
          {savedArticles.map((article, index) => {
            const formattedDate = new Date(
              article.publishedAt
            ).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            });

            return (
              <article className="card" key={article.url || index}>
                <div className="card__image-container">
                  <span className="card__keyword">{article.keyword}</span>
                  <button
                    type="button"
                    className="card__delete-btn"
                    aria-label="Remove from saved"
                    onClick={() => handleDeleteArticle(article)}
                  ></button>

                  <img
                    src={article.urlToImage}
                    alt={article.title || "News article"}
                    className="card__image"
                  />
                </div>

                <div className="card__content">
                  <p className="card__date">{formattedDate}</p>
                  <h2 className="card__title">
                    {article.title || "No title available"}
                  </h2>
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
      </section>
    </main>
  );
}

export default SavedNews;
