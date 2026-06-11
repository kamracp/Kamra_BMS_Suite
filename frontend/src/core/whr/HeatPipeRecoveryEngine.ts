export interface HeatPipeRecoveryInput {
  exhaustFlowM3Hr: number;

  exhaustInletTempC: number;

  exhaustOutletTempC: number;

  coldSideInletTempC: number;

  effectiveness: number;

  operatingHours: number;

  fuelCostPerUnit: number;
}

export interface HeatPipeRecoveryResult {
  recoveredHeatKW: number;

  annualEnergyRecoveredKWh: number;

  annualFuelSavingNm3: number;

  annualCostSaving: number;

  annualCO2ReductionKg: number;

  designScore: number;

  designStatus:
    | "SAFE"
    | "WARNING"
    | "CRITICAL";

  recommendations: string[];
}

export class HeatPipeRecoveryEngine {

  static calculate(
    input: HeatPipeRecoveryInput
  ): HeatPipeRecoveryResult {

    const deltaT =
      input.exhaustInletTempC -
      input.exhaustOutletTempC;

    const recoveredHeatKW =
      (
        1.2 *
        input.exhaustFlowM3Hr *
        deltaT *
        input.effectiveness
      ) / 3600;

    const annualEnergyRecoveredKWh =
      recoveredHeatKW *
      input.operatingHours;

    const annualFuelSavingNm3 =
      annualEnergyRecoveredKWh /
      10.5;

    const annualCostSaving =
      annualFuelSavingNm3 *
      input.fuelCostPerUnit;

    const annualCO2ReductionKg =
      annualEnergyRecoveredKWh *
      0.82;

    let designScore = 100;

    const recommendations: string[] = [];

    if (input.effectiveness < 0.60) {
      designScore -= 15;

      recommendations.push(
        "Increase heat pipe effectiveness."
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

      annualEnergyRecoveredKWh,

      annualFuelSavingNm3,

      annualCostSaving,

      annualCO2ReductionKg,

      designScore,

      designStatus,

      recommendations
    };
  }
}