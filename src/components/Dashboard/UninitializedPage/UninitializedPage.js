import React from "react";
// css
import "./UninitializedPage.css";

const UninitializedPage = (props) => {
  return (
    <React.Fragment>
      <p className="text-center">
        Se pare ca e pentru prima oara cand foloseti acest cont
      </p>
      <p className="text-center">Haideti sa facem setarile initiale:</p>
    </React.Fragment>
  );
};

export default UninitializedPage;
