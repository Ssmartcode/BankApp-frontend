import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
import "./Select.css";

const Select = (props) => {
  const [selectValue, setSelectValue] = useState(props.defaultValue);
  const { onChange } = props;

  console.log(props.options);
  useEffect(() => {
    onChange(selectValue);
  }, [selectValue, onChange]);

  const handleSelect = (e) => {
    setSelectValue(e.target.value);
  };
  return (
    <div className="row select">
      <label className="col-4 text-light bg-dark">{props.label} </label>
      <select
        id={props.id}
        className={`form-select-personal col-8 bg-light ${
          props.className || ""
        }`}
        onChange={handleSelect}
        value={selectValue}
      >
        {props.options.map((option) => (
          <option key={v4()} value={option.value || option}>
            {option.text || option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
