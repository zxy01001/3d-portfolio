import type { ChibiSceneApi } from "@chibi3d/runtime";
import type { KeyboardScene } from "./scene";

/**
 * `@chibi3d/runtime` loads static `doc.assets` via `THREE.TextureLoader` with `anisotropy = 1`
 * and downscales SVGs to 512px, which blurs oblique isometric planes.
 * Calling `api.setMaterial(id, { map: pngDataUrl })` routes through `loadOverrideTexture`,
 * keeping full 1024px–2400px PNG resolution (`k = 1`) and enabling `texture.anisotropy = 8`.
 */
export async function applySharpKeyboardTextures(
  api: ChibiSceneApi,
  scene: KeyboardScene,
  isCancelled: () => boolean
) {
  if (typeof document === "undefined") return;

  // 1. Upgrade 3D floating Chinese description planes (6.2 x 1.5 aspect) to 2480x600 PNGs (8x anisotropy)
  for (const desc of scene.descriptions) {
    if (isCancelled()) return;
    const pngUrl = renderCrispDescriptionPng(desc.text);
    if (pngUrl) {
      api.setMaterial(desc.materialId, { map: pngUrl });
    }
  }

  // 2. Upgrade 1x1, 2x1 wide, and 2x2 hero keycap SVGs to HiDPI PNGs (8x anisotropy)
  await Promise.all(
    scene.keys.map(async (key) => {
      if (!key.logoMaterialId || !key.skill.icon || isCancelled()) return;
      try {
        const isWide =
          (key.skill.colSpan ?? 1) === 2 && (key.skill.rowSpan ?? 1) === 1;
        const w = isWide ? 1440 : 1024;
        const h = isWide ? 600 : 1024;
        const pngUrl = await rasterizeSvgToPng(key.skill.icon, w, h);
        if (pngUrl && !isCancelled()) {
          api.setMaterial(key.logoMaterialId, { map: pngUrl });
        }
      } catch {
        // Keep static fallback map if an individual image fails
      }
    })
  );
}

function renderCrispDescriptionPng(text: string): string | null {
  const canvas = document.createElement("canvas");
  const W = 2480;
  const H = 600;
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.clearRect(0, 0, W, H);
  ctx.textBaseline = "top";

  ctx.shadowColor = "rgba(2, 6, 23, 0.65)";
  ctx.shadowBlur = 12;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 4;

  const lines = wrapCjkLines(text, 24);
  const fontSize = Math.min(98, Math.floor(440 / Math.max(lines.length, 1)));
  ctx.font = `600 ${fontSize}px 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif`;
  ctx.fillStyle = "#ffffff";

  let curY = 44;
  for (const line of lines.slice(0, 3)) {
    ctx.fillText(line, 4, curY);
    curY += Math.round(fontSize * 1.34);
  }

  return canvas.toDataURL("image/png");
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

function rasterizeSvgToPng(
  url: string,
  width: number,
  height: number
): Promise<string | null> {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(null);
        return;
      }
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = () => resolve(null);
    img.src = url;
  });
}
