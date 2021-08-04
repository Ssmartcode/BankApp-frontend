import React from "react";

const TransactionWithdraw = (props) => {
  const withdrawAmount = new Intl.NumberFormat("ro-RO", {
    style: "currency",
    currency: props.currency,
  }).format(props.withdrawAmount);
  return (
    <p>
      Withdraw Amount:{" "}
      <strong className="text-danger">-{withdrawAmount}</strong>
    </p>
  );
};

export default TransactionWithdraw;
