import React from "react";
import Presentaion from "../../components/Landing/Presenation/Presentation";
import Showcase from "../../components/Landing/Showcase/Showcase";
import Steps from "../../components/Landing/Steps/Steps";
import "./Landing.css";

const Landing = () => {
  return (
    <React.Fragment>
      <Showcase></Showcase>
      <Steps />
      <Presentaion />
    </React.Fragment>
  );
};

export default Landing;
