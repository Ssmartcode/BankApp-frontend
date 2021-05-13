import React, { useState } from "react";
// css
import "./Input.css";
const Input = (props) => {
  const [input, setInput] = useState("");
  const handleInput = (e) => {
    setInput(e.target.value);
  };
  return (
    <input
      type={props.type}
      id={props.id}
      value={input}
      onChange={handleInput}
    />
  );
};

export default Input;
