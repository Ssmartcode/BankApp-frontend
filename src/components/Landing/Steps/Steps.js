import React from "react";
import Card from "../../shared/Card/Card";
import "./Steps.css";
import { motion } from "framer-motion";
import step1 from "./steps-images/step1.png";
import step2 from "./steps-images/step2.png";
import step3 from "./steps-images/step3.png";

const Steps = () => {
  return (
    <section id="steps">
      <motion.div
        transition={{ duration: 0.5 }}
        animate={{ translateY: "-50%" }}
        className="container d-flex justify-content-center"
      >
        <Card img={step1} cardTitle="1. Creeaza un cont"></Card>
        <Card img={step2} cardTitle="2. Completeaza setarile initiale"></Card>
        <Card img={step3} cardTitle="3. Acum ai acces la conturile tale"></Card>
      </motion.div>
    </section>
  );
};

export default Steps;
