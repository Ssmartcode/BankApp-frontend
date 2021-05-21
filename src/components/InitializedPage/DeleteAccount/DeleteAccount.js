import React, { useContext, useState } from "react";
import useFetch from "use-http";
import Modal from "react-modal";
import AuthContext from "../../../context/AuthContext";
import Spinner from "../../shared/Spinner/Spinner";
import Alert from "../../shared/Alert/Alert";

const DeleteAccount = (props) => {
  Modal.setAppElement("#modal");

  const authContext = useContext(AuthContext);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { del, response, loading, error } = useFetch(
    process.env.REACT_APP_BACKEND,
    {
      headers: { Authorization: `Bearer ${authContext.token}` },
    }
  );
  const [httpResponse, setHttpResponse] = useState("");

  // handle modal open/close
  const handleModalClose = () => {
    setModalIsOpen(false);
  };
  const handleModalOpen = () => {
    setModalIsOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const httpResponse = await del("/accounts/delete/" + props.accountId);
    if (response.ok) e.target.submit();
    setHttpResponse(httpResponse);
  };
  return (
    <div className="col-6 col-lg-4">
      <button
        className="btn btn-danger w-100 rounded-0"
        onClick={handleModalOpen}
      >
        Delete account
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleModalClose}
        contentLabel="Delete account modal"
        className="modal"
        style={{ overlay: { background: "rgba(0,0,0,0.5)" } }}
      >
        <h2>Stergerea contului va fi permanenta, doriti sa continuati?</h2>
        <form onSubmit={handleFormSubmit}>
          <button className="btn btn-danger" type="submit">
            Sterge cont
          </button>
        </form>
        {loading && <Spinner />}
        {error && <Alert className="mt-4">{httpResponse.message}</Alert>}
      </Modal>
    </div>
  );
};

export default DeleteAccount;
