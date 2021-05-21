import React, { useState, useContext } from "react";
// hooks
import useFetch from "use-http";
// components
import Select from "../form-control/Select/Select";
import selectOptions from "../../../pages/UninitializedPage/selectOptions";
import Alert from "../Alert/Alert";
import Spinner from "../Spinner/Spinner";
// context
import AuthContext from "../../../context/AuthContext";
// css
import "./CreateAccount.css";

const CreateAccount = (props) => {
  // context
  const authContext = useContext(AuthContext);

  const [accountType, setAccountType] = useState("standard");
  const [accountCurrency, setAccountCurrency] = useState("ron");
  const [httpResponse, setHttpResponse] = useState("");

  const { post, error, loading, response } = useFetch(
    process.env.REACT_APP_BACKEND,
    {
      headers: {
        Authorization: `Bearer ${authContext.token}`,
      },
    }
  );

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const httpResponse = await post("/accounts", {
      accountType,
      accountCurrency,
    });
    if (response.ok) e.target.submit();
    setHttpResponse(httpResponse.message);
  };

  return (
    <React.Fragment>
      <form onSubmit={handleFormSubmit}>
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
        <button className="btn btn-primary w-100" type="submit">
          Creeaza cont
        </button>
      </form>
      {/* display error if any */}
      {error && <Alert className="mt-4">{httpResponse}</Alert>}
      {loading && <Spinner />}
    </React.Fragment>
  );
};

export default CreateAccount;
