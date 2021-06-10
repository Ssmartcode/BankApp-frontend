import React from "react";
import DataReports from "./DataReports/DataReports";
import DepositWithdraw from "./DepositWithdraw/DepositWithdraw";
import Transfer from "./Transfer/Transfer";

import "./Presentation.css";

const Presentaion = (props) => {
  return (
    <section id="presentation" className="py-5">
      <div className="container">
        <DataReports />
        <DepositWithdraw />
        <Transfer />
      </div>
    </section>
  );
};

export default Presentaion;
