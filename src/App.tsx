import "./App.css";
import List from "./components/List";
import InputWithLabel from "./components/InputWithLabel";
import useSemiPersistentState from "./hooks/useSemiPersistentState";
import { useEffect, useState } from "react";

const initList = [
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
    author: "Andrew Clark",
    num_comments: 2,
    points: 5,
    objectID: 2,
  },
];

function App() {
  const [searchTerm, setSearchTerm] = useSemiPersistentState("", "searchTerm");
  const [stories, setStories] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  const handleSearchChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const getAsyncStories = new Promise((res, rej) =>
    setTimeout(() => rej({ data: { stories: initList } }), 2000)
  );

  useEffect(() => {
    setLoading(true);
    getAsyncStories
      .then((result: any) => {
        setStories(result.data.stories);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const filteredList: any = stories.filter((item: any) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRemoveStory = (id: any) => {
    const newStories = stories.filter((item: any) => item.objectID !== id);
    setStories(newStories);
  };

  return (
    <div className="container">
      <h1>Hacker Stories</h1>
      <InputWithLabel
        id="search"
        value={searchTerm}
        onChange={handleSearchChange}
        autoFocus={true}
      >
        Search
      </InputWithLabel>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <List stories={filteredList} onDelete={handleRemoveStory} />
      )}
      {isError && <p>Something went wrong!</p>}
    </div>
  );
}
export default App;
