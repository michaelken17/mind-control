export const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.7,
      staggerChildren: 0.2,
    },
  },
};

export const item = {
  hidden: { y: "100%" },
  show: { y: "0%"},
};
