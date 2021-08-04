import React from "react";

const TransactionTransfer = (props) => {
  const { transaction } = props;
  const transferAmount = new Intl.NumberFormat("ro-RO", {
    style: "currency",
    currency: transaction.currency,
  }).format(transaction.transferAmount);

  return (
    <React.Fragment>
      <p>
        Transfer{" "}
        {transaction.transferType === "send"
          ? `to: ${transaction.destinationIBAN}`
          : `from: ${transaction.senderIBAN}`}
      </p>
      <p>
        Amount Transferred:{" "}
        <strong
          className={
            transaction.transferType === "send" ? "text-danger" : "text-primary"
          }
        >
          {transaction.transferType === "send" ? "-" : "+"}
          {transferAmount}
        </strong>
      </p>
    </React.Fragment>
  );
};

export default TransactionTransfer;
