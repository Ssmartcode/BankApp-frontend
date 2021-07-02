import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="copy">&copy; Razvan International Bank</div>
        <div className="info">
          <div className="row">
            <div className="col-12 col-lg-4">
              <h5>Contact us</h5>
              <div className="contact-info">
                <div className="contact-item mb-2">
                  <i className="fas fa-phone"></i> 0754234232324
                </div>
                <div className="contact-item mb-2">
                  <i className="fas fa-envelope"></i> support@rzvbank.com
                </div>
                <div className="contact-item">
                  <i className="fas fa-map-marker-alt"></i> Bd.Avram Iancu,
                  Bacau
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <h5>Start using our app</h5>
              <div className="links">
                <div className="link-item mb-2">
                  <Link to="/authentication">Creaza un cont nou</Link>
                </div>
                <div className="link-item">
                  <Link to="/dashboard ">Panou de control</Link>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <h5>More about us</h5>
              <div className="link-item mb-2">
                <a href="#">Our history</a>
              </div>
              <div className="link-item mb-2">
                <a href="#">Our team</a>
              </div>
              <div className="link-item mb-2">
                <a href="#">Our clients</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
