import React, { useState, useCallback } from "react";
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

const App = () => {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState({});

  // authentication context login and logout logic
  const logIn = useCallback((token, userData) => {
    setToken(token);
    setUserData(userData);
  }, []);
  const logOut = useCallback(() => {
    setToken(null);
    setUserData({});
  }, []);

  return (
    <React.Fragment>
      <Router>
        <AuthContext.Provider value={{ token, userData, logIn, logOut }}>
          <Header />
          <Switch>
            <Route path="/" exact>
              <h1>Hello world</h1>
            </Route>
            <Route path="/authentication">
              <Authentication />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
          </Switch>
        </AuthContext.Provider>
      </Router>
    </React.Fragment>
  );
};

export default App;
