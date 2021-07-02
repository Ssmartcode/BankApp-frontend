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
import Footer from "./components/shared/Footer/Footer";

let tokenTimeout;
const App = () => {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState({});
  const [tokenExpire, setTokenExpire] = useState();

  // authentication context login and logout logic
  const logIn = useCallback((token, userData, tokenExpire) => {
    const expirationDate =
      tokenExpire || new Date(new Date().getTime() + 1000 * 60 * 30);
    setTokenExpire(expirationDate);
    setToken(token);
    setUserData(userData);
    if (userData) {
      localStorage.setItem("token", token);
      localStorage.setItem("tokenExpire", expirationDate.toISOString());
      localStorage.setItem("userData", JSON.stringify(userData));
    }
  }, []);

  const logOut = useCallback(() => {
    setToken(null);
    setUserData({});
    setTokenExpire(null);
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpire");
    localStorage.removeItem("userData");
  }, []);

  // get token and user data from local storage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const tokenExpire = localStorage.getItem("tokenExpire");
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (token && userData && new Date(tokenExpire) > new Date())
      logIn(token, userData, new Date(tokenExpire));
  }, [logIn]);

  // logout when time expires
  useEffect(() => {
    if (token && tokenExpire) {
      const timeRemaining = tokenExpire.getTime() - new Date().getTime();
      tokenTimeout = setTimeout(logOut, timeRemaining);
    } else clearTimeout(tokenTimeout);
  }, [token, tokenExpire, logOut]);

  return (
    <React.Fragment>
      <Router>
        <AuthContext.Provider value={{ token, userData, logIn, logOut }}>
          <Header />
          <Switch>
            <Route path="/" exact>
              <Landing />
              <Footer />
            </Route>
            <Route path="/authentication">
              <Authentication />
              {/* <Footer /> */}
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
