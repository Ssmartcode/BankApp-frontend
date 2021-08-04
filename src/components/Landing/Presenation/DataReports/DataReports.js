import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { v4 } from "uuid";
import textAnimations from "../animations/textAnimations";
import dataReportImg from "./data_report.svg";
import imageAnimation from "../animations/imageAnimation";

const dataReportsSentence =
  "You can check your transaction history at any given moment.";

const DataReportsText = () => {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });
  const animation = useAnimation();

  useEffect(() => {
    if (inView) {
      animation.start("visible");
    } else animation.start("hidden");
  });

  return (
    <div className="row mb-6">
      <div className="col-12 col-lg-6">
        <motion.img
          className="presentation-image"
          src={dataReportImg}
          alt=""
          ref={ref}
          initial="hidden"
          animate={animation}
          variants={imageAnimation}
        />
      </div>
      <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center">
        <motion.h2
          ref={ref}
          variants={textAnimations.headerAnimation}
          initial="hidden"
          animate={animation}
        >
          {dataReportsSentence.split("").map((char) => {
            return (
              <motion.span key={v4()} variants={textAnimations.wordAnimation}>
                {char}
              </motion.span>
            );
          })}
        </motion.h2>
      </div>
    </div>
  );
};

export default DataReportsText;
