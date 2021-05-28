import React, { useContext, useState } from "react";
// components
import Input from "../../shared/form-control/Input/Input";
import Alert from "../../shared/Alert/Alert";
import Modal from "react-modal";
import Spinner from "../../shared/Spinner/Spinner";
// hooks
import useFormValidation from "../../../hooks/useFormValidation";
import useFetch from "use-http";
// context
import AuthContext from "../../../context/AuthContext";
import transferImg from "./transfer.png";

const TransferMoney = (props) => {
  Modal.setAppElement("#modal");
  // context
  const authContext = useContext(AuthContext);

  const [transferAmount, setTransferAmount] = useState(0);
  const [destinationIBAN, setDestinationIBAN] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [httpResponse, setHttpResponse] = useState("");

  const { post, loading, error, response } = useFetch(
    process.env.REACT_APP_BACKEND,
    {
      headers: { Authorization: `Bearer ${authContext.token}` },
    }
  );
  const { validators, validationState } = useFormValidation();
  const { isGreaterThan, isRequired } = validators;

  // handle modal open/close
  const handleModalClose = () => {
    setModalIsOpen(false);
  };
  const handleModalOpen = () => {
    setModalIsOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const httpResponse = await post("/accounts/transfer/" + props.accountId, {
      transferAmount,
      destinationIBAN,
    });
    // if no errors then submit the form
    if (response.ok) {
      e.target.submit();
    }
    // if there are errors set the httpResponse
    setHttpResponse(httpResponse.message);
  };
  return (
    <div className="col-6 col-lg-4">
      <button
        className="btn btn-light w-100 rounded-0"
        onClick={handleModalOpen}
      >
        <img src={transferImg} alt="" className="button-img" />
        Transfera
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleModalClose}
        contentLabel="Transfer modal"
        className="modal"
        style={{ overlay: { background: "rgba(0,0,0,0.5)" } }}
      >
        <form className="text-center" onSubmit={handleFormSubmit}>
          <h2>Transfera suma catre un alt cont:</h2>
          <fieldset disabled>
            <input
              type="text"
              className="form-control mb-2 text-center"
              value={`Din contul: ${props.accountIBAN}`}
            />
          </fieldset>
          <Input
            type="number"
            id="transferAmount"
            onChange={setTransferAmount}
            validators={[isGreaterThan]}
            minValue={1}
            validationState={validationState}
            errorMessage="Acest camp este necesar"
            label="Transfera suma:"
          />
          <Input
            type="text"
            id="transferTo"
            onChange={setDestinationIBAN}
            validators={[isRequired]}
            validationState={validationState}
            errorMessage="Acest camp este necesar"
            label="IBAN destinatar:"
          />
          <button className="btn btn-primary mt-3 w-100" type="submit">
            Transfer
          </button>
          {loading && <Spinner />}
          {error && <Alert className="mt-4">{httpResponse}</Alert>}
        </form>
      </Modal>
    </div>
  );
};

export default TransferMoney;
