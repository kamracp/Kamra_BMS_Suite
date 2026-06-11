// =====================================================
// KAMRA BMS SUITE
// UNIFIED HVAC CORE V2.1
// PsychrometricEngine.ts
// =====================================================

import type {
  PsychrometricInput,
  PsychrometricResult,
} from "../../types/HVACCoreTypes";
import {
  CP_AIR,
  CP_WATER_VAPOR,
  LATENT_HEAT,
  DEFAULT_SHR,
  HUMIDITY_RATIO_FACTOR,
  RH_LOW_LIMIT,
  RH_HIGH_LIMIT,
  DBT_HIGH_LIMIT,
  SPECIFIC_VOLUME_BASE,
  SPECIFIC_VOLUME_TEMP_FACTOR,
} from "./PsychrometricConstants";
// =====================================================
// Psychrometric Calculation Engine
// =====================================================

export const calculatePsychrometrics = (
  input: PsychrometricInput
): PsychrometricResult => {

  // =====================================================
  // Simplified Humidity Ratio
  // =====================================================
const humidityRatio =
  (input.relativeHumidity / 100) *
  HUMIDITY_RATIO_FACTOR;
  

  // =====================================================
  // Simplified Enthalpy
  // =====================================================

  const enthalpy =
     CP_AIR*
    input.dryBulbTemp +
    humidityRatio *
    (
      LATENT_HEAT +
       CP_WATER_VAPOR*
      input.dryBulbTemp
    );

  // =====================================================
  // Simplified Dew Point
  // =====================================================

  const dewPoint =
    input.dryBulbTemp -
    (
      (100 -
        input.relativeHumidity) /
      5
    );

  // =====================================================
  // Simplified Specific Volume
  // =====================================================

  const specificVolume =
     SPECIFIC_VOLUME_BASE+
    (
      input.dryBulbTemp *
      SPECIFIC_VOLUME_TEMP_FACTOR
    );

  // =====================================================
  // Sensible Heat Ratio
  // =====================================================

  const sensibleHeatRatio =
    DEFAULT_SHR;

  // =====================================================
  // Warning Intelligence
  // =====================================================

  const warnings: string[] = [];

   if (input.relativeHumidity > RH_HIGH_LIMIT){
    warnings.push(
      "High Relative Humidity"
    );
  }

  if (input.relativeHumidity < RH_LOW_LIMIT) {
    warnings.push(
      "Low Relative Humidity"
    );
  }

  if (input.dryBulbTemp > DBT_HIGH_LIMIT){
    warnings.push(
      "High Dry Bulb Temperature"
    );
  }

  // =====================================================
  // Design Status
  // =====================================================

  let designStatus:
    | "SAFE"
    | "WARNING"
    | "CRITICAL" = "SAFE";

  if (
    warnings.length >= 1
  ) {
    designStatus = "WARNING";
  }

  if (
    warnings.length >= 3
  ) {
    designStatus = "CRITICAL";
  }

  // =====================================================
  // Return Result
  // =====================================================

  return {
    humidityRatio,

    enthalpy,

    dewPoint,

    specificVolume,

    sensibleHeatRatio,

    designStatus,

    warnings,
  };
};