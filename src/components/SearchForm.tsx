import InputWithLabel from "./InputWithLabel";

const SearchForm = ({ onSubmit, onSearch, searchTerm }: any) => {
  return (
    <form onSubmit={onSubmit}>
      <InputWithLabel
        id="search"
        value={searchTerm}
        onChange={onSearch}
        autoFocus={true}
      >
        Search
      </InputWithLabel>
      <button
        type="submit"
        disabled={!searchTerm}
        className={`submitButton ${!searchTerm ? "disButton" : ""}`}
      >
        Submit
      </button>
    </form>
  );
};

export default SearchForm;
