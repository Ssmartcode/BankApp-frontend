import React, { useState, useContext } from "react";
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
  const [httpResponse, setHttpResponse] = useState("");

  const { validators, validationState, allInputsValid } = useFormValidation();
  const { post, loading, error } = useFetch(process.env.REACT_APP_BACKEND);
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
    <div className="h-100 col-12 col-lg-6 px-2 mx-auto">
      {/* SWITCHES -- LOGIN/SIGNUP */}
      <div className="switch-mode mb-3 text-center mt-5 ">
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
          <button className="btn btn-primary w-100">Submit</button>
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
          <button className="btn btn-primary w-100">Submit</button>
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
