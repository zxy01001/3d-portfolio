import { flushSync } from "react-dom";

type ViewTransitionHandle = {
  ready: Promise<void>;
  finished: Promise<void>;
  skipTransition?: () => void;
};

type ViewTransitionDoc = Document & {
  startViewTransition?: (updateCallback: () => void) => ViewTransitionHandle;
};

let activeTransition: ViewTransitionHandle | null = null;

/**
 * Non-blocking 120fps Circular Ripple Theme Transition:
 * - Callback inside `startViewTransition` MUST be 100% synchronous (Chromium pauses
 *   `requestAnimationFrame` while capturing snapshots, so awaiting rAF inside it deadlocks!).
 * - Holds `data-vt-active="true"` across the full clip-path animation so CSS transitions
 *   never trigger mid-frame style recalculations.
 */
export function runCircularThemeTransition(
  nextTheme: "light" | "dark",
  setTheme: (theme: string) => void,
  origin?: { x: number; y: number }
) {
  if (typeof document === "undefined") {
    setTheme(nextTheme);
    return;
  }

  const root = document.documentElement;
  const doc = document as ViewTransitionDoc;
  const prefersReducedMotion =
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ||
    root.dataset.motion === "off";

  if (!doc.startViewTransition || prefersReducedMotion) {
    setTheme(nextTheme);
    return;
  }

  // If user clicks rapidly while a previous ripple is still expanding, skip the old one cleanly
  if (activeTransition?.skipTransition) {
    try {
      activeTransition.skipTransition();
    } catch {
      // ignore
    }
  }

  const x = origin?.x ?? window.innerWidth / 2;
  const y = origin?.y ?? window.innerHeight / 2;
  const maxRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  );

  root.dataset.vtActive = "true";

  let transition: ViewTransitionHandle;
  try {
    // STRICTLY SYNCHRONOUS callback — zero deadlocks!
    transition = doc.startViewTransition(() => {
      flushSync(() => {
        setTheme(nextTheme);
      });
    });
    activeTransition = transition;
  } catch {
    delete root.dataset.vtActive;
    setTheme(nextTheme);
    return;
  }

  transition.ready
    .then(() => {
      root.animate(
        {
          clipPath: [
            `circle(0px at ${x.toFixed(1)}px ${y.toFixed(1)}px)`,
            `circle(${Math.ceil(maxRadius)}px at ${x.toFixed(1)}px ${y.toFixed(1)}px)`,
          ],
        },
        {
          duration: 480,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    })
    .catch(() => {
      // Transition skipped or superseded
    });

  transition.finished
    .catch(() => {
      // Ignore abort errors
    })
    .finally(() => {
      if (activeTransition === transition) {
        activeTransition = null;
        delete root.dataset.vtActive;
      }
    });
}
