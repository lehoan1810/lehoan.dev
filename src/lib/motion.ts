/** Shared motion constants so every animated component stays in sync. */
export const motionTimings = {
  terminalLineDelayMs: 140,
  terminalStartDelayMs: 500,
  magnetPaddingPx: 60,
  magnetStrength: 4,
  scrollVelocityBasePx: 40,
  scrollVelocityBoost: 0.6,
  sparkCount: 8,
  sparkSizePx: 10,
  sparkRadiusPx: 18,
  sparkDurationMs: 420,
} as const;
