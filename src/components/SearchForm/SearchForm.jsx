import "./SearchForm.css";

function SearchForm() {
  return (
    <form className="search-form">
      <input
        className="search-form__input"
        type="text"
        placeholder="Enter topic"
      />
      <button className="search-form__button" type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchForm;
