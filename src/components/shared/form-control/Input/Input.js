import React, { useState, useEffect, useRef } from "react";
// css
import "./Input.css";

const Input = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [isInputValid, setIsInputValid] = useState(false);
  const [inputTouched, setInputTouched] = useState(false);

  // props required for validation
  const { validators, onChange, validationState, id } = props;
  const inputRef = useRef();

  // optional arguments for validation
  const { minLength = 0, maxLength = 9999, minValue = 0.01 } = props;

  useEffect(() => {
    const validatorArguments = { minLength, maxLength, minValue };
    // check if input is valid for every validator sent on props
    const validationResult = validators.every((validator) =>
      validator(inputValue, validatorArguments)
    );
    // update input validation state
    setIsInputValid(validationResult);
    validationState.current[id] = validationResult;
    // send input value to parent
    onChange(inputValue);
  }, [
    inputValue,
    validators,
    isInputValid,
    id,
    validationState,
    minLength,
    maxLength,
    minValue,
    onChange,
  ]);

  // input handlers
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleOnBlur = () => {
    setInputTouched(true);
  };

  return (
    <div className="group-input mb-2">
      <input
        id={props.id}
        onBlur={handleOnBlur}
        className={`form-control ${
          !isInputValid && inputTouched ? "invalid" : ""
        }`}
        ref={inputRef}
        type={props.type}
        onChange={handleInputChange}
        value={inputValue}
        label={props.label}
        placeholder={props.placeholder || props.label}
      ></input>
      <div className="input-error d-block mt-1 text-danger">
        {!isInputValid && inputTouched ? props.errorMessage : ""}
      </div>
    </div>
  );
};

export default Input;
