import type {
  HVACTakeoffInput,
  HVACTakeoffResult,
} from "../types/HVACCoreTypes";

export function calculateHVACTakeoff(
  input: HVACTakeoffInput
): HVACTakeoffResult {

  const totalDuctLengthM =
    input.mainDuctLengthM +
    input.branchDuctLengthM;

  const widthM =
    input.averageDuctWidthMM / 1000;

  const heightM =
    input.averageDuctHeightMM / 1000;

  /*
    Rectangular Duct Surface Area

    Area = 2 × (W + H) × Length
  */

  const ductSurfaceAreaM2 =
    2 *
    (widthM + heightM) *
    totalDuctLengthM;

  /*
    Assume GI Sheet = Duct Area
  */

  const giSheetQuantityM2 =
    ductSurfaceAreaM2;

  /*
    Assume insulation follows duct area
  */

  const insulationAreaM2 =
    ductSurfaceAreaM2;

  /*
    Flexible duct approximation
    1.5 m per diffuser
  */

  const flexibleDuctLengthM =
    input.diffuserCount * 1.5;

  /*
    Hanger quantity approximation
    1 hanger every 2 m
  */

  const hangerQuantityNos =
    Math.ceil(totalDuctLengthM / 2);

  return {
    totalDuctLengthM,

    ductSurfaceAreaM2,

    giSheetQuantityM2,

    insulationAreaM2,

    flexibleDuctLengthM,

    hangerQuantityNos,

    diffuserCount:
      input.diffuserCount,

    grilleCount:
      input.grilleCount,

    damperCount:
      input.damperCount,
  };
}