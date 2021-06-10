import React from "react";

const TransactionWithdraw = (props) => {
  return (
    <p>
      Suma retrasa:{" "}
      <strong className="text-danger">-{props.withdrawAmount}</strong>
    </p>
  );
};

export default TransactionWithdraw;
