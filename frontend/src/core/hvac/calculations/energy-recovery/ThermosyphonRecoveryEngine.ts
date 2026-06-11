export interface ThermosyphonRecoveryInput {
  exhaustFlowM3Hr: number;

  exhaustTemperatureC: number;

  targetExitTemperatureC: number;

  recoveryEfficiency: number;

  operatingHours: number;
}

export interface ThermosyphonRecoveryResult {
  recoveredHeatKW: number;

  annualEnergyRecoveryKWh: number;

  annualCO2ReductionKg: number;

  annualFuelSavingNm3: number;

  designScore: number;

  designStatus:
    | "SAFE"
    | "WARNING"
    | "CRITICAL";

  recommendations: string[];
}

export class ThermosyphonRecoveryEngine {

  static calculate(
    input: ThermosyphonRecoveryInput
  ): ThermosyphonRecoveryResult {

    const deltaT =
      input.exhaustTemperatureC -
      input.targetExitTemperatureC;

    const recoveredHeatKW =
      (
        1.2 *
        input.exhaustFlowM3Hr *
        deltaT *
        input.recoveryEfficiency
      ) / 3600;

    const annualEnergyRecoveryKWh =
      recoveredHeatKW *
      input.operatingHours;

    const annualCO2ReductionKg =
      annualEnergyRecoveryKWh *
      0.82;

    const annualFuelSavingNm3 =
      annualEnergyRecoveryKWh /
      10.5;

    let designScore = 100;

    const recommendations: string[] = [];

    if (input.recoveryEfficiency < 0.60) {
      designScore -= 15;

      recommendations.push(
        "Improve thermosyphon heat transfer effectiveness."
      );
    }

    if (deltaT < 20) {
      designScore -= 10;

      recommendations.push(
        "Low temperature recovery potential."
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
      recoveredHeatKW,

      annualEnergyRecoveryKWh,

      annualCO2ReductionKg,

      annualFuelSavingNm3,

      designScore,

      designStatus,

      recommendations
    };
  }
}