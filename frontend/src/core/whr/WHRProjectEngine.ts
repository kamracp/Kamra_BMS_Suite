export interface WHRProjectInput {
  recoveredHeatKW: number;

  operatingHours: number;

  fuelCostPerUnit: number;

  capex: number;

  co2Factor?: number;
}

export interface WHRProjectResult {
  annualEnergyRecoveredKWh: number;

  annualFuelSaving: number;

  annualCostSaving: number;

  annualCO2ReductionKg: number;

  simplePaybackYears: number;

  roiPercent: number;

  projectScore: number;

  projectStatus:
    | "EXCELLENT"
    | "GOOD"
    | "MARGINAL"
    | "POOR";

  recommendations: string[];
}

export class WHRProjectEngine {

  static calculate(
    input: WHRProjectInput
  ): WHRProjectResult {

    const annualEnergyRecoveredKWh =
      input.recoveredHeatKW *
      input.operatingHours;

    const annualFuelSaving =
      annualEnergyRecoveredKWh /
      10.5;

    const annualCostSaving =
      annualFuelSaving *
      input.fuelCostPerUnit;

    const co2Factor =
      input.co2Factor ?? 0.82;

    const annualCO2ReductionKg =
      annualEnergyRecoveredKWh *
      co2Factor;

    const simplePaybackYears =
      input.capex /
      annualCostSaving;

    const roiPercent =
      (
        annualCostSaving /
        input.capex
      ) * 100;

    let projectScore = 100;

    const recommendations: string[] = [];

    if (simplePaybackYears > 3) {
      projectScore -= 20;

      recommendations.push(
        "Review CAPEX or increase recovery."
      );
    }

    if (simplePaybackYears > 5) {
      projectScore -= 30;

      recommendations.push(
        "Project payback exceeds target."
      );
    }

    let projectStatus:
      | "EXCELLENT"
      | "GOOD"
      | "MARGINAL"
      | "POOR";

    if (projectScore >= 90) {
      projectStatus = "EXCELLENT";
    } else if (projectScore >= 75) {
      projectStatus = "GOOD";
    } else if (projectScore >= 60) {
      projectStatus = "MARGINAL";
    } else {
      projectStatus = "POOR";
    }

    return {
      annualEnergyRecoveredKWh,

      annualFuelSaving,

      annualCostSaving,

      annualCO2ReductionKg,

      simplePaybackYears,

      roiPercent,

      projectScore,

      projectStatus,

      recommendations
    };
  }
}