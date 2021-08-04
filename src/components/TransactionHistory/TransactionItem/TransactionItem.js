import React from "react";
import { v4 } from "uuid";
import TransactionDeposit from "../TransactionDeposit/TransactionDeposit";
import TransactionTransfer from "../TransactionTransfer/TransactionTransfer";
import TransactionWithdraw from "../TransactionWithdraw/TransactionWithdraw";

const TransactionItem = (props) => {
  const { transaction } = props;
  return (
    <div key={v4()} className="list-group-item p-0">
      <div
        className={`transaction-type-${transaction.type} py-1 w-100 text-center text-uppercase `}
      >
        {transaction.type}
      </div>
      <div className="transaction-body p-3">
        {transaction.type === "deposit" && (
          <TransactionDeposit
            depositAmount={transaction.depositAmount}
            currency={transaction.currency}
          />
        )}
        {transaction.type === "withdraw" && (
          <TransactionWithdraw
            withdrawAmount={transaction.withdrawAmount}
            currency={transaction.currency}
          />
        )}
        {transaction.type === "transfer" && (
          <TransactionTransfer
            transaction={transaction}
            currency={transaction.currency}
          />
        )}
        <div className="time-stamp pt-2">
          Transaction date: <strong>{props.date}</strong>
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;
