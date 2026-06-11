export type RecoveryTechnology =
  | "HEAT_PIPE"
  | "THERMOSYPHON"
  | "HEAT_RECOVERY_WHEEL"
  | "PLATE_HEAT_EXCHANGER"
  | "RUN_AROUND_COIL"
  | "BOILER_ECONOMIZER";

export interface EnergyRecoveryInput {
  recoveryTechnology: RecoveryTechnology;

  exhaustFlowM3Hr: number;

  exhaustTemperatureC: number;

  freshAirTemperatureC: number;

  recoveryEfficiency: number;

  operatingHours: number;

  energyTariff?: number;
}

export interface EnergyRecoveryResult {
  recoveredHeatKW: number;

  annualEnergyRecoveryKWh: number;

  annualCO2ReductionKg: number;

  annualCostSaving: number;

  designScore: number;

  designStatus:
    | "SAFE"
    | "WARNING"
    | "CRITICAL";

  recommendations: string[];
}

export class EnergyRecoveryEngine {

  static calculate(
    input: EnergyRecoveryInput
  ): EnergyRecoveryResult {

    const deltaT =
      input.exhaustTemperatureC -
      input.freshAirTemperatureC;

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

    const tariff =
      input.energyTariff ?? 8;

    const annualCostSaving =
      annualEnergyRecoveryKWh *
      tariff;

    let designScore = 100;

    const recommendations: string[] = [];

    if (input.recoveryEfficiency < 0.60) {
      designScore -= 15;

      recommendations.push(
        "Increase recovery efficiency."
      );
    }

    if (input.recoveryEfficiency < 0.40) {
      designScore -= 25;

      recommendations.push(
        "Recovery efficiency critically low."
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

      annualCostSaving,

      designScore,

      designStatus,

      recommendations
    };
  }
}