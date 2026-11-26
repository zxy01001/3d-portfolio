export const rootExit = {
  initial: {
    opacity: 1,
  },
  exit: {
    opacity: 1,
    transition: {
      duration: 0.86,
    },
  },
};

export const shutterTopExit = {
  initial: {
    y: "0%",
  },
  exit: {
    y: "-102%",
    transition: {
      duration: 0.8,
      ease: [0.83, 0, 0.17, 1] as const,
      delay: 0.06,
    },
  },
};

export const shutterBottomExit = {
  initial: {
    y: "0%",
  },
  exit: {
    y: "102%",
    transition: {
      duration: 0.8,
      ease: [0.83, 0, 0.17, 1] as const,
      delay: 0.06,
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
    scale: 0.95,
    transition: {
      duration: 0.32,
      ease: [0.33, 1, 0.68, 1] as const,
    },
  },
};
