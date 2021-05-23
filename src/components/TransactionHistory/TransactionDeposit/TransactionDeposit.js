import React from "react";

const TransactionDeposit = (props) => {
  return (
    <p>
      Deposit amount:{" "}
      <strong className="text-primary">+{props.depositAmount}</strong>
    </p>
  );
};

export default TransactionDeposit;
