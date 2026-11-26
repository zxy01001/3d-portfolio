import { flushSync } from "react-dom";

type ViewTransitionDoc = Document & {
  startViewTransition?: (
    updateCallback: () => Promise<void> | void
  ) => {
    ready: Promise<void>;
    finished: Promise<void>;
  };
};

let inFlight = false;

/**
 * Silky-smooth 120fps Circular Ripple Theme Transition:
 * 1. Holds `data-vt-active="true"` across the ENTIRE animation (avoiding next-themes'
 *    1ms mid-animation `<style>` removal reflow that previously caused Frame-1 stutter).
 * 2. Waits 1 rAF inside `startViewTransition` so the 3D WebGL keyboard draws its updated
 *    Porcelain/Obsidian materials into `::view-transition-new(root)` before the wave starts.
 * 3. Expands a GPU-composited `clip-path: circle(...)` from the exact click origin.
 */
export async function runCircularThemeTransition(
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

  if (!doc.startViewTransition || prefersReducedMotion || inFlight) {
    setTheme(nextTheme);
    return;
  }

  inFlight = true;
  const x = origin?.x ?? window.innerWidth / 2;
  const y = origin?.y ?? window.innerHeight / 2;
  const maxRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  );

  root.dataset.vtActive = "true";

  try {
    const transition = doc.startViewTransition(async () => {
      flushSync(() => {
        setTheme(nextTheme);
      });
      // Wait 1 rAF (~8ms at 120Hz) so @react-three/fiber paints the updated 3D keyboard
      // uniforms before the browser snapshots `::view-transition-new(root)`.
      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => resolve());
      });
    });

    await transition.ready;

    const anim = root.animate(
      {
        clipPath: [
          `circle(0px at ${x.toFixed(1)}px ${y.toFixed(1)}px)`,
          `circle(${Math.ceil(maxRadius)}px at ${x.toFixed(1)}px ${y.toFixed(1)}px)`,
        ],
      },
      {
        duration: 520,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        pseudoElement: "::view-transition-new(root)",
      }
    );

    await Promise.allSettled([anim.finished, transition.finished]);
  } catch {
    setTheme(nextTheme);
  } finally {
    delete root.dataset.vtActive;
    inFlight = false;
  }
}
