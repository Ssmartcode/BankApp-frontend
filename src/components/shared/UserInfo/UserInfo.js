import React from "react";
import "./UserInfo.css";

const UserInfo = (props) => {
  return (
    <div className="user-info">
      <div className="user-image">
        <img src={props.imagePreview || props.image || ""} alt="User" />
      </div>
      <div className="user-userEmail ps-2">
        Email address: <strong>{props.userEmail}</strong>
      </div>
      {props.isForm && props.children}
      {!props.isForm && (
        <React.Fragment>
          <div className="user-fullName d-flex align-items-center ps-2">
            Nume si prenume: <strong>{props.fullName}</strong>
          </div>
          <div className="user-phone d-flex align-items-center ps-2">
            Numar de telefon: <strong>{props.userPhone}</strong>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default UserInfo;
