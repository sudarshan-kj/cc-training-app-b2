import { useEffect, useRef } from "react";

const InputWithLabel = ({
  onChange,
  value,
  children,
  id,
  autoFocus = false,
}: any) => {
  //event handler function
  const handleChange = (e: any) => {
    onChange(e);
  };

  return (
    <>
      <label htmlFor={id}>{children}</label>
      <input
        autoFocus={autoFocus}
        id={id}
        value={value}
        onChange={handleChange}
      />
    </>
  );
};

export default InputWithLabel;
