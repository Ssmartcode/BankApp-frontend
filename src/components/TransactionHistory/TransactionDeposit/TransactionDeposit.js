import React from "react";

const TransactionDeposit = (props) => {
  return (
    <p>
      DSuma depozitata:{" "}
      <strong className="text-primary">+{props.depositAmount}</strong>
    </p>
  );
};

export default TransactionDeposit;
