import React from "react";

const TransactionWithdraw = (props) => {
  return (
    <p>
      Withdraw amount:{" "}
      <strong className="text-danger">-{props.withdrawAmount}</strong>
    </p>
  );
};

export default TransactionWithdraw;
