import React, { useState, useCallback, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// pages
import Authentication from "./pages/Authentication/Authentication";
import Dashboard from "./pages/Dashboard/Dashboard";
// components
import Header from "./components/shared/Header/Header";
// context
import AuthContext from "./context/AuthContext";
//css
import "./App.css";
import Landing from "./pages/Landing/Landing";
import TransactionsHistory from "./pages/TransactionsHistory/TransactionsHistory";

const App = () => {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState({});

  // authentication context login and logout logic
  const logIn = useCallback((token, userData) => {
    setToken(token);
    setUserData(userData);
    localStorage.setItem("token", token);
    localStorage.setItem("userData", JSON.stringify(userData));
  }, []);

  const logOut = useCallback(() => {
    setToken(null);
    setUserData({});
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
  }, []);

  // get token and user data from local storage
  useEffect(() => {
    let token;
    let userData;
    try {
      token = localStorage.getItem("token");
      userData = JSON.parse(localStorage.getItem("userData"));
    } catch (err) {}
    if (token && userData) logIn(token, userData);
  }, [logIn]);

  return (
    <React.Fragment>
      <Router>
        <AuthContext.Provider value={{ token, userData, logIn, logOut }}>
          <Header />
          <Switch>
            <Route path="/" exact>
              <Landing />
            </Route>
            <Route path="/authentication">
              <Authentication />
            </Route>
          </Switch>
          {/* if token is available render these components */}
          {token && (
            <Switch>
              <Route path="/dashboard">
                <Dashboard />
              </Route>
              <Route path="/transactions/:accountId">
                <TransactionsHistory />
              </Route>
            </Switch>
          )}
        </AuthContext.Provider>
      </Router>
    </React.Fragment>
  );
};

export default App;
