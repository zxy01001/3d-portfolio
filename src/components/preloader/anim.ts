export const rootExit = {
  initial: {
    opacity: 1,
  },
  exit: {
    opacity: 1,
    pointerEvents: "none" as const,
    transition: {
      duration: 0.78,
    },
  },
};

export const shutterTopExit = {
  initial: {
    y: "0%",
  },
  exit: {
    y: "-101%",
    transition: {
      duration: 0.74,
      ease: [0.76, 0, 0.24, 1] as const,
      delay: 0.04,
    },
  },
};

export const shutterBottomExit = {
  initial: {
    y: "0%",
  },
  exit: {
    y: "101%",
    transition: {
      duration: 0.74,
      ease: [0.76, 0, 0.24, 1] as const,
      delay: 0.04,
    },
  },
};

export const hudContentExit = {
  initial: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    transition: {
      duration: 0.26,
      ease: [0.33, 1, 0.68, 1] as const,
    },
  },
};
