const List = ({ stories }: any) => {
  return (
    <div>
      <div className="tableHeader">
        <span>Title</span>
        <span>URL</span>
        <span>Author</span>
      </div>
      {stories.map((item: any) => (
        <Item key={item.objectID} item={item} />
      ))}
    </div>
  );
};

const Item = ({ item }: any) => (
  <div>
    <span>{item.title}</span>
    <span>{item.url}</span>
    <span>{item.author}</span>
  </div>
);

export default List;
