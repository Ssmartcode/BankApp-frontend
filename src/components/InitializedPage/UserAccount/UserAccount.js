import React, { useEffect, useState, useContext } from "react";
// components
import Spinner from "../../shared/Spinner/Spinner";
import currencyMap from "./currencyMap";
import DepositMoney from "../DepositMoney/DepositMoney";
import DeleteAccount from "../DeleteAccount/DeleteAccount";
// hooks
import useFetch from "use-http";
// context
import AuthContext from "../../../context/AuthContext";
// css
import "./UserAccount.css";
import WithdrawMoney from "../WithdrawMoney/WithdrawMoney";

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
      <div className="account-content">
        <div className="deposit">
          Sold:{"\t"}
          {accountInfo.accountDeposit}
          {"\t"}
          <strong>{currencyMap[accountInfo.accountCurrency]}</strong>
        </div>
      </div>
      <div className="account-actions">
        <div className="row g-0">
          <DepositMoney accountId={props.accountId} />
          <WithdrawMoney accountId={props.accountId} />
          <DeleteAccount accountId={props.accountId} />
        </div>
      </div>
    </div>
  );
};

export default UserAccount;
