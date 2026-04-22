import SearchForm from "../SearchForm/SearchForm";
import NewsCardList from "../NewsCardList/NewsCardList";
import About from "../About/About.jsx";
import "./Main.css";

function Main({
  onSearch,
  articles,
  isLoading,
  handleSaveArticle,
  savedArticles,
  hasSearched,
  errorMessage,
  visibleArticles,
  onShowMore,
  isLoggedIn,
}) {
  return (
    <>
      <main className="main">
        <div className="main__content">
          <h1 className="main__title">What's going on in the world?</h1>
          <p className="main__subtitle">
            Find the latest news on any topic and save them in your personal
            account.
          </p>
          <SearchForm onSearch={onSearch} />
        </div>
      </main>

      <NewsCardList
        articles={articles}
        isLoading={isLoading}
        hasSearched={hasSearched}
        errorMessage={errorMessage}
        visibleArticles={visibleArticles}
        onShowMore={onShowMore}
        handleSaveArticle={handleSaveArticle}
        savedArticles={savedArticles}
        isLoggedIn={isLoggedIn}
      />
      <About />
    </>
  );
}

export default Main;
