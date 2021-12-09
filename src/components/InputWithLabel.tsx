import { ChangeEvent, ReactChild } from "react";

type InputWithLabelProps = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  children: ReactChild;
  id: string;
  autoFocus: boolean;
};

const InputWithLabel = ({
  onChange,
  value,
  children,
  id,
  autoFocus = false,
}: InputWithLabelProps) => {
  //event handler function
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
