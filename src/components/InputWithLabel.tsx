const InputWithLabel = ({ onChange, value, children, id }: any) => {
  //event handler function
  const handleChange = (e: any) => {
    onChange(e);
  };

  return (
    <>
      <label htmlFor={id}>{children}</label>
      <input id={id} value={value} onChange={handleChange} />
    </>
  );
};

export default InputWithLabel;
