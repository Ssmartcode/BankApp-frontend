import React, { useContext, useEffect, useState } from "react";
import "./TransactionsHistory.css";
import { useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import useFetch from "use-http";
import Spinner from "../../components/shared/Spinner/Spinner";
import moment from "moment";
import TransactionItem from "../../components/TransactionHistory/TransactionItem/TransactionItem";

const TransactionsHistory = () => {
  // context
  const authContext = useContext(AuthContext);
  const accountId = useParams().accountId;

  const [transactionsHistory, setTransactionsHistory] = useState();

  const { get, loading } = useFetch(process.env.REACT_APP_BACKEND, {
    headers: { Authorization: `Bearer ${authContext.token}` },
  });

  useEffect(() => {
    (async () => {
      // const response = await get("/accounts/" + accountId);
      const response = await fetch(
        `http://localhost:5000/accounts/${accountId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authContext.token}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setTransactionsHistory(data.accountData.transactionsHistory);
    })();
  }, [get, authContext, accountId]);
  return (
    <div className="small-container mx-auto list-group">
      {loading && <Spinner />}

      {transactionsHistory &&
        transactionsHistory.map((transaction) => {
          const timeStamp = new Date(transaction.timeStamp);
          const date = moment(timeStamp).format("DD-MM-YYYY ");
          return <TransactionItem date={date} transaction={transaction} />;
        })}
    </div>
  );
};

export default TransactionsHistory;
