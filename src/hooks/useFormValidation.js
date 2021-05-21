import { useRef } from "react";

const validators = {
  isRequired: function (input) {
    return input.length > 0;
  },
  isPassword: function (input) {
    // const passwordPattern = /[A-Z].*\d|\d.*[A-Z]/.test(input);
    const passwordPattern = true;
    return input.length > 0 && passwordPattern;
  },
  isEmail: function (input) {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(String(input).toLowerCase());
  },
  isMinLength: function (input, args) {
    return input.length >= args.minLength;
  },
  isMaxLength: function (input, args) {
    return input.length <= args.maxLength;
  },
  isGreaterThan: function (input, args) {
    return input > args.minValue;
  },
};

const allInputsValid = (validationState) => {
  // get all the values of validation state values and check if any value is false
  // this will check if any input is not valid - the object has the id of input as a key and true/false as a value
  return Object.values(validationState).every((value) => value);
};

const useFormValidation = (props) => {
  // an object that stores the input id and the validation state (valid--true or invalid--false)
  const validationState = useRef({});

  return { validators, validationState, allInputsValid };
};

export default useFormValidation;
