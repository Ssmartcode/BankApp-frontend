import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import textAnimations from "../animations/textAnimations";
import { v4 } from "uuid";
import imageAnimation from "../animations/imageAnimation";
import walletImg from "./wallet.svg";

const depositSentence =
  " Charge your account and withdraw without any fee. You have 3 currencies: EUR, USD and RON and 2 packages for your accounts: Business and Standard.";
const DepositWithdrawText = () => {
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
      <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center">
        <motion.h2
          ref={ref}
          variants={textAnimations.headerAnimation}
          initial="hidden"
          animate={animation}
        >
          {depositSentence.split("").map((char) => {
            return (
              <motion.span key={v4()} variants={textAnimations.wordAnimation}>
                {char}
              </motion.span>
            );
          })}
        </motion.h2>
      </div>
      <div className="col-12 col-lg-6">
        <motion.img
          className="presentation-image"
          src={walletImg}
          alt=""
          ref={ref}
          initial="hidden"
          animate={animation}
          variants={imageAnimation}
        />
      </div>
    </div>
  );
};

export default DepositWithdrawText;
