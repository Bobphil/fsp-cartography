import { HSFRegion } from "./types";

export const HSF_CANONICAL_ORDER: readonly HSFRegion[] = ["H", "S", "F"];

export function normalizeHSFRegions(regions: readonly HSFRegion[]): HSFRegion[] {
  const raw = regions as readonly unknown[];

  if (raw.length === 0) {
    throw new Error("H/S/F regions must contain at least one region");
  }

  for (const region of raw) {
    if (region !== "H" && region !== "S" && region !== "F") {
      throw new Error(`Invalid H/S/F region: ${String(region)}`);
    }
  }

  const present = new Set<HSFRegion>(regions);
  return HSF_CANONICAL_ORDER.filter(region => present.has(region));
}

export function isCanonicalHSFRegions(regions: readonly unknown[]): regions is HSFRegion[] {
  if (regions.length === 0) return false;
  if (regions.some(region => region !== "H" && region !== "S" && region !== "F")) return false;
  if (new Set(regions).size !== regions.length) return false;

  const canonical = HSF_CANONICAL_ORDER.filter(region => regions.includes(region));
  return canonical.length === regions.length &&
    canonical.every((region, index) => region === regions[index]);
}

export function sameHSFRegions(
  left: readonly HSFRegion[],
  right: readonly HSFRegion[]
): boolean {
  return left.length === right.length &&
    left.every((region, index) => region === right[index]);
}
