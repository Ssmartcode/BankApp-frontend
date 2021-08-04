import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
// context
import AuthenticationContext from "../../../context/AuthContext";
// css
import "./Header.css";
// iconst
import logIn from "./icons/log-in.png";
import logOut from "./icons/logout.png";
import panel from "./icons/panel.png";
import landingPage from "./icons/landing-page.png";

const Header = () => {
  const history = useHistory();
  const authContext = useContext(AuthenticationContext);
  return (
    <nav className="nav justify-content-center">
      <Link to="/">
        <div className="nav-item">
          <div className="link-icon">
            <img src={landingPage} alt="" />
          </div>
          <div className="nav-path">Home</div>
        </div>
      </Link>

      {/* if user is logged in */}
      {authContext.token && (
        <React.Fragment>
          <Link to="/dashboard">
            <div className="nav-item">
              <div className="link-icon">
                <img src={panel} alt="" />
              </div>
              <div className="nav-path">Panel</div>
            </div>
          </Link>
          <div
            className="nav-item"
            onClick={() => {
              history.push("/");
              authContext.logOut();
            }}
          >
            <div className="link-icon">
              <img src={logOut} alt="" />
            </div>
            <div className="nav-path">LogOut</div>
          </div>
        </React.Fragment>
      )}

      {/* if user is NOT logged in */}
      {!authContext.token && (
        <Link to="/authentication">
          <div className="nav-item">
            <div className="link-icon">
              <img src={logIn} alt="" />
            </div>
            <div className="nav-path">LogIn</div>
          </div>
        </Link>
      )}
    </nav>
  );
};

export default Header;
