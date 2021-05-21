import React, { useContext } from "react";
import { Link } from "react-router-dom";
// context
import AuthenticationContext from "../../../context/AuthContext";
// css
import "./Header.css";

const Header = () => {
  const authContext = useContext(AuthenticationContext);
  return (
    <nav className="nav justify-content-center p-2 ">
      <Link to="/" className="nav-link">
        Acasa
      </Link>

      {/* if user is logged in */}
      {authContext.token && (
        <React.Fragment>
          <Link to="/dashboard" className="nav-link">
            Panou
          </Link>
          <Link to="/" className="nav-link" onClick={authContext.logOut}>
            LogOut
          </Link>
        </React.Fragment>
      )}

      {/* if user is NOT logged in */}
      {!authContext.token && (
        <Link to="/authentication" className="nav-link">
          Autentificare
        </Link>
      )}
    </nav>
  );
};

export default Header;
