import React, { useContext, useState, useEffect } from "react";
import InitializedPage from "../InitializedPage/InitializedPage";
import UninitializedPage from "../UninitializedPage/UninitializedPage";
// context
import AuthContext from "../../context/AuthContext";
// css
import "./Dashboard.css";
const Dashboard = () => {
  const authContext = useContext(AuthContext);
  const [isInitialized, setIsInitialized] = useState(
    authContext.userData.isInitialized
  );

  useEffect(() => {
    setIsInitialized(authContext.userData.isInitialized);
  }, [authContext.userData.isInitialized]);

  // user data from context
  return (
    <div className="container text-center py-4">
      {/* Not initialized user */}
      {!isInitialized && <UninitializedPage />}

      {/* Initialized user */}
      {isInitialized && <InitializedPage />}
    </div>
  );
};

export default Dashboard;
