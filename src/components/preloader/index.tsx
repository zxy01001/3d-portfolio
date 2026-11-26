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

// Crisp ~1.45s minimum cinematic showcase so fast GPUs still display the 3D holographic
// ring-lock & dual-shutter blast reveal, with an instant SKIP button always available.
const MIN_SHOWCASE_MS = 1450;
const HARD_FAILSAFE_MS = 3800;

function Preloader({ children, disabled = false }: PreloaderProps) {
  const pathname = usePathname();
  const skip = disabled || Boolean(pathname && pathname !== "/");

  const [isLoading, setIsLoading] = useState(!skip);
  const [loadingPercent, setLoadingPercent] = useState(skip ? 100 : 6);
  const loadingTween = useRef<gsap.core.Tween | null>(null);
  const finishingRef = useRef(false);
  const mountedAtRef = useRef<number>(Date.now());
  const loadingPercentRef = useRef<{ value: number }>({ value: skip ? 100 : 6 });

  const { disable3D, ready: perfReady } = usePerfProfile();

  const forceDismiss = useCallback(() => {
    finishingRef.current = true;
    loadingTween.current?.kill();
    loadingPercentRef.current.value = 100;
    setLoadingPercent(100);
    setIsLoading(false);
  }, []);

  const bypassLoading = useCallback(() => {
    if (finishingRef.current) return;
    finishingRef.current = true;
    loadingTween.current?.kill();

    const elapsed = Date.now() - mountedAtRef.current;
    const remainingMinSec = Math.max(0.42, (MIN_SHOWCASE_MS - elapsed) / 1000);

    loadingTween.current = gsap.to(loadingPercentRef.current, {
      value: 100,
      duration: Math.min(1.15, remainingMinSec),
      ease: "power2.inOut",
      onUpdate: () => {
        setLoadingPercent(loadingPercentRef.current.value);
      },
      onComplete: () => {
        setLoadingPercent(100);
        // Brief 90ms lock at 100% so the user sees PORTAL LOCKED before the blast doors split!
        window.setTimeout(() => {
          setIsLoading(false);
        }, 90);
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
    loadingPercentRef.current.value = 6;

    loadingTween.current = gsap.to(loadingPercentRef.current, {
      value: 88,
      duration: 2.3,
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
