"use client";

import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import {
  ChibiScene,
  type ChibiSceneApi,
  type ScenePointerEvent,
  type RuntimeEvent,
} from "@chibi3d/runtime";
import { useTheme } from "next-themes";
import { SKILLS } from "@/data/constants";
import { setSceneStatus } from "@/lib/scene-health";
import { usePreloader } from "../preloader";
import {
  createKeyboardScene,
  resolveKeyboardAsset,
  type KeyboardKey,
  type KeyboardSkill,
} from "./scene";
import { createKeyInput, isTypingTarget } from "./input";
import { createKeyboardMotion, type KeyboardSection } from "./motion";
import { useKeyboardSounds } from "./use-keyboard-sounds";
import { useAdaptiveGraphics } from "./use-adaptive-graphics";
import { useKeyboardCounts } from "./use-keyboard-counts";
import { keyWear } from "./wear";
import { createCounterMotion } from "./counter-motion";
import { applySharpKeyboardTextures } from "./sharp-textures";

const SceneCanvas = memo(ChibiScene);
const SCENE_STYLE: CSSProperties = {
  position: "fixed",
  inset: 0,
  width: "100vw",
  height: "100dvh",
};

export default function KeyboardScene({ maxDpr }: { maxDpr: number }) {
  const { isLoading, bypassLoading } = usePreloader();
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";
  const api = useRef<ChibiSceneApi>(null);
  const failed = useRef(false);
  const motion = useRef<ReturnType<typeof createKeyboardMotion> | null>(null);
  const counterMotion = useRef<ReturnType<typeof createCounterMotion> | null>(
    null
  );
  const [loadVersion, setLoadVersion] = useState(0);
  const ready = loadVersion > 0;
  const [section, setSection] = useState<KeyboardSection>("hero");
  const [selected, setSelected] = useState<KeyboardSkill | null>(null);
  const playSound = useKeyboardSounds();

  const scene = useMemo(
    () =>
      createKeyboardScene(
        Object.values(SKILLS).map((skill) => ({
          ...skill,
          icon: skill.keyboardIcon ?? skill.icon,
        }))
      ),
    []
  );

  const { settings: graphics, markActive } = useAdaptiveGraphics(
    ready && !isLoading
  );
  const { shadows, softShadows, ao, bloom, lighting } = graphics;
  const environment = useMemo(
    () => ({
      ...scene.document.environment,
      exposure: isLight ? 0.96 : 0.88,
      shadows,
      softShadows,
      ao,
      bloom,
      contactShadows: false,
      vignette: false,
      preset: lighting ? scene.document.environment.preset : null,
    }),
    [scene, isLight, shadows, softShadows, ao, bloom, lighting]
  );

  const targetDpr = Math.min(graphics.dpr, maxDpr);
  const dpr = useMemo<[number, number]>(
    () => [targetDpr, maxDpr],
    [maxDpr, targetDpr]
  );

  const visibleLabel = useRef<string | null>(null);
  const heldKeys = useRef<KeyboardKey[]>([]);
  const input = useMemo(
    () => createKeyInput(scene.keys, scene.columns),
    [scene]
  );
  const { counts, total, available, recordPress } = useKeyboardCounts();

  useEffect(() => {
    if (!ready || !api.current) return;
    let cancelled = false;
    const blobUrls: string[] = [];
    void applySharpKeyboardTextures(
      api.current,
      scene,
      () => cancelled,
      (u) => blobUrls.push(u)
    ).then(() => {
      if (cancelled) return;
      markActive();
      // Give WebGL 2 frames to upload textures & compile shaders behind the closed preloader,
      // then trigger smooth 100% completion & shutter reveal with zero GPU hitch!
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (!cancelled) bypassLoading();
        });
      });
    });
    return () => {
      cancelled = true;
      blobUrls.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [ready, loadVersion, scene, markActive, bypassLoading]);

  useEffect(() => {
    if (!ready || !api.current) return;
    const controller = createCounterMotion(
      api.current,
      scene.counter,
      markActive
    );
    counterMotion.current = controller;
    return () => {
      controller.dispose();
      counterMotion.current = null;
    };
  }, [ready, loadVersion, scene, markActive]);

  useEffect(() => {
    counterMotion.current?.update(total, available);
  }, [total, available, ready, loadVersion, scene]);

  useEffect(() => {
    if (!ready || !api.current) return;
    api.current.setMaterial(scene.textMaterialId, {
      color: isLight ? "#0f172a" : "#ffffff",
    });
    for (const desc of scene.descriptions) {
      api.current.setMaterial(desc.materialId, {
        color: isLight ? "#334155" : "#f1f5f9",
      });
    }
    markActive();
  }, [ready, loadVersion, scene, isLight, markActive]);

  useEffect(() => {
    if (!ready) return;
    for (const key of scene.keys) {
      api.current?.setMaterial(
        key.materialId,
        keyWear(counts[key.skill.name] ?? 0)
      );
    }
    markActive();
  }, [counts, ready, loadVersion, scene, markActive]);

  useEffect(
    () =>
      input.subscribe((key, pressed) => {
        markActive();
        api.current?.transitionNodeTo(
          key.nodeId,
          pressed ? key.pressedStateId : "base",
          { duration: 0.1, ease: "easeInOut" }
        );
        api.current?.setMaterial(key.materialId, {
          emissive: scene.document.materials[key.materialId].color,
          emissiveIntensity: pressed ? 0.7 : 0,
        });
        heldKeys.current = heldKeys.current.filter((held) => held !== key);
        if (pressed) {
          if (ready && !isLoading && !document.hidden) {
            recordPress(key.skill.name);
          }
          heldKeys.current.push(key);
        }
        const shown = heldKeys.current.at(-1) ?? null;
        const labelId = shown?.labelId ?? scene.defaultLabelId;
        if (labelId !== (visibleLabel.current ?? scene.defaultLabelId)) {
          api.current?.setNodeVisible(
            visibleLabel.current ?? scene.defaultLabelId,
            false
          );
          api.current?.setNodeVisible(labelId, true);
        }
        visibleLabel.current = shown?.labelId ?? null;
        setSelected(shown?.skill ?? null);
        playSound(pressed);
      }),
    [input, scene, playSound, markActive, ready, isLoading, recordPress]
  );

  const onPointerEvent = useCallback(
    (event: ScenePointerEvent) => {
      const pointer = `pointer:${event.pointerId}`;
      switch (event.type) {
        case "hoverEnter":
          if (event.pointerType === "mouse") input.press("hover", event.nodeId);
          break;
        case "hoverExit":
          input.release("hover", event.nodeId);
          break;
        case "pointerDown":
          input.press(pointer, event.nodeId);
          break;
        case "pointerUp":
        case "pointerCancel":
          input.release(pointer);
          break;
      }
    },
    [input]
  );

  const onLoad = useCallback(() => {
    if (failed.current) return;
    setLoadVersion((version) => version + 1);
    setSceneStatus("ready");
    // Note: bypassLoading() is now called right after time-sliced textures & 2 warm-up
    // WebGL frames complete, preventing shader/texture upload stutters during shutter split!
  }, []);

  const onError = useCallback(
    (error: Error) => {
      failed.current = true;
      console.warn("Keyboard scene unavailable", error);
      setSceneStatus("failed");
      bypassLoading();
    },
    [bypassLoading]
  );

  const onEvent = useCallback(
    (event: RuntimeEvent) => {
      if (event.type === "contextLost") {
        onError(new Error("WebGL context lost"));
      }
    },
    [onError]
  );

  useEffect(() => {
    if (!ready || !api.current) return;
    const controller = createKeyboardMotion(
      api.current,
      scene,
      (next) => {
        setSection(next);
        input.releaseAll();
        const hash = next === "hero" ? "" : `#${next}`;
        window.history.replaceState(
          window.history.state,
          "",
          window.location.pathname + window.location.search + hash
        );
      },
      markActive
    );
    motion.current = controller;
    return () => {
      controller.dispose();
      motion.current = null;
    };
  }, [ready, loadVersion, scene, input, markActive]);

  useEffect(() => {
    motion.current?.setCounterEnabled(available);
  }, [available, ready, loadVersion, scene, input, markActive]);

  useEffect(() => {
    if (!ready || isLoading) return;
    // Stagger 3D elastic key-drop by 90ms so Frame 0 of the CSS shutter split has 100% GPU priority
    const timer = window.setTimeout(() => {
      motion.current?.reveal();
    }, 90);
    return () => window.clearTimeout(timer);
  }, [ready, loadVersion, isLoading, scene, input]);

  useEffect(() => {
    if (!ready) return;
    const active = visibleLabel.current ?? scene.defaultLabelId;
    for (const id of [
      scene.defaultLabelId,
      ...scene.keys.map((key) => key.labelId),
    ]) {
      api.current?.setNodeVisible(id, id === active);
    }
  }, [ready, loadVersion, scene]);

  useEffect(() => {
    const down = (event: KeyboardEvent) => {
      if (
        event.defaultPrevented ||
        event.repeat ||
        event.ctrlKey ||
        event.metaKey ||
        event.altKey ||
        isTypingTarget(event.target)
      ) {
        return;
      }
      const key = input.shortcuts.get(event.code);
      if (key) input.press(`key:${event.code}`, key.nodeId);
    };
    const up = (event: KeyboardEvent) => input.release(`key:${event.code}`);
    const release = () => input.releaseAll();
    const visibility = () => {
      if (document.hidden) release();
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", release);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", release);
      document.removeEventListener("visibilitychange", visibility);
      release();
    };
  }, [input]);

  return (
    <>
      <SceneCanvas
        document={scene.document}
        environment={environment}
        resolveAsset={resolveKeyboardAsset}
        api={api}
        style={SCENE_STYLE}
        dpr={dpr}
        transparent
        orbit={false}
        orthographic
        pointerTargets={scene.pointerTargets}
        onPointerEvent={onPointerEvent}
        onLoad={onLoad}
        onError={onError}
        onEvent={onEvent}
      />
      {section === "skills" && ready && (
        <div className="pointer-events-none fixed inset-x-3 sm:inset-x-4 bottom-4 sm:bottom-7 z-20 flex justify-center text-center text-foreground">
          <div
            aria-live="polite"
            className="max-w-xl rounded-2xl border border-border/75 bg-background/95 px-4 py-2.5 sm:px-5 sm:py-3 shadow-lg"
          >
            <p className="text-xs sm:text-sm md:text-base font-bold text-foreground">
              {selected?.labelZh ?? selected?.label ?? "核心设计能力与工具体系"}
            </p>
            <p className="mt-0.5 sm:mt-1 text-[11px] sm:text-xs md:text-sm text-muted-foreground leading-relaxed">
              {selected?.shortDescription ??
                "支持悬停、点击 3D 键帽或按下键盘快捷键检视能力详情"}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
