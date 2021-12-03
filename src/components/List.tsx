import styles from "./List.module.css";

const List = ({ stories, onDelete }: any) => {
  return (
    <div>
      <div className="tableHeader">
        <span>Title</span>
        <span>URL</span>
        <span>Author</span>
        <span>Action</span>
      </div>
      {stories.map((item: any) => (
        <Item key={item.objectID} item={item} onDelete={onDelete} />
      ))}
    </div>
  );
};

const Item = ({ item, onDelete }: any) => (
  <div>
    <span className={styles.itemTitle}>{item.title}</span>
    <span className={styles.itemUrl}>{item.url}</span>
    <span>{item.author}</span>
    <button onClick={() => onDelete(item.objectID)}>Delete</button>
  </div>
);

export default List;
