import React, { useState, useContext } from "react";
// components
import Input from "../../components/shared/Input/Input";
import Alert from "../../components/shared/Alert/Alert";
// context
import AuthContext from "../../context/AuthContext";
// hooks
import useFormValidation from "../../hooks/useFormValidation";
import useFetch from "use-http";
// css
import "./Authentication.css";

const Authentication = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userAge, setUserAge] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const [isSignupMode, setIsSignupMode] = useState(true);
  const [httpResponse, setHttpResponse] = useState("");

  const { validators, validationState, allInputsValid } = useFormValidation();
  const { post, response, loading, error } = useFetch(
    process.env.REACT_APP_BACKEND
  );
  const authContext = useContext(AuthContext);

  // input validators
  const { isRequired, isPassword, isEmail } = validators;

  // swtich mode handler
  const handleSwitchMode = () => {
    setIsSignupMode((prev) => !prev);
    setHttpResponse("");
    setUserAge("");
    setUserEmail("");
    setUserName("");
    setUserAge("");
  };

  // form submit handler
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(isSignupMode);
    if (isSignupMode && allInputsValid(validationState.current)) {
      const httpResponse = await post("/users/signup", {
        userName,
        userEmail,
        userAge,
        userPassword,
      });
      setHttpResponse(httpResponse);
    }
    if (!isSignupMode) {
      const httpResponse = await post("/users/login", {
        userName,
        userPassword,
      });
      setHttpResponse(httpResponse);
      authContext.logIn(httpResponse.token, httpResponse.userData);
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center flex-column h-100 container">
      <div className="switch-mode">
        <strong
          className={!isSignupMode ? "active-mode" : ""}
          onClick={handleSwitchMode}
        >
          Login
        </strong>
        /
        <strong
          className={isSignupMode ? "active-mode" : ""}
          onClick={handleSwitchMode}
        >
          Signup
        </strong>
      </div>
      {isSignupMode && (
        <form onSubmit={handleFormSubmit}>
          <Input
            type="text"
            id="userName"
            onChange={setUserName}
            validators={[isRequired]}
            validationState={validationState}
            errorMessage="Is required"
            label="User Name:"
          />
          <Input
            type="text"
            id="userEmail"
            onChange={setUserEmail}
            validators={[isRequired, isEmail]}
            validationState={validationState}
            errorMessage="This is not a valid e-mai address"
            label="User Email:"
          />
          <Input
            type="number"
            id="userAge"
            onChange={setUserAge}
            validators={[isRequired]}
            validationState={validationState}
            errorMessage="Is required"
            label="User Age:"
          />
          <Input
            type="password"
            id="userPassword"
            onChange={setUserPassword}
            validators={[isRequired, isPassword]}
            validationState={validationState}
            errorMessage="Your password is not valid"
            label="User Password:"
          />
          <button className="btn btn-primary">Submit</button>
        </form>
      )}
      {!isSignupMode && (
        <form onSubmit={handleFormSubmit}>
          <Input
            type="text"
            id="userName"
            onChange={setUserName}
            validators={[isRequired]}
            validationState={validationState}
            errorMessage="Is required"
            label="User Name:"
          />
          <Input
            type="password"
            id="userPassword"
            onChange={setUserPassword}
            validators={[isRequired, isPassword]}
            validationState={validationState}
            errorMessage="Your password is not valid"
            label="User Password:"
          />
          <button className="btn btn-primary">Submit</button>
        </form>
      )}
      {/* alert with response or error from request */}
      {httpResponse ? (
        <Alert type={error ? "danger" : "success"} className="my-4">
          {httpResponse.message}
        </Alert>
      ) : null}
    </div>
  );
};

export default Authentication;
