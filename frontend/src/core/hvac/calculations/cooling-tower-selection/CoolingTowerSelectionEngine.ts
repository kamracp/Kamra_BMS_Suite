export interface CoolingTowerSelectionInput {
  condenserHeatLoadKW: number;

  rangeTemperatureC: number;

  approachTemperatureC: number;

  operatingHours: number;
}

export interface CoolingTowerSelectionResult {
  selectedCapacityTR: number;

  circulationFlowM3Hr: number;

  fanPowerKW: number;

  evaporationLossM3Hr: number;

  driftLossM3Hr: number;

  blowdownM3Hr: number;

  makeupWaterM3Hr: number;

  annualWaterConsumptionM3: number;

  designScore: number;

  designStatus:
    | "SAFE"
    | "WARNING"
    | "CRITICAL";

  warnings: string[];
}

export class CoolingTowerSelectionEngine {

  static calculate(
    input: CoolingTowerSelectionInput
  ): CoolingTowerSelectionResult {

    const selectedCapacityTR =
      input.condenserHeatLoadKW / 3.517;

    const circulationFlowM3Hr =
      selectedCapacityTR * 0.68;

    const fanPowerKW =
      selectedCapacityTR * 0.02;

    const evaporationLossM3Hr =
      circulationFlowM3Hr *
      input.rangeTemperatureC *
      0.001;

    const driftLossM3Hr =
      circulationFlowM3Hr *
      0.0002;

    const blowdownM3Hr =
      evaporationLossM3Hr / 3;

    const makeupWaterM3Hr =
      evaporationLossM3Hr +
      driftLossM3Hr +
      blowdownM3Hr;

    const annualWaterConsumptionM3 =
      makeupWaterM3Hr *
      input.operatingHours;

    let designScore = 100;

    const warnings: string[] = [];

    if (
      input.approachTemperatureC > 4
    ) {
      designScore -= 10;

      warnings.push(
        "Cooling tower approach temperature above recommended value."
      );
    }

    if (
      input.approachTemperatureC > 6
    ) {
      designScore -= 20;

      warnings.push(
        "Cooling tower approach temperature critically high."
      );
    }

    let designStatus:
      | "SAFE"
      | "WARNING"
      | "CRITICAL";

    if (designScore >= 80) {
      designStatus = "SAFE";
    } else if (designScore >= 60) {
      designStatus = "WARNING";
    } else {
      designStatus = "CRITICAL";
    }

    return {
      selectedCapacityTR,

      circulationFlowM3Hr,

      fanPowerKW,

      evaporationLossM3Hr,

      driftLossM3Hr,

      blowdownM3Hr,

      makeupWaterM3Hr,

      annualWaterConsumptionM3,

      designScore,

      designStatus,

      warnings
    };
  }
}