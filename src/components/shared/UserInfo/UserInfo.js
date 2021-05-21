import React from "react";
import "./UserInfo.css";

const UserInfo = (props) => {
  return (
    <div className="user-info">
      <div className="user-image">
        <img src={props.imagePreview || props.image || ""} alt="User" />
      </div>
      <div className="user-userEmail">
        Email address: <strong>{props.userEmail}</strong>
      </div>
      {props.isForm && props.children}
      {!props.isForm && (
        <React.Fragment>
          <div className="user-fullName d-flex align-items-center ">
            <p>Nume si prenume:</p>
            <strong>{props.fullName}</strong>
          </div>
          <div className="user-phone d-flex align-items-center">
            <p>Numar de telefon:</p>
            <strong>{props.userPhone}</strong>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default UserInfo;
