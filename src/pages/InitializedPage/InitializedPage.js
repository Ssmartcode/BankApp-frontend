import React, { useContext, useEffect, useState } from "react";
// hooks
import useFetch from "use-http";
// components
import Spinner from "../../components/shared/Spinner/Spinner";
import UserInfo from "../../components/shared/UserInfo/UserInfo";
import UserAccount from "../../components/InitializedPage/UserAccount/UserAccount";
import Modal from "react-modal";
// context
import AuthContext from "../../context/AuthContext";
// css
import "./InitializedPage.css";
import CreateAccount from "../../components/shared/CreateAccount/CreateAccount";

const InitializedPage = () => {
  Modal.setAppElement("#modal");
  // context
  const authContext = useContext(AuthContext);
  const [userData, setUserData] = useState({});
  const { loading, get } = useFetch(process.env.REACT_APP_BACKEND, {
    headers: {
      Authorization: `Bearer ${authContext.token}`,
      "Cache-Control": "no-cache",
    },
  });

  // get data for specific user
  useEffect(() => {
    const { userId } = authContext.userData;
    (async () => {
      const response = await get(`/users/${userId}`);
      console.log(response.userData);
      setUserData(response.userData);
    })();
  }, [get, authContext]);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleModalOpen = () => {
    setModalIsOpen(true);
  };
  const handleModalClose = () => {
    setModalIsOpen(false);
  };

  return (
    <React.Fragment>
      {userData && (
        <React.Fragment>
          {/* informations about the user */}
          <UserInfo
            userName={userData.userName}
            userEmail={userData.userEmail}
            fullName={userData.fullName}
            userPhone={userData.userPhone}
            image={`${process.env.REACT_APP_BACKEND}/uploads/images/${userData.userImage}`}
          />

          {/* map through all the user accounts */}
          <div className="user-accounts row justify-content-center">
            {userData.userAccounts &&
              userData.userAccounts.map((account) => (
                <div key={account} className="col-12 col-lg-6">
                  <UserAccount accountId={account} />
                </div>
              ))}
          </div>
        </React.Fragment>
      )}

      {/* open new account button--opens a modal */}
      <div className="">
        <button className="btn btn-secondary" onClick={handleModalOpen}>
          Deschide un cont nou
        </button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={handleModalClose}
          contentLabel="Add to deposit modal"
          className="modal"
          style={{ overlay: { background: "rgba(0,0,0,0.5)" } }}
        >
          <CreateAccount closeModal={handleModalClose} />
        </Modal>
      </div>

      {/* Spinner */}
      {loading && <Spinner />}
    </React.Fragment>
  );
};

export default InitializedPage;
