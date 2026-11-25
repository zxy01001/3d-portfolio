"use client";
import {
  useState,
  useEffect,
  createContext,
  ReactNode,
  useContext,
  useRef,
  useCallback,
} from "react";
import { AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";

import Loader from "./loader";
import gsap from "gsap";
import { usePerfProfile } from "@/hooks/use-perf-profile";

type PreloaderContextType = {
  isLoading: boolean;
  loadingPercent: number;
  bypassLoading: () => void;
  forceDismiss: () => void;
};

const INITIAL: PreloaderContextType = {
  isLoading: true,
  loadingPercent: 0,
  bypassLoading: () => {},
  forceDismiss: () => {},
};

export const preloaderContext = createContext<PreloaderContextType>(INITIAL);

type PreloaderProps = {
  children: ReactNode;
  disabled?: boolean;
};

export const usePreloader = () => {
  const context = useContext(preloaderContext);
  if (!context) {
    throw new Error("usePreloader must be used within a PreloaderProvider");
  }
  return context;
};

const MIN_SHOWCASE_MS = 900;
const HARD_FAILSAFE_MS = 3600;

function Preloader({ children, disabled = false }: PreloaderProps) {
  const pathname = usePathname();
  // Show the signature 3D blueprint preloader only on the homepage ("/").
  // Deep links to /projects/[slug], /blogs, or /resume open instantaneously!
  const skip = disabled || Boolean(pathname && pathname !== "/");

  const [isLoading, setIsLoading] = useState(!skip);
  const [loadingPercent, setLoadingPercent] = useState(skip ? 100 : 8);
  const loadingTween = useRef<gsap.core.Tween | null>(null);
  const finishingRef = useRef(false);
  const mountedAtRef = useRef<number>(Date.now());
  const loadingPercentRef = useRef<{ value: number }>({ value: skip ? 100 : 8 });

  const { disable3D, ready: perfReady } = usePerfProfile();

  const forceDismiss = useCallback(() => {
    finishingRef.current = true;
    loadingTween.current?.kill();
    loadingPercentRef.current.value = 100;
    setLoadingPercent(100);
    setIsLoading(false);
  }, []);

  /**
   * Hybrid Awwwards finish: when the 3D scene reports ready (or fallback triggers),
   * smoothly glide the counter from its current value to 100% before lifting the curtain.
   */
  const bypassLoading = useCallback(() => {
    if (finishingRef.current) return;
    finishingRef.current = true;
    loadingTween.current?.kill();

    const elapsed = Date.now() - mountedAtRef.current;
    const remainingMinSec = Math.max(0.32, (MIN_SHOWCASE_MS - elapsed) / 1000);

    loadingTween.current = gsap.to(loadingPercentRef.current, {
      value: 100,
      duration: Math.min(0.65, remainingMinSec),
      ease: "power2.out",
      onUpdate: () => {
        setLoadingPercent(loadingPercentRef.current.value);
      },
      onComplete: () => {
        setLoadingPercent(100);
        setIsLoading(false);
      },
    });
  }, []);

  useEffect(() => {
    if (skip) {
      setIsLoading(false);
      setLoadingPercent(100);
      return;
    }
    if (perfReady && disable3D) {
      bypassLoading();
    }
  }, [skip, perfReady, disable3D, bypassLoading]);

  useEffect(() => {
    if (skip) return;
    mountedAtRef.current = Date.now();
    finishingRef.current = false;
    loadingPercentRef.current.value = 8;

    // Hybrid approach: glide organically from 8% -> 88% while real WebGL & GLB assets load,
    // then glide 88% -> 100% as soon as `bypassLoading()` fires (or failsafe triggers).
    loadingTween.current = gsap.to(loadingPercentRef.current, {
      value: 88,
      duration: 2.2,
      ease: "power1.out",
      onUpdate: () => {
        setLoadingPercent(loadingPercentRef.current.value);
      },
    });

    const failsafeTimer = window.setTimeout(() => {
      bypassLoading();
    }, HARD_FAILSAFE_MS);

    return () => {
      window.clearTimeout(failsafeTimer);
      loadingTween.current?.kill();
    };
  }, [skip, bypassLoading]);

  return (
    <preloaderContext.Provider
      value={{ isLoading, bypassLoading, forceDismiss, loadingPercent }}
    >
      <AnimatePresence mode="wait">{isLoading && <Loader />}</AnimatePresence>
      {children}
    </preloaderContext.Provider>
  );
}

export default Preloader;
