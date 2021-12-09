import { ChangeEvent, FormEvent } from "react";
import InputWithLabel from "./InputWithLabel";

type SearchFormProps = {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  searchTerm: string;
};

const SearchForm = ({ onSubmit, onSearch, searchTerm }: SearchFormProps) => {
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
