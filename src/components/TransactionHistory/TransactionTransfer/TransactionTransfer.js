import React from "react";

const TransactionTransfer = (props) => {
  const { transaction } = props;

  return (
    <React.Fragment>
      <p>
        Transfer{" "}
        {transaction.transferType === "send"
          ? `catre: ${transaction.destinationIBAN}`
          : `de la: ${transaction.senderIBAN}`}
      </p>
      <p>
        Suma transferata:{" "}
        <strong
          className={
            transaction.transferType === "send" ? "text-danger" : "text-primary"
          }
        >
          {transaction.transferAmount}
        </strong>
      </p>
    </React.Fragment>
  );
};

export default TransactionTransfer;
