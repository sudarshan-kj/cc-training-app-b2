import styles from "./App.module.css";

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
    title: "Redux",
    url: "https://redux.js.org/",
    author: "Dan Abramov, Andrew Clark",
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

function getTitle() {
  return "Hello React";
}

function App() {
  return (
    <div className={styles.container}>
      <h1>{getTitle()}</h1>
      <label htmlFor="search">Search</label>
      <input id="search" />
      {list.map((item) => (
        <div>
          <p>{item.title}</p>
          <p>{item.url}</p>
          <p>{item.author}</p>
        </div>
      ))}
    </div>
  );
}
export default App;
