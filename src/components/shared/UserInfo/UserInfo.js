import React from "react";
import "./UserInfo.css";

const UserInfo = (props) => {
  return (
    <div className="user-info">
      <div className="user-image">
        <img src={props.imagePreview || props.image || ""} alt="User" />
      </div>
      <p className="user-userEmail ps-2">
        Email address: <strong>{props.userEmail}</strong>
      </p>
      {props.isForm && props.children}
      {!props.isForm && (
        <React.Fragment>
          <p className="user-fullName d-flex align-items-center ps-2">
            <span>Full Name:</span>{" "}
            <strong className="ms-1">{props.fullName}</strong>
          </p>
          <p className="user-phone d-flex align-items-center ps-2">
            Phone Number: <strong className="ms-1">{props.userPhone}</strong>
          </p>
        </React.Fragment>
      )}
    </div>
  );
};

export default UserInfo;
