import { useState } from "react";
import "./SearchForm.css";

function SearchForm({ onSearch }) {
  const [keyword, setKeyword] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(keyword);
  };

  return (
    <form className="search-form" onSubmit={handleSearchSubmit}>
      <input
        className="search-form__input"
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Enter topic"
      />
      <button className="search-form__button" type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchForm;
