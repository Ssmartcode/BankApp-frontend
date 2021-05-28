import React, { useEffect, useState, useContext } from "react";
// components
import Spinner from "../../shared/Spinner/Spinner";
import currencyMap from "./currencyMap";
import DepositMoney from "../DepositMoney/DepositMoney";
import TransferMoney from "../TransferMoney/TransferMoney";
// hooks
import useFetch from "use-http";
// context
import AuthContext from "../../../context/AuthContext";
// css
import "./UserAccount.css";
import WithdrawMoney from "../WithdrawMoney/WithdrawMoney";
import { Link } from "react-router-dom";
import transactionsHistory from "./transactionsLog.png";

const UserAccount = (props) => {
  const authContext = useContext(AuthContext);

  const [accountInfo, setAccountInfo] = useState({});

  const { get, loading } = useFetch(process.env.REACT_APP_BACKEND, {
    headers: { Authorization: `Bearer ${authContext.token}` },
  });

  useEffect(() => {
    (async () => {
      const response = await get("/accounts/" + props.accountId);
      setAccountInfo(response.accountData);
    })();
  }, [get, props.accountId]);

  return (
    <div className="user-account">
      {/* SPINNER */}
      {loading && <Spinner />}

      {/* account informations */}
      <div
        className={`title ${
          accountInfo.accountType === "standard" ? "bg-standard" : "bg-business"
        }`}
      >
        Cont {accountInfo.accountType}
      </div>
      <div className="account-content row  g-0">
        <div className="iban col-12 p-3">
          <strong>IBAN: </strong>
          {accountInfo.accountIBAN}
        </div>
        <div className="deposit col-6 py-2 bg-secondary text-light d-flex align-items-center justify-content-center">
          <span className="me-1">Sold:</span>
          <strong>
            {/* format the deposit amount */}
            {accountInfo.accountCurrency &&
              new Intl.NumberFormat("ro-RO", {
                style: "currency",
                currency: accountInfo.accountCurrency,
              }).format(accountInfo.accountDeposit)}
          </strong>
        </div>
        <div className="transactions-history col-6 py-2">
          <Link to={`/transactions/${accountInfo._id}`}>
            <img src={transactionsHistory} alt="2 files" /> Istoric tranzactii
          </Link>
        </div>
      </div>
      <div className="account-actions">
        <div className="row g-0">
          <DepositMoney accountId={props.accountId} />
          <WithdrawMoney accountId={props.accountId} />
          <TransferMoney
            accountId={props.accountId}
            accountIBAN={accountInfo.accountIBAN}
            accounts={props.accounts}
          />
        </div>
      </div>
    </div>
  );
};

export default UserAccount;
