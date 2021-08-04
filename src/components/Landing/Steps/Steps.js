import React, { useRef, useEffect, useState } from "react";
import Card from "../../shared/Card/Card";
import "./Steps.css";
import { motion } from "framer-motion";
import step1 from "./steps-images/step1.png";
import step2 from "./steps-images/step2.png";
import step3 from "./steps-images/step3.png";

const Steps = () => {
  const [sectionHeight, setSectionHeight] = useState();
  useEffect(() => {
    setSectionHeight(stepsSectionRef.current.getBoundingClientRect().height);
  }, []);
  const stepsSectionRef = useRef();
  return (
    <motion.section
      ref={stepsSectionRef}
      id="steps"
      transition={{ duration: 0.5 }}
      animate={{ translateY: "-50%" }}
      style={{ marginBottom: -(sectionHeight / 2) }} //remove white space created after using translate on this section
    >
      <div className="container d-flex cards">
        <Card img={step1} cardTitle="1. Create an account"></Card>
        <Card img={step2} cardTitle="2. Initial set up"></Card>
        <Card img={step3} cardTitle="3. Now you can use your account"></Card>
      </div>
    </motion.section>
  );
};

export default Steps;
