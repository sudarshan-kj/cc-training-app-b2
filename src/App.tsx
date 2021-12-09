import "./App.css";
import List from "./components/List";
import useSemiPersistentState from "./hooks/useSemiPersistentState";
import {
  useCallback,
  useEffect,
  useReducer,
  useState,
  useMemo,
  ChangeEvent,
  FormEvent,
} from "react";
import axios from "axios";
import SearchForm from "./components/SearchForm";
import { Stories } from "./components/List";

type StoriesState = {
  data: Stories;
  isLoading: boolean;
  isError: boolean;
};

type StoriesAction = {
  type: string;
  payload?: any;
};

const storiesReducer = (state: StoriesState, action: StoriesAction) => {
  switch (action.type) {
    case "FETCH_INIT":
      return { ...state, isLoading: true, isError: false };
    case "SET_STORIES":
      return { data: action.payload, isLoading: false, isError: false };
    case "REMOVE_STORY": {
      const showStories = state.data.filter(
        (item: any) => item.objectID !== action.payload
      );
      return { data: showStories, isLoading: false, isError: false };
    }
    case "FETCH_STORIES_FAILED":
      return { ...state, isError: true, isLoading: false };
    default:
      return state;
  }
};

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";

function App() {
  const [searchTerm, setSearchTerm] = useSemiPersistentState("", "searchTerm");
  const [stories, dispatchStories] = useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });
  const [url, setUrl] = useState(API_ENDPOINT);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleStorySubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUrl(API_ENDPOINT + searchTerm);
  };

  const handleFetchStory = useCallback(async () => {
    dispatchStories({ type: "FETCH_INIT" });
    try {
      const response = await axios.get(url);
      console.log("Response is", response);
      dispatchStories({ type: "SET_STORIES", payload: response.data.hits });
    } catch (e) {
      dispatchStories({ type: "FETCH_STORIES_FAILED" });
    }
  }, [url]);

  useEffect(() => {
    handleFetchStory();
  }, [handleFetchStory]);

  const handleRemoveStory = useCallback((id: any) => {
    dispatchStories({ type: "REMOVE_STORY", payload: id });
  }, []);

  const getComments = useMemo(() => {
    return stories.data.reduce(
      (acc: number, current: any) => (acc += current.num_comments),
      0
    );
  }, [stories]);

  return (
    <div className="container">
      <h1>Hacker Stories with {getComments} comments</h1>
      <SearchForm
        onSearch={handleSearchChange}
        onSubmit={handleStorySubmit}
        searchTerm={searchTerm}
      />
      {stories.isLoading ? (
        <p>Loading...</p>
      ) : (
        <List stories={stories.data} onDelete={handleRemoveStory} />
      )}
      {stories.isError && <p>Something went wrong!</p>}
    </div>
  );
}
export default App;
