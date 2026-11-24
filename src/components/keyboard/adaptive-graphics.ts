export type GraphicsSettings = {
  dpr: number;
  shadows: boolean;
  softShadows: boolean;
  ao: boolean;
  bloom: boolean;
  lighting: boolean;
};

// Native Retina 2x DPR + crisp direct WebGL MSAA (ao: false & bloom: false prevents PostFX mipmap blur!)
const SHARP_RETINA: GraphicsSettings = {
  dpr: 2,
  shadows: true,
  softShadows: false,
  ao: false,
  bloom: false,
  lighting: true,
};

export const GRAPHICS_LEVELS: readonly GraphicsSettings[] = [
  { ...SHARP_RETINA, dpr: 1.5 },
  SHARP_RETINA,
];

export const INITIAL_GRAPHICS_LEVEL = 1;
export type FrameReading = { mean: number; p95: number };

export function createAdaptiveQuality() {
  let level = INITIAL_GRAPHICS_LEVEL;
  return {
    resetSamples() {},
    observe(_reading: FrameReading): number | null {
      return level === INITIAL_GRAPHICS_LEVEL ? null : level;
    },
  };
}
