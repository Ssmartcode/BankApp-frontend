import React, { useContext, useState } from "react";
import reactDom from "react-dom";
import useFetch from "use-http";
import InitializedPage from "../../components/Dashboard/InitializedPage/InitializedPage";
import UninitializedPage from "../../components/Dashboard/UninitializedPage/UninitializedPage";
// context
import AuthContext from "../../context/AuthContext";
// css
import "./Dashboard.css";
const Dashboard = () => {
  const { post, error, loading } = useFetch(process.env.REACT_APP_BACKEND);
  const authContext = useContext(AuthContext);
  const [isInitialized, setIsInitialized] = useState(
    authContext.userData.isInitialized
  );

  const handleFormSubmit = async () => {
    const HttpResponse = await post();
    setIsInitialized(true);
  };

  // user data from context
  const { userName } = authContext.userData;
  return (
    <div className="container">
      <h1 className="text-center mt-5">
        Buna, <strong>{userName}</strong>
      </h1>

      {/* Not initialized user */}
      {!isInitialized && (
        <UninitializedPage handleFormSubmit={handleFormSubmit} />
      )}

      {/* Initialized user */}
      {isInitialized && <InitializedPage />}
    </div>
  );
};

export default Dashboard;
