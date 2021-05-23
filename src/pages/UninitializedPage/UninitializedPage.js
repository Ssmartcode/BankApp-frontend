import React, { useState, useContext, useEffect } from "react";
import selectOptions from "./selectOptions";
// context
import AuthContext from "../../context/AuthContext";
// hoooks
import useFetch from "use-http";
import useFormValidation from "../../hooks/useFormValidation";
// components
import Alert from "../../components/shared/Alert/Alert";
import Input from "../../components/shared/form-control/Input/Input";
import Select from "../../components/shared/form-control/Select/Select";
import Spinner from "../../components/shared/Spinner/Spinner";
import UserInfo from "../../components/shared/UserInfo/UserInfo";
import ImageUpload from "../../components/shared/ImageUpload/ImageUpload";
// css
import "./UninitializedPage.css";
import previewImage from "./preview-image.jpg";

const UninitializedPage = (props) => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [accountType, setAccountType] = useState("");
  const [accountCurrency, setAccountCurrency] = useState("");

  const { validators, validationState } = useFormValidation();

  // input validators
  const { isRequired } = validators;

  const [httpResponse, setHttpResponse] = useState("");

  // authentication context
  const authContext = useContext(AuthContext);

  // useFetch hook
  const { post, response, loading, error } = useFetch(
    process.env.REACT_APP_BACKEND,
    {
      headers: {
        Authorization: `Bearer ${authContext.token}`,
      },
    }
  );

  // set image preview
  useEffect(() => {
    if (!image) return;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setImagePreview(fileReader.result);
    };
    fileReader.readAsDataURL(image);
  }, [image]);

  // set initialization to true and switch to initialization page whe isn response from server is ok
  useEffect(() => {
    if (response.ok) {
      // set isInitialized to true and update auth context to reflect the changes
      authContext.logIn(authContext.token, {
        ...authContext.userData,
        isInitialized: true,
      });
    }
  }, [authContext, response, httpResponse]);

  // fsubmit the form and send post request
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("userPhone", phone);
    formData.append("accountType", accountType);
    formData.append("accountCurrency", accountCurrency);
    formData.append("image", image);

    const httpResponse = await post("/users/initialization", formData);
    setHttpResponse(httpResponse);
  };
  return (
    <div className="py-5">
      <h4>Se pare ca e pentru prima oara cand foloseti acest cont</h4>
      <h4>Haideti sa facem setarile initiale:</h4>
      <form onSubmit={handleFormSubmit} className="mx-auto">
        <Select
          id="accountType"
          label="Tipul de cont:"
          options={selectOptions.accountType}
          onChange={setAccountType}
          defaultValue="standard"
        />
        <Select
          id="accountCurrency"
          label="Moneda contului:"
          options={selectOptions.accountCurrency}
          onChange={setAccountCurrency}
          defaultValue="ron"
        />
        {/* Card with user informations such as profile image, name, phone */}
        <UserInfo isForm imagePreview={imagePreview || previewImage}>
          {/* If inputs are needed send them as children */}
          <React.Fragment>
            <div className="user-fullName d-flex align-items-center ps-2">
              <p>Nume si Prenume:</p>
              <Input
                type="text"
                id="fullName"
                onChange={setFullName}
                validators={[isRequired]}
                validationState={validationState}
                errorMessage="Introdu nume si prenume"
                label="Nume si Prenume"
              />
            </div>
            <div className="user-phone d-flex align-items-center ps-2">
              <p>Numar de telefon:</p>
              <Input
                type="number"
                id="userPhone"
                onChange={setPhone}
                validators={[isRequired]}
                validationState={validationState}
                errorMessage="Numarul de telefon nu este valid"
                label="Numar de telefon"
              />
            </div>
            <ImageUpload handleImageUpload={setImage} />
          </React.Fragment>
        </UserInfo>

        {/* SUBMIT BUTTON */}
        <button type="submit" className="btn btn-primary">
          Finalizare
        </button>
      </form>

      {/* spinner */}
      {loading && <Spinner />}
      {/* alert */}
      {httpResponse ? (
        <Alert type={error ? "danger" : "success"} className="my-4">
          {httpResponse.message}
        </Alert>
      ) : null}
    </div>
  );
};

export default UninitializedPage;
