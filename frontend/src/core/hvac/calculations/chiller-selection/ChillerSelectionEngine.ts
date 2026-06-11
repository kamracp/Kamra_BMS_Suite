import type {
  ChillerSelectionInput,
  ChillerSelectionResult
} from "../../types/HVACCoreTypes";

export class ChillerSelectionEngine {

  static calculate(
    input: ChillerSelectionInput
  ): ChillerSelectionResult {

    const warnings: string[] = [];

    const loadWithRedundancy =
      input.totalCoolingLoadTR *
      input.redundancyFactor;

    const selectedChillerTR = 200;

    const numberOfChillers =
      Math.ceil(
        loadWithRedundancy /
        selectedChillerTR
      );

    const installedCapacityTR =
      numberOfChillers *
      selectedChillerTR;

    const chillerPowerKW =
      installedCapacityTR *
      3.517 /
      input.chillerCOP;

    const chilledWaterFlowLPM =
      installedCapacityTR *
      0.86;

    let designStatus = "SAFE";

    if (numberOfChillers > 6) {
      warnings.push(
        "Large chiller plant"
      );

      designStatus = "WARNING";
    }

    return {
      totalCoolingLoadTR:
        input.totalCoolingLoadTR,

      selectedChillerTR,

      numberOfChillers,

      installedCapacityTR,

      chillerPowerKW,

      chilledWaterFlowLPM,

      designStatus,

      warnings
    };
  }
}