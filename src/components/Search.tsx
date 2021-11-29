const Search = ({ onChange }: any) => {
  //event handler function
  const handleChange = (e: any) => {
    onChange(e);
  };

  return (
    <div>
      <label htmlFor="search">Search</label>
      <input id="search" onChange={handleChange} />
    </div>
  );
};

export default Search;
