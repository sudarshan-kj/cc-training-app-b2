import { memo } from "react";
import styles from "./List.module.css";

type Story = {
  title: string;
  url: string;
  author: string;
  points: number;
  objectID: number;
  num_comments: number;
};

type ItemProps = {
  item: Story;
  onDelete: (id: number) => void;
};

export type Stories = Array<Story>;

type ListProps = {
  stories: Stories;
  onDelete: (id: number) => void;
};

const List = memo(({ stories, onDelete }: ListProps) => {
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
});

const Item = ({ item, onDelete }: ItemProps) => (
  <div>
    <span className={styles.itemTitle}>{item.title}</span>
    <span className={styles.itemUrl}>{item.url}</span>
    <span>{item.author}</span>
    <button
      onClick={() => {
        onDelete(item.objectID);
      }}
    >
      Delete
    </button>
  </div>
);

export default List;

export { Item };
