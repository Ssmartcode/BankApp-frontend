import React, { useContext, useState } from "react";
import Input from "../../shared/form-control/Input/Input";
import useFormValidation from "../../../hooks/useFormValidation";
import useFetch from "use-http";
import AuthContext from "../../../context/AuthContext";
import Modal from "react-modal";
import Spinner from "../../shared/Spinner/Spinner";
import Alert from "../../shared/Alert/Alert";
import withdrawImg from "./withdraw.png";

const WithdrawMoney = (props) => {
  Modal.setAppElement("#modal");
  // context
  const authContext = useContext(AuthContext);

  const [withdraw, setWithdraw] = useState(0);
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
    const httpResponse = await post("/accounts/withdraw/" + props.accountId, {
      withdrawAmount: withdraw,
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
        className="btn btn-warning w-100 rounded-0"
        onClick={handleModalOpen}
      >
        <img src={withdrawImg} alt="" className="button-img" />
        Retrage
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleModalClose}
        contentLabel="Withdraw modal"
        className="modal"
        style={{ overlay: { background: "rgba(0,0,0,0.5)" } }}
      >
        <form className="text-center" onSubmit={handleFormSubmit}>
          <h2>Retrage din cont:</h2>
          <Input
            type="number"
            id="withdraw"
            onChange={setWithdraw}
            validators={[isGreaterThan]}
            minValue={0.01}
            validationState={validationState}
            errorMessage="Acest camp este necesar"
            label="Retrage din cont:"
          />
          <button className="btn btn-warning mt-3 w-100" type="submit">
            Retrage
          </button>
          {loading && <Spinner />}
          {error && <Alert className="mt-4">{httpResponse}</Alert>}
        </form>
      </Modal>
    </div>
  );
};

export default WithdrawMoney;
