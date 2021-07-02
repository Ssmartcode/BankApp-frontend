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
          Autentificare
        </strong>
        /
        <strong
          className={isSignupMode ? "active-mode" : ""}
          onClick={handleSwitchMode}
        >
          Inregistrare
        </strong>
      </div>

      {/* signup mode */}
      {isSignupMode && (
        <form onSubmit={handleFormSubmit}>
          <Input
            type="text"
            id="userName"
            onChange={setUserName}
            validators={[isRequired]}
            validationState={validationState}
            errorMessage="Acest camp este necesar"
            label="Nume utilizator"
          />
          <Input
            type="text"
            id="userEmail"
            onChange={setUserEmail}
            validators={[isRequired, isEmail]}
            validationState={validationState}
            errorMessage="Adresa de e-mail nu este valida"
            label="Adresa de e-mail:"
          />
          <Input
            type="number"
            id="userAge"
            onChange={setUserAge}
            validators={[isRequired]}
            validationState={validationState}
            errorMessage="Acest camp este necesar"
            label="Varsta utilizator:"
          />
          <Input
            type="password"
            id="userPassword"
            onChange={setUserPassword}
            validators={[isRequired, isPassword]}
            validationState={validationState}
            errorMessage="Parola nu este valida"
            label="Parola utilizator:"
          />
          <button className="form-button w-100">Trimite</button>
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
            errorMessage="Introduceti un nume de utilizator"
            label="Nume utilizator:"
          />
          <Input
            type="password"
            id="userPassword"
            onChange={setUserPassword}
            validators={[isRequired, isPassword]}
            validationState={validationState}
            errorMessage="Parola nu este valida"
            label="Parola:"
          />
          <button className="form-button w-100">Trimite</button>
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
