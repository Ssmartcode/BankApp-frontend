import React from "react";

const Alert = (props) => {
  return (
    <div className={`alert alert-${props.type || "danger"} ${props.className}`}>
      <div className="text-center">{props.children}</div>
    </div>
  );
};

export default Alert;
