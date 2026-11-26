"use client";
import {
  useState,
  useEffect,
  createContext,
  ReactNode,
  useContext,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";

import Loader from "./loader";
import gsap from "gsap";
import { usePerfProfile } from "@/hooks/use-perf-profile";

type ProgressListener = (pct: number) => void;

type PreloaderContextType = {
  isLoading: boolean;
  /** Static compatibility field; live frames flow via subscribeProgress with 0 React re-renders. */
  loadingPercent: number;
  subscribeProgress: (fn: ProgressListener) => () => void;
  bypassLoading: () => void;
  forceDismiss: () => void;
};

const INITIAL: PreloaderContextType = {
  isLoading: true,
  loadingPercent: 0,
  subscribeProgress: () => () => {},
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

const MIN_SHOWCASE_MS = 1350;
const HARD_FAILSAFE_MS = 3600;

function Preloader({ children, disabled = false }: PreloaderProps) {
  const pathname = usePathname();
  const skip = disabled || Boolean(pathname && pathname !== "/");

  const [isLoading, setIsLoading] = useState(!skip);
  const loadingTween = useRef<gsap.core.Tween | null>(null);
  const finishingRef = useRef(false);
  const mountedAtRef = useRef<number>(Date.now());
  const progressRef = useRef<{ value: number }>({ value: skip ? 100 : 6 });
  const listenersRef = useRef<Set<ProgressListener>>(new Set());

  const { disable3D, ready: perfReady } = usePerfProfile();

  const emitProgress = useCallback((val: number) => {
    listenersRef.current.forEach((fn) => fn(val));
  }, []);

  const subscribeProgress = useCallback((fn: ProgressListener) => {
    listenersRef.current.add(fn);
    fn(progressRef.current.value);
    return () => {
      listenersRef.current.delete(fn);
    };
  }, []);

  const forceDismiss = useCallback(() => {
    finishingRef.current = true;
    loadingTween.current?.kill();
    progressRef.current.value = 100;
    emitProgress(100);
    setIsLoading(false);
  }, [emitProgress]);

  const bypassLoading = useCallback(() => {
    if (finishingRef.current) return;
    finishingRef.current = true;
    loadingTween.current?.kill();

    const elapsed = Date.now() - mountedAtRef.current;
    const remainingMinSec = Math.max(0.42, (MIN_SHOWCASE_MS - elapsed) / 1000);

    loadingTween.current = gsap.to(progressRef.current, {
      value: 100,
      duration: Math.min(1.05, remainingMinSec),
      ease: "power2.inOut",
      onUpdate: () => {
        emitProgress(progressRef.current.value);
      },
      onComplete: () => {
        emitProgress(100);
        requestAnimationFrame(() => {
          setIsLoading(false);
        });
      },
    });
  }, [emitProgress]);

  useEffect(() => {
    if (skip) {
      setIsLoading(false);
      progressRef.current.value = 100;
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
    progressRef.current.value = 6;
    emitProgress(6);

    loadingTween.current = gsap.to(progressRef.current, {
      value: 88,
      duration: 2.2,
      ease: "power1.out",
      onUpdate: () => {
        emitProgress(progressRef.current.value);
      },
    });

    const failsafeTimer = window.setTimeout(() => {
      bypassLoading();
    }, HARD_FAILSAFE_MS);

    return () => {
      window.clearTimeout(failsafeTimer);
      loadingTween.current?.kill();
    };
  }, [skip, bypassLoading, emitProgress]);

  const ctxValue = useMemo<PreloaderContextType>(
    () => ({
      isLoading,
      loadingPercent: isLoading ? 0 : 100,
      subscribeProgress,
      bypassLoading,
      forceDismiss,
    }),
    [isLoading, subscribeProgress, bypassLoading, forceDismiss]
  );

  return (
    <preloaderContext.Provider value={ctxValue}>
      <AnimatePresence>{isLoading && <Loader />}</AnimatePresence>
      {children}
    </preloaderContext.Provider>
  );
}

export default Preloader;
