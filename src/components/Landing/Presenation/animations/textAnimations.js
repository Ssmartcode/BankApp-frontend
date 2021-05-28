const textAnimations = {
  headerAnimation: {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.1,
        staggerChildren: 0.05,
      },
    },
  },
  wordAnimation: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
};

export default textAnimations;
