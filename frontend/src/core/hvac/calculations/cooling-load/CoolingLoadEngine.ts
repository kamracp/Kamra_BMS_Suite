
// =====================================================
// KAMRA BMS SUITE
// UNIFIED HVAC CORE V2.0
// CoolingLoadEngine.ts
// =====================================================

import type {
  CoolingLoadInput,
  CoolingLoadResult,
} from "../../types/HVACCoreTypes";

// =====================================================
// Cooling Load Calculation Engine
// =====================================================

export const calculateCoolingLoad = (
  input: CoolingLoadInput
): CoolingLoadResult => {
  // =====================================================
  // Room Volume
  // =====================================================

  const roomVolume =
    input.roomArea *
    input.roomHeight;

  // =====================================================
  // Occupancy Load
  // Assumption: 130 W per person
  // =====================================================

  const occupancyLoadKW =
    (input.occupancyCount * 130) /
    1000;

  // =====================================================
  // Lighting Load
  // =====================================================

  const lightingLoadKW =
    (
      input.roomArea *
      input.lightingLoadWm2
    ) / 1000;

  // =====================================================
  // Equipment Load
  // =====================================================

  const equipmentLoadKW =
    input.equipmentLoadKW;

  // =====================================================
  // Fresh Air Load
  // Placeholder Formula
  // To be upgraded by Psychrometric Engine
  // =====================================================

  const freshAirLoadKW =
    input.freshAirCFM *
    0.0006;

  // =====================================================
  // Total Cooling Load
  // =====================================================

  const totalCoolingLoadKW =
    occupancyLoadKW +
    lightingLoadKW +
    equipmentLoadKW +
    freshAirLoadKW;

  // =====================================================
  // Convert kW to TR
  // 1 TR = 3.517 kW
  // =====================================================

  const totalCoolingLoadTR =
    totalCoolingLoadKW /
    3.517;

  // =====================================================
  // Recommended AHU Airflow
  // Rule: 400 CFM per TR
  // =====================================================

  const recommendedAHUCFM =
    totalCoolingLoadTR *
    400;

  // =====================================================
  // Diversity Factor
  // =====================================================

  const diversityFactor = 0.90;

  // =====================================================
  // Warning Intelligence
  // =====================================================

  const warnings: string[] = [];

  // Fresh Air Check

  if (input.freshAirCFM < 100) {
    warnings.push(
      "Fresh Air Quantity Too Low"
    );
  }

  // Occupancy Density Check

  if (
    input.occupancyCount >
    input.roomArea / 2
  ) {
    warnings.push(
      "High Occupancy Density"
    );
  }

  // Large Cooling System Check

  if (totalCoolingLoadTR > 100) {
    warnings.push(
      "Large Cooling System"
    );
  }

  // Multiple AHU Recommendation

  if (recommendedAHUCFM > 40000) {
    warnings.push(
      "Multiple AHUs Recommended"
    );
  }

  // High Ceiling Check

  if (input.roomHeight > 5) {
    warnings.push(
      "High Ceiling Space"
    );
  }

  // =====================================================
  // Design Status Logic
  // =====================================================

  let designStatus:
    | "SAFE"
    | "WARNING"
    | "CRITICAL" = "SAFE";

  if (warnings.length >= 1) {
    designStatus = "WARNING";
  }

  if (warnings.length >= 3) {
    designStatus = "CRITICAL";
  }

  // =====================================================
  // Return Results
  // =====================================================

  return {
    roomVolume,

    occupancyLoadKW,

    lightingLoadKW,

    equipmentLoadKW,

    freshAirLoadKW,

    totalCoolingLoadKW,

    totalCoolingLoadTR,

    recommendedAHUCFM,

    diversityFactor,

    designStatus,

    warnings,
  };
};

