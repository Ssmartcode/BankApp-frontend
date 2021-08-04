import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
// components
import Input from "../../components/shared/form-control/Input/Input";
import Alert from "../../components/shared/Alert/Alert";
// context
import AuthContext from "../../context/AuthContext";
// hooks
import useFormValidation from "../../hooks/useFormValidation";
import useFetch from "use-http";
// css
import "./Authentication.css";
import Spinner from "../../components/shared/Spinner/Spinner";

const Authentication = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userAge, setUserAge] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const [isSignupMode, setIsSignupMode] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [httpResponse, setHttpResponse] = useState("");

  const { validators, validationState, allInputsValid } = useFormValidation();
  const { post, loading, error, response } = useFetch(
    process.env.REACT_APP_BACKEND
  );
  const authContext = useContext(AuthContext);

  // input validators
  const { isRequired, isPassword, isEmail, isMinLength, isGreaterThan } =
    validators;

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
    if (isSignupMode && allInputsValid(validationState.current)) {
      const httpResponse = await post("/users/signup", {
        userName,
        userEmail,
        userAge,
        userPassword,
      });
      setHttpResponse(httpResponse);
      if (response.ok) setIsSignupMode(false);
    }
    if (!isSignupMode) {
      const httpResponse = await post("/users/login", {
        userName,
        userPassword,
        timeStamp: new Date().getTime(),
      });
      setHttpResponse(httpResponse);
      authContext.logIn(httpResponse.token, httpResponse.userData);
      if (response.ok) {
        setIsAuthenticated(true);
      }
    }
  };
  return (
    <div className="authentication h-100 col-12 col-lg-4 mx-auto mt-5">
      {isAuthenticated && <Redirect to="/dashboard" />}

      {/* SWITCHES -- LOGIN/SIGNUP */}
      <div className="switch-mode mb-3 text-center">
        <strong
          className={!isSignupMode ? "active-mode" : ""}
          onClick={handleSwitchMode}
        >
          LogIn
        </strong>
        /
        <strong
          className={isSignupMode ? "active-mode" : ""}
          onClick={handleSwitchMode}
        >
          Register
        </strong>
      </div>

      {/* signup mode */}
      {isSignupMode && (
        <form onSubmit={handleFormSubmit}>
          <Input
            type="text"
            id="userName"
            onChange={setUserName}
            validators={[isMinLength]}
            validationState={validationState}
            minLength={3}
            errorMessage="Your user name should have at least 3 characters"
            label="User Name:"
          />
          <Input
            type="text"
            id="userEmail"
            onChange={setUserEmail}
            validators={[isRequired, isEmail]}
            validationState={validationState}
            errorMessage="Your e-mail address is invalid"
            label="E-mail"
          />
          <Input
            type="number"
            id="userAge"
            onChange={setUserAge}
            validators={[isGreaterThan]}
            minValue={18}
            validationState={validationState}
            errorMessage="You must be 18 years of age or older"
            label="Age:"
          />
          <Input
            type="password"
            id="userPassword"
            onChange={setUserPassword}
            validators={[isRequired, isPassword]}
            validationState={validationState}
            errorMessage="Password not valid"
            label="Password:"
          />
          <button className="form-button w-100">Send</button>
        </form>
      )}

      {/* login mode */}
      {!isSignupMode && (
        <form onSubmit={handleFormSubmit}>
          <Input
            type="text"
            id="userName"
            onChange={setUserName}
            validators={[isRequired]}
            validationState={validationState}
            errorMessage="User Name is required"
            label="User Name:"
          />
          <Input
            type="password"
            id="userPassword"
            onChange={setUserPassword}
            validators={[isRequired, isPassword]}
            validationState={validationState}
            errorMessage="Password not valid"
            label="Passowrd:"
          />
          <button className="form-button w-100">Send</button>
        </form>
      )}
      {/* loading spinner */}
      {loading && <Spinner />}
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
