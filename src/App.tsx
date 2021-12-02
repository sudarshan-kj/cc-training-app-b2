import "./App.css";
import List from "./components/List";
import InputWithLabel from "./components/InputWithLabel";
import useSemiPersistentState from "./hooks/useSemiPersistentState";

const list = [
  {
    title: "React",
    url: "https://reactjs.org/",
    author: "Jordan Walke",
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: "Learn React",
    url: "https://reactjs.org/",
    author: "Jordan Walke",
    num_comments: 3,
    points: 4,
    objectID: 1,
  },
  {
    title: "Redux",
    url: "https://redux.js.org/",
    author: "Dan Abramov, Andrew Clark",
    num_comments: 2,
    points: 5,
    objectID: 2,
  },
];

function App() {
  const [searchTerm, setSearchTerm] = useSemiPersistentState("", "searchTerm");
  //callback handler
  const handleSearchChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const filteredList: any = list.filter((item: any) =>
    item.title.includes(searchTerm)
  );

  return (
    <div className="container">
      <h1>Hacker Stories</h1>
      <InputWithLabel
        id="search"
        value={searchTerm}
        onChange={handleSearchChange}
      >
        Search
      </InputWithLabel>
      <List stories={filteredList} />
    </div>
  );
}
export default App;
