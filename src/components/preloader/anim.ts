export const slideUp = {
  initial: {
    y: "0%",
  },
  exit: {
    y: "-104%",
    transition: {
      duration: 0.82,
      ease: [0.76, 0, 0.24, 1] as const,
      delay: 0.08,
    },
  },
};

export const contentExit = {
  initial: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: -18,
    transition: {
      duration: 0.42,
      ease: [0.33, 1, 0.68, 1] as const,
    },
  },
};
