import type {
  DuctSizingInput,
  DuctSizingResult,
} from "../../types/HVACCoreTypes";

import {
  CFM_TO_CMS,
  DEFAULT_ASPECT_RATIO,
  DEFAULT_FRICTION_LOSS,
  MAX_VELOCITY_MPS,
  MIN_VELOCITY_MPS,
} from "./DuctSizingConstants";

export const calculateDuctSizing = (
  input: DuctSizingInput
): DuctSizingResult => {

  const airflowCMS =
    input.airflowCFM * CFM_TO_CMS;

  const ductAreaM2 =
    airflowCMS / input.velocityMPS;

  const ductHeightM =
    Math.sqrt(
      ductAreaM2 /
      DEFAULT_ASPECT_RATIO
    );

  const ductWidthM =
    ductHeightM *
    DEFAULT_ASPECT_RATIO;

  const ductWidthMM =
    ductWidthM * 1000;

  const ductHeightMM =
    ductHeightM * 1000;

  const frictionLossPaPerM =
    DEFAULT_FRICTION_LOSS;

  const pressureDropPa =
    frictionLossPaPerM *
    input.ductLengthM;

  const warnings: string[] = [];

  if (
    input.velocityMPS >
    MAX_VELOCITY_MPS
  ) {
    warnings.push(
      "High Duct Velocity"
    );
  }

  if (
    input.velocityMPS <
    MIN_VELOCITY_MPS
  ) {
    warnings.push(
      "Low Duct Velocity"
    );
  }

  if (
    pressureDropPa > 250
  ) {
    warnings.push(
      "High Pressure Drop"
    );
  }

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

  return {
    airflowCMS,
    ductAreaM2,
    ductWidthMM,
    ductHeightMM,
    pressureDropPa,
    frictionLossPaPerM,
    designStatus,
    warnings,
  };
};