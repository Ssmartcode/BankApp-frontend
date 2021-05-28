import React, { useState, useContext } from "react";
// hooks
import useFetch from "use-http";
// components
import Select from "../../shared/form-control/Select/Select";
import selectOptions from "./selectOptions";
import Alert from "../../shared/Alert/Alert";
import Spinner from "../../shared/Spinner/Spinner";
import Modal from "react-modal";
// context
import AuthContext from "../../../context/AuthContext";
// css
import "./CreateAccount.css";
import newAccountImg from "./new-account.png";

const CreateAccount = () => {
  // context
  const authContext = useContext(AuthContext);

  const [accountType, setAccountType] = useState("standard");
  const [accountCurrency, setAccountCurrency] = useState("ron");
  const [httpResponse, setHttpResponse] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

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

  // handle modal open/close
  const handleModalClose = () => {
    setModalIsOpen(false);
  };
  const handleModalOpen = () => {
    setModalIsOpen(true);
  };

  return (
    <div className="py-4">
      <button className="btn btn-secondary" onClick={handleModalOpen}>
        <img src={newAccountImg} alt="" className="button-img" />
        Deschide un cont nou
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleModalClose}
        contentLabel="Add to deposit modal"
        className="modal"
        style={{ overlay: { background: "rgba(0,0,0,0.5)" } }}
      >
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
            defaultValue="RON"
          />
          <button className="btn btn-primary w-100" type="submit">
            Creeaza cont
          </button>
        </form>
        {/* display error if any */}
        {error && <Alert className="mt-4 w-100">{httpResponse}</Alert>}
        {loading && <Spinner />}
      </Modal>
    </div>
  );
};

export default CreateAccount;
