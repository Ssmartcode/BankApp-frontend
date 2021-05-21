import React, { useContext, useState } from "react";
import "./DepositMoney.css";
import Input from "../../shared/form-control/Input/Input";
import useFormValidation from "../../../hooks/useFormValidation";
import useFetch from "use-http";
import AuthContext from "../../../context/AuthContext";
import Modal from "react-modal";
import Spinner from "../../shared/Spinner/Spinner";
import Alert from "../../shared/Alert/Alert";

const DepositMoney = (props) => {
  Modal.setAppElement("#modal");
  // context
  const authContext = useContext(AuthContext);

  const [deposit, setDeposit] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [httpResponse, setHttpResponse] = useState("");

  const { post, loading, error, response } = useFetch(
    process.env.REACT_APP_BACKEND,
    {
      headers: { Authorization: `Bearer ${authContext.token}` },
    }
  );
  const { validators, validationState } = useFormValidation();
  const { isGreaterThan } = validators;

  // handle modal open/close
  const handleModalClose = () => {
    setModalIsOpen(false);
  };
  const handleModalOpen = () => {
    setModalIsOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const httpResponse = await post("/accounts/deposit/" + props.accountId, {
      depositAmount: deposit,
    });
    if (response.ok) {
      e.target.submit();
    }
    setHttpResponse(httpResponse.message);
  };
  return (
    <div className="col-6 col-lg-4">
      <button
        className="btn btn-primary w-100 rounded-0"
        onClick={handleModalOpen}
      >
        Deposit
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleModalClose}
        contentLabel="Add to deposit modal"
        className="modal"
        style={{ overlay: { background: "rgba(0,0,0,0.5)" } }}
      >
        <form className="text-center" onSubmit={handleFormSubmit}>
          <h2>Adauga in cont:</h2>
          <Input
            type="number"
            id="userAge"
            onChange={setDeposit}
            validators={[isGreaterThan]}
            minValue={1}
            validationState={validationState}
            errorMessage="Acest camp este necesar"
            label="Adauga in cont:"
          />
          <button className="btn btn-primary mt-3 w-100" type="submit">
            Adauga
          </button>
          {/* spinner */}
          {loading && <Spinner />}
          {/* error if any */}
          {!response.ok && error && (
            <Alert className="mt-4">{httpResponse}</Alert>
          )}
        </form>
      </Modal>
    </div>
  );
};

export default DepositMoney;
