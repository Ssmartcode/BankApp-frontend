import React from "react";

const TransactionDeposit = (props) => {
  console.log(props.currency);
  const depositAmount = new Intl.NumberFormat("ro-RO", {
    style: "currency",
    currency: props.currency,
  }).format(props.depositAmount);
  return (
    <p>
      Deposit: <strong className="text-primary">+{depositAmount}</strong>
    </p>
  );
};

export default TransactionDeposit;
