import headingMetrics from "./heading-metrics.json";
import { addCounterModel, type CounterModel } from "./counter-model";
import { createKeyWell } from "./key-well";
import {
  createDocument,
  createMaterial,
  newId,
  type ChibiDocument,
  type ChibiMaterial,
  type ChibiNode,
  type Vec3,
} from "@chibi3d/runtime/schema";

export type KeyboardSkill = {
  name: string;
  label: string;
  labelZh?: string;
  shortDescription: string;
  color: string;
  keyboardColor?: string;
  icon: string;
  shortcut?: string;
  colSpan?: 1 | 2;
  rowSpan?: 1 | 2;
};

export type KeyboardKey = {
  skill: KeyboardSkill;
  nodeId: string;
  motionId: string;
  materialId: string;
  logoMaterialId?: string;
  pressedStateId: string;
  labelId: string;
};

export type DescriptionTarget = {
  materialId: string;
  text: string;
};

export type KeyboardScene = {
  document: ChibiDocument;
  keys: KeyboardKey[];
  descriptions: DescriptionTarget[];
  boardId: string;
  spinId: string;
  revealId: string;
  catId: string;
  frameIds: [string, string];
  labelsId: string;
  textMaterialId: string;
  defaultLabelId: string;
  pointerTargets: string[];
  counter: CounterModel;
  counterId: string;
  columns: number;
};

// Geometry contract of assets/keyboard/keycaps-pro.glb (9-sliced from keycaps.glb)
const KIT = {
  pitch: 1.04468,
  keyY: 1.21117,
  keyHeight: 0.7629,
  logoY: 0.13985,
  keyTop: 0.13102987408638,
  cutX: 3.189,
  cutZ: 2.053,
  halfW: 3.67448,
  halfD: 2.57744,
};

export const KEYBOARD_MODEL_URL = "/assets/keyboard/keycaps-pro.glb";

type PlacedSkill = {
  skill: KeyboardSkill;
  col: number;
  row: number;
  colSpan: 1 | 2;
  rowSpan: 1 | 2;
};

function packSkillsGrid(
  skills: readonly KeyboardSkill[],
  cols: number
): { placed: PlacedSkill[]; rows: number } {
  const occupied: boolean[][] = [];
  const ensureRow = (r: number) => {
    while (occupied.length <= r) {
      occupied.push(new Array(cols).fill(false));
    }
  };

  const canFit = (r: number, c: number, cs: number, rs: number) => {
    if (c + cs > cols) return false;
    for (let dr = 0; dr < rs; dr++) {
      ensureRow(r + dr);
      for (let dc = 0; dc < cs; dc++) {
        if (occupied[r + dr][c + dc]) return false;
      }
    }
    return true;
  };

  const mark = (r: number, c: number, cs: number, rs: number) => {
    for (let dr = 0; dr < rs; dr++) {
      ensureRow(r + dr);
      for (let dc = 0; dc < cs; dc++) {
        occupied[r + dr][c + dc] = true;
      }
    }
  };

  const placed: PlacedSkill[] = [];
  let maxRow = 1;

  for (const skill of skills) {
    const cs = skill.colSpan ?? 1;
    const rs = skill.rowSpan ?? 1;
    let r = 0;
    let found = false;
    while (!found) {
      ensureRow(r);
      for (let c = 0; c <= cols - cs; c++) {
        if (canFit(r, c, cs, rs)) {
          mark(r, c, cs, rs);
          placed.push({ skill, col: c, row: r, colSpan: cs, rowSpan: rs });
          maxRow = Math.max(maxRow, r + rs);
          found = true;
          break;
        }
      }
      if (!found) r++;
    }
  }

  return { placed, rows: maxRow };
}

export function createKeyboardScene(
  skills: readonly KeyboardSkill[],
  columns = 8
): KeyboardScene {
  if (!skills.length || skills.length > 96) {
    throw new RangeError("Choose between 1 and 96 keyboard skills");
  }
  if (!Number.isInteger(columns) || columns < 1 || columns > 12) {
    throw new RangeError("Keyboard columns must be between 1 and 12");
  }
  if (new Set(skills.map((s) => s.name)).size !== skills.length) {
    throw new Error("Keyboard skill names must be unique");
  }

  const cols = columns;
  const { placed, rows } = packSkillsGrid(skills, cols);

  const doc = createDocument("Portfolio skills");
  doc.root = [];
  doc.nodes = {};
  doc.materials = {};
  doc.environment = {
    ...doc.environment,
    preset: "product",
    shadows: true,
    softShadows: false,
    exposure: 0.88,
    toneMapping: "linear",
    ao: false,
    bloom: false,
  };
  doc.camera = {
    position: [-9, 9.6, 9],
    target: [0, 0.6, 0],
    fov: 36,
    parallax: 0,
  };
  doc.editor.grid = false;

  const assetId = newId("as");
  doc.assets[assetId] = {
    id: assetId,
    kind: "glb",
    name: "keycaps-pro.glb",
    hash: "68f2b25d27469b6836a49e2956b30d279e915e004a8aa2349c88b393f7e303ea",
    size: 327872,
  };

  const add = (node: ChibiNode, parent?: string) => {
    doc.nodes[node.id] = node;
    (parent ? doc.nodes[parent].children : doc.root).push(node.id);
    return node.id;
  };
  const transform = (position: Vec3 = [0, 0, 0], scale: Vec3 = [1, 1, 1]) => ({
    position,
    rotation: [0, 0, 0] as Vec3,
    scale,
  });
  const group = (name: string, parent?: string, position?: Vec3, scale?: Vec3) =>
    add(
      {
        id: newId("nd"),
        name,
        type: "group",
        visible: true,
        transform: transform(position, scale),
        children: [],
      },
      parent
    );
  const material = (name: string, patch: Partial<ChibiMaterial>) => {
    const id = newId("mt");
    doc.materials[id] = { ...createMaterial(id, name), ...patch };
    return id;
  };
  const model = (
    name: string,
    path: string,
    materialId: string,
    parent: string,
    position?: Vec3,
    scale?: Vec3
  ) =>
    add(
      {
        id: newId("nd"),
        name,
        type: "model",
        assetId,
        path,
        materialId,
        visible: true,
        castShadow: true,
        receiveShadow: true,
        children: [],
        transform: transform(position, scale),
      },
      parent
    );

  for (const [name, position, intensity, castShadow] of [
    ["Key light", [-6, 8, -3], 2.8, true],
    ["Fill", [4, 6, 6], 0.16, false],
  ] as const) {
    add({
      id: newId("nd"),
      name,
      type: "light",
      visible: true,
      children: [],
      transform: transform([...position]),
      light: { kind: "directional", color: "#ffffff", intensity, castShadow },
    });
  }

  const boardId = group("Keyboard placement");
  doc.nodes[boardId].visible = false;
  const revealId = group("Keyboard reveal", boardId);
  const spinId = group("Keyboard rotation", revealId);

  const innerX = KIT.cutX + ((cols - 6) * KIT.pitch) / 2;
  const innerZ = KIT.cutZ + ((rows - 4) * KIT.pitch) / 2;
  const span = innerX + innerZ + KIT.halfW - KIT.cutX + KIT.halfD - KIT.cutZ;
  const fit = Math.min(1.2, ((KIT.halfW + KIT.halfD) / span) * 1.04);
  const keyboardCenterY = (KIT.keyY + KIT.keyTop) / 2;
  const layout = group(
    "Keyboard layout",
    spinId,
    [0, -keyboardCenterY * fit, 0],
    [fit, fit, fit]
  );

  const caseMaterial = material("Case", { color: "#171819", roughness: 0.64 });
  const counterId = group("Left side counter", layout);
  doc.nodes[counterId].visible = false;
  const outerX = innerX + KIT.halfW - KIT.cutX;
  const outerZ = innerZ + KIT.halfD - KIT.cutZ;
  const counter = addCounterModel(doc, counterId, [-outerX - 0.003, 0.36, -0.3]);
  const well = createKeyWell(
    outerX,
    outerZ,
    (cols - 1) * KIT.pitch + 1,
    (rows - 1) * KIT.pitch + 1
  );
  const plateMaterial = material("Recessed switch plate", {
    color: "#101213",
    roughness: 0.82,
  });

  for (const [name, geometry, materialId, x] of [
    ["Case left edge", well.edge, caseMaterial, 0],
    ["Case top rim", well.shelf, caseMaterial, well.shelfCenter],
    ["Case body", well.body, caseMaterial, 0],
    ["Recessed switch plate", well.plate, plateMaterial, 0],
  ] as const) {
    const position: Vec3 = [x, 0, 0];
    const scale: Vec3 = [1, 1, 1];
    add(
      {
        id: newId("nd"),
        name,
        type: "mesh",
        geometry,
        materialId,
        visible: true,
        castShadow: true,
        receiveShadow: true,
        children: [],
        transform: transform(position, scale),
      },
      layout
    );
  }

  const labelsId = group("Skill labels", layout, [
    -outerX + KIT.pitch / 2,
    1.15,
    -outerZ - 0.7,
  ]);
  doc.nodes[labelsId].visible = false;
  const textMaterial = material("Skill text", {
    color: "#ffffff",
    roughness: 0.72,
  });

  const descriptions: DescriptionTarget[] = [];

  const label = (title: string, description: string) => {
    const id = group(`Label ${title}`, labelsId);
    doc.nodes[id].visible = false;
    const bounds = headingBounds(title);
    const size = Math.min(0.68, 6.2 / Math.max(bounds.width, 1));
    add(
      {
        id: newId("nd"),
        name: `Heading ${title}`,
        type: "mesh",
        materialId: textMaterial,
        geometry: {
          kind: "text3d",
          params: { text: title, size, depth: 0.1, bevel: 0.005 },
        },
        transform: {
          ...transform([-bounds.left * size, 0, -0.68]),
          rotation: [-Math.PI / 2, 0, 0],
        },
        visible: true,
        castShadow: true,
        receiveShadow: true,
        children: [],
      },
      id
    );
    const descriptionId = newId("as");
    doc.assets[descriptionId] = {
      id: descriptionId,
      kind: "texture",
      name: descriptionArtwork(description),
      hash: `description-${id}`,
      size: 0,
    };
    const descriptionMaterial = material(`Description ${title}`, {
      color: "#ffffff",
      roughness: 1,
      transparent: true,
      maps: { map: descriptionId, normalMap: null, roughnessMap: null },
    });
    descriptions.push({
      materialId: descriptionMaterial,
      text: description,
    });
    add(
      {
        id: newId("nd"),
        name: `Description ${title}`,
        type: "mesh",
        materialId: descriptionMaterial,
        geometry: { kind: "plane", params: { width: 6.2, height: 1.5 } },
        transform: {
          ...transform([3.1, 0, 0.16]),
          rotation: [-Math.PI / 2, 0, 0],
        },
        visible: true,
        castShadow: false,
        receiveShadow: false,
        children: [],
      },
      id
    );
    return id;
  };

  const defaultLabelId = label(
    "UX & AI Design",
    "悬停、点击三维键帽或按下键盘快捷键检视核心设计能力与工具体系"
  );
  doc.nodes[defaultLabelId].visible = true;

  const keys = placed.map(
    ({ skill, col, row, colSpan, rowSpan }): KeyboardKey => {
      const centerX = (col + (colSpan - 1) / 2 - (cols - 1) / 2) * KIT.pitch;
      const centerZ = (row + (rowSpan - 1) / 2 - (rows - 1) / 2) * KIT.pitch;

      const slot = group(`Slot ${skill.name}`, layout, [
        centerX,
        KIT.keyY,
        centerZ,
      ]);
      const motionId = group(`Motion ${skill.name}`, slot);
      const capColor = skill.keyboardColor ?? skill.color;
      const color = /^#[0-9a-f]{3}$/i.test(capColor)
        ? `#${capColor
            .slice(1)
            .split("")
            .map((c) => c + c)
            .join("")}`
        : capColor;

      const isHero = colSpan === 2 && rowSpan === 2;
      const isWide = colSpan === 2 && rowSpan === 1;
      const meshPath = isHero ? "11" : isWide ? "10" : "0";

      const materialId = material(`Key ${skill.name}`, {
        color,
        roughness: isHero ? 0.28 : 0.34,
        clearcoat: isHero ? 0.22 : 0.12,
        clearcoatRoughness: 0.35,
      });
      const nodeId = model(skill.name, meshPath, materialId, motionId);

      let logoMaterialId: string | undefined;
      if (skill.icon) {
        const iconId = newId("as");
        doc.assets[iconId] = {
          id: iconId,
          kind: "texture",
          name: skill.icon,
          hash: `icon-${skill.name}`,
          size: 0,
        };
        logoMaterialId = material(`Logo ${skill.name}`, {
          color: "#ffffff",
          roughness: 0.55,
          transparent: true,
          maps: { map: iconId, normalMap: null, roughnessMap: null },
        });
        // Exact undistorted aspect ratios inside sculpted keycap top dishes:
        // - 2x2 Hero: 1.68 x 1.68 (1.000:1 -> 1024x1024)
        // - 2x1 Wide: 1.728 x 0.72 (2.400:1 -> 1440x600)
        // - 1x1 Unit: 0.72 x 0.72 (1.000:1 -> 1024x1024)
        const planeW = isHero ? 1.68 : isWide ? 1.728 : 0.72;
        const planeH = isHero ? 1.68 : isWide ? 0.72 : 0.72;
        const logoElevation =
          KIT.logoY + (isHero ? 0.028 : isWide ? 0.014 : 0.0);

        add(
          {
            id: newId("nd"),
            name: `Logo ${skill.name}`,
            type: "mesh",
            materialId: logoMaterialId,
            geometry: {
              kind: "plane",
              params: { width: planeW, height: planeH },
            },
            transform: {
              ...transform([0, logoElevation, 0]),
              rotation: [-Math.PI / 2, 0, 0],
            },
            visible: true,
            castShadow: false,
            receiveShadow: true,
            children: [],
          },
          nodeId
        );
      }

      const pressedStateId = newId("st");
      doc.states[pressedStateId] = {
        id: pressedStateId,
        nodeId,
        name: "Pressed",
        overrides: {
          [nodeId]: { "transform.position": [0, -KIT.keyHeight * 0.6, 0] },
        },
      };
      return {
        skill,
        nodeId,
        motionId,
        materialId,
        logoMaterialId,
        pressedStateId,
        labelId: label(skill.label, skill.shortDescription),
      };
    }
  );

  const catId = group("Bongo cat", layout, [-0.277, 2.356, outerZ - 0.631]);
  doc.nodes[catId].transform.rotation = [
    -141.199253, -1.535221, -167.469916,
  ].map((angle) => (angle * Math.PI) / 180) as Vec3;
  doc.nodes[catId].visible = false;
  const catAssetId = newId("as");
  doc.assets[catAssetId] = {
    id: catAssetId,
    kind: "glb",
    name: "/assets/keyboard/bongo-frames.glb",
    hash: "2a16506ae6e6b571fc02a73e6822345a73e15de05a5a13b86a391fafd94fa908",
    size: 28292,
  };
  const frameIds = [0, 1].map((frame) =>
    add(
      {
        id: newId("nd"),
        name: `Bongo frame ${frame + 1}`,
        type: "model",
        assetId: catAssetId,
        path: String(frame),
        transform: transform(
          [0, (-5.336 * 289) / 457 / 2, 0],
          [5.336, (5.336 * 289) / 457, 1]
        ),
        visible: frame === 0,
        castShadow: false,
        receiveShadow: false,
        children: [],
      },
      catId
    )
  ) as [string, string];

  return {
    document: doc,
    keys,
    descriptions,
    boardId,
    spinId,
    revealId,
    catId,
    frameIds,
    labelsId,
    textMaterialId: textMaterial,
    defaultLabelId,
    counter,
    counterId,
    columns: cols,
    pointerTargets: keys.map((k) => k.nodeId),
  };
}

export const resolveKeyboardAsset = async (
  asset: ChibiDocument["assets"][string]
): Promise<string> =>
  asset.name === "keycaps-pro.glb" ? KEYBOARD_MODEL_URL : asset.name;

function descriptionArtwork(text: string): string {
  const lines: string[] = [];
  const caption = text
    .replace(/\p{Extended_Pictographic}|[\uFE0F\u200D]/gu, "")
    .trim();
  const hasCjk = /[\u4e00-\u9fff]/.test(caption);
  if (hasCjk) {
    let current = "";
    let width = 0;
    for (const ch of caption) {
      const w = /[\u4e00-\u9fff\u3000-\u303f\uff00-\uffef]/.test(ch) ? 2 : 1.1;
      if (width + w > 42 && current) {
        lines.push(current.trim());
        current = ch;
        width = w;
      } else {
        current += ch;
        width += w;
      }
    }
    if (current.trim()) lines.push(current.trim());
  } else {
    for (const word of caption.split(/\s+/)) {
      if (!lines.length || lines[lines.length - 1].length + word.length > 34) {
        lines.push(word);
      } else {
        lines[lines.length - 1] += ` ${word}`;
      }
    }
  }
  const escape = (line: string) =>
    line
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  const size = Math.min(54, 220 / Math.max(lines.length, 1));
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="310" viewBox="0 0 1280 310"><g fill="white" font-family="'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', Arial, sans-serif" font-weight="600" font-size="${size}" text-anchor="start">${lines
    .map(
      (line, index) =>
        `<text x="0" y="${78 + index * size * 1.32}">${escape(line)}</text>`
    )
    .join("")}</g></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function headingBounds(text: string): { width: number; left: number } {
  const metrics: Record<string, number[]> = headingMetrics;
  let advance = 0;
  let left = Infinity;
  let right = -Infinity;
  for (const character of text) {
    const [width, min, max] = metrics[character] ?? metrics["?"];
    left = Math.min(left, advance + min);
    right = Math.max(right, advance + max);
    advance += width;
  }
  return text ? { width: right - left, left } : { width: 0, left: 0 };
}
