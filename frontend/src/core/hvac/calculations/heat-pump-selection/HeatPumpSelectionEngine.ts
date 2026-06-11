export interface HeatPumpSelectionInput {
  heatingLoadKW: number;

  sourceTemperatureC: number;

  supplyTemperatureC: number;

  operatingHours: number;
}

export interface HeatPumpSelectionResult {
  selectedCapacityKW: number;

  powerInputKW: number;

  cop: number;

  annualEnergyKWh: number;

  designScore: number;

  designStatus:
    | "SAFE"
    | "WARNING"
    | "CRITICAL";

  warnings: string[];
}

export class HeatPumpSelectionEngine {
  static calculate(
    input: HeatPumpSelectionInput
  ): HeatPumpSelectionResult {

    const deltaT =
      input.supplyTemperatureC -
      input.sourceTemperatureC;

    let cop = 4.5;

    if (deltaT > 40) {
      cop = 3.0;
    }
    else if (deltaT > 25) {
      cop = 3.5;
    }
    else if (deltaT > 15) {
      cop = 4.0;
    }

    const selectedCapacityKW =
      input.heatingLoadKW * 1.10;

    const powerInputKW =
      selectedCapacityKW / cop;

    const annualEnergyKWh =
      powerInputKW *
      input.operatingHours;

    let designScore = 100;

    const warnings: string[] = [];

    if (cop < 4.0) {
      designScore -= 15;

      warnings.push(
        "Low COP due to high temperature lift."
      );
    }

    if (deltaT > 40) {
      designScore -= 20;

      warnings.push(
        "Large source-to-supply temperature difference."
      );
    }

    let designStatus:
      | "SAFE"
      | "WARNING"
      | "CRITICAL";

    if (designScore >= 80) {
      designStatus = "SAFE";
    }
    else if (designScore >= 60) {
      designStatus = "WARNING";
    }
    else {
      designStatus = "CRITICAL";
    }

    return {
      selectedCapacityKW,

      powerInputKW,

      cop,

      annualEnergyKWh,

      designScore,

      designStatus,

      warnings
    };
  }
}