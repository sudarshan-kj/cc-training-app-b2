import { useEffect, useRef } from "react";

const InputWithLabel = ({
  onChange,
  value,
  children,
  id,
  autoFocus = false,
}: any) => {
  const inputRef = useRef<any>(null);
  //event handler function
  const handleChange = (e: any) => {
    onChange(e);
  };

  useEffect(() => {
    if (autoFocus && inputRef) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <>
      <label htmlFor={id}>{children}</label>
      <input ref={inputRef} id={id} value={value} onChange={handleChange} />
    </>
  );
};

export default InputWithLabel;
