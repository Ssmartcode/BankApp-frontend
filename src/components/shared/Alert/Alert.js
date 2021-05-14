import React from "react";

const Alert = (props) => {
  return (
    <div className={`alert alert-${props.type || "danger"} ${props.className}`}>
      {props.children}
    </div>
  );
};

export default Alert;
