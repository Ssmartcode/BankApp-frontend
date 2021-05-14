import React, { useContext } from "react";
import { Link } from "react-router-dom";
// context
import AuthenticationContext from "../../../context/AuthContext";
// css
import "./Header.css";

const Header = () => {
  const authContext = useContext(AuthenticationContext);
  return (
    <nav class="nav justify-content-center bg-secondary p-4 ">
      <Link to="/" className="nav-link">
        Acasa
      </Link>

      {/* if user is logged in */}
      {authContext.token && (
        <Link to="/dashboard" className="nav-link">
          Panou
        </Link>
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
