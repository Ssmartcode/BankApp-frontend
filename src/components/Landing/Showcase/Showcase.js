import React, { useContext } from "react";
import "./Showcase.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AuthContext from "../../../context/AuthContext";

const Showcase = () => {
  const authContext = useContext(AuthContext);
  return (
    <div className="showcase d-flex flex-column justify-content-center align-items-center">
      <motion.h1
        initial={{ x: "-250%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.3 }}
        className="header text-light"
      >
        Aplicatie Bancara - RZV Bank
      </motion.h1>
      <p></p>
      {!authContext.token && (
        <Link to="/authentication">
          <button className="btn-showcase">Vreau un cont!</button>
        </Link>
      )}
      {authContext.token && (
        <Link to="/dashboard">
          <button className="btn-showcase">Catre contul meu!</button>
        </Link>
      )}
    </div>
  );
};

export default Showcase;
