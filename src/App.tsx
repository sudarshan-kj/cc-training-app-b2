import "./App.css";
import List from "./components/List";
import Search from "./components/Search";
import { useState } from "react";

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
  const [searchTerm, setSearchTerm] = useState<any>("");

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
      <Search onChange={handleSearchChange} />
      <List stories={filteredList} />
    </div>
  );
}
export default App;
