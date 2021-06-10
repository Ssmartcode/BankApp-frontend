import React, { useEffect } from "react";
// import useInView from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import textAnimations from "../animations/textAnimations";
import { v4 } from "uuid";
import imageAnimation from "../animations/imageAnimation";
import transferImg from "./transferImg.svg";

const TransferText = () => {
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });
  const animation = useAnimation();

  const transferSentence =
    "  Transfera Banii rapid si simplu in orice cont, fara comision si timpi mari de asteptare.";

  useEffect(() => {
    if (inView) {
      animation.start("visible");
    }
  }, [inView, animation]);

  return (
    <div className="row">
      <div className="col-12 col-lg-6">
        <motion.img
          className="presentation-image"
          src={transferImg}
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
          {transferSentence.split("").map((char) => {
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

export default TransferText;
