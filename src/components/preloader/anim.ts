export const rootExit = {
  initial: {
    opacity: 1,
  },
  exit: {
    opacity: 1,
    transition: {
      duration: 0.88,
    },
  },
};

export const shutterTopExit = {
  initial: {
    y: "0%",
  },
  exit: {
    y: "-104%",
    transition: {
      duration: 0.82,
      ease: [0.83, 0, 0.17, 1] as const,
      delay: 0.08,
    },
  },
};

export const shutterBottomExit = {
  initial: {
    y: "0%",
  },
  exit: {
    y: "104%",
    transition: {
      duration: 0.82,
      ease: [0.83, 0, 0.17, 1] as const,
      delay: 0.08,
    },
  },
};

export const hudContentExit = {
  initial: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
  },
  exit: {
    opacity: 0,
    scale: 1.08,
    filter: "blur(8px)",
    transition: {
      duration: 0.38,
      ease: [0.33, 1, 0.68, 1] as const,
    },
  },
};
