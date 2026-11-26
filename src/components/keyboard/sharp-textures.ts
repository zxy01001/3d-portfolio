import type { ChibiSceneApi } from "@chibi3d/runtime";
import type { KeyboardScene } from "./scene";

const waitMs = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

/**
 * Deferred Post-Reveal CJK Description Crisp Pass:
 * - Note: All 23 `keys-v4/*.svg` keycap icons ALREADY have native `1024x1024` / `1440x600`
 *   dimensions and are loaded once by Chibi's built-in asset pipeline during `onLoad`.
 *   Re-uploading them via `setMaterial({ map })` caused 200MB of duplicate GPU texture churn!
 * - Only the 24 floating CJK skill descriptions (which are invisible until scrolling to `#skills`)
 *   are gently upgraded in the background AFTER the preloader shutters have completely finished,
 *   dripping 1 lightweight plane every 60ms so frame time stays < 1ms.
 */
export async function applySharpKeyboardTextures(
  api: ChibiSceneApi,
  scene: KeyboardScene,
  isCancelled: () => boolean,
  registerUrl?: (url: string) => void
) {
  if (typeof document === "undefined") return;

  for (let i = 0; i < scene.descriptions.length; i++) {
    if (isCancelled()) return;
    const desc = scene.descriptions[i];
    const url = await renderCrispDescriptionUrl(desc.text);
    if (url) {
      if (isCancelled()) {
        URL.revokeObjectURL(url);
        return;
      }
      registerUrl?.(url);
      api.setMaterial(desc.materialId, { map: url });
    }
    // Space out GPU texture uploads so scrolling & animations stay 120fps
    await waitMs(55);
  }
}

function renderCrispDescriptionUrl(text: string): Promise<string | null> {
  const canvas = document.createElement("canvas");
  const W = 1280;
  const H = 310;
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return Promise.resolve(null);

  ctx.clearRect(0, 0, W, H);
  ctx.textBaseline = "top";

  const lines = wrapCjkLines(text, 24);
  const fontSize = Math.min(52, Math.floor(228 / Math.max(lines.length, 1)));
  ctx.font = `600 ${fontSize}px 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif`;
  ctx.fillStyle = "#ffffff";

  let curY = 22;
  for (const line of lines.slice(0, 3)) {
    ctx.fillText(line, 4, curY);
    curY += Math.round(fontSize * 1.34);
  }

  return new Promise((resolve) => {
    if (typeof canvas.toBlob === "function") {
      canvas.toBlob((blob) => {
        resolve(blob ? URL.createObjectURL(blob) : null);
      }, "image/png");
    } else {
      resolve(canvas.toDataURL("image/png"));
    }
  });
}

function wrapCjkLines(text: string, maxUnits: number): string[] {
  const clean = text
    .replace(/\p{Extended_Pictographic}|[\uFE0F\u200D]/gu, "")
    .trim();
  const lines: string[] = [];
  let cur = "";
  let units = 0;
  for (const ch of clean) {
    const u = /[\u4e00-\u9fff\u3000-\u303f\uff00-\uffef]/.test(ch) ? 1 : 0.55;
    if (units + u > maxUnits && cur) {
      lines.push(cur.trim());
      cur = ch;
      units = u;
    } else {
      cur += ch;
      units += u;
    }
  }
  if (cur.trim()) lines.push(cur.trim());
  return lines;
}
