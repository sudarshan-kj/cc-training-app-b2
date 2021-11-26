import { useState } from "react";

const Search = () => {
  const searchStateArr = useState<any>("");
  const searchTerm = searchStateArr[0];
  const setSearchTerm = searchStateArr[1];

  //handler function
  const handleChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <label htmlFor="search">Search</label>
      <input id="search" onChange={handleChange} />
      <h1>{searchTerm}</h1>
    </div>
  );
};

export default Search;
