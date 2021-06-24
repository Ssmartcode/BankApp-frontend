import React, { useContext, useEffect, useState } from "react";
import "./TransactionsHistory.css";
import { useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import useFetch from "use-http";
import Spinner from "../../components/shared/Spinner/Spinner";
import moment from "moment";
import TransactionItem from "../../components/TransactionHistory/TransactionItem/TransactionItem";
import pdfImage from "./pdf.png";
import DownloadLink from "../../components/shared/DownloadLInk/DownloadLink";

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
      const response = await get("/accounts/" + accountId);
      setTransactionsHistory(response.accountData.transactionsHistory);
    })();
  }, [get, authContext, accountId]);
  return (
    <div className="small-container mx-auto list-group">
      <div className="list-group-item download-pdf">
        <img src={pdfImage} alt="pdf file" />
        <DownloadLink
          link={`/accounts/getTransactions/${accountId}`}
          fileName={`History-${authContext.userData.userName}-${accountId}`}
        >
          Descarca PDF
        </DownloadLink>
      </div>
      {loading && <Spinner />}
      {transactionsHistory &&
        transactionsHistory
          .sort((transaction1, transaction2) => {
            const t1 = new Date(transaction1.timeStamp);
            const t2 = new Date(transaction2.timeStamp);
            return t2 - t1;
          })
          .map((transaction) => {
            const timeStamp = new Date(transaction.timeStamp);
            const date = moment(timeStamp).format("DD-MM-YYYY ");
            return <TransactionItem date={date} transaction={transaction} />;
          })}
    </div>
  );
};

export default TransactionsHistory;
