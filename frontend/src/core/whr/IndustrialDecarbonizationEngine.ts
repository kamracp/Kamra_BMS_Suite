export interface IndustrialDecarbonizationInput {
  annualEnergySavedKWh: number;

  annualFuelSavedNm3: number;

  annualProductionTons?: number;

  electricityCO2Factor?: number;

  gasCO2Factor?: number;
}

export interface IndustrialDecarbonizationResult {
  annualCO2ReductionKg: number;

  annualCO2ReductionTons: number;

  carbonIntensityReductionKgPerTon: number;

  equivalentTreesPlanted: number;

  netZeroContributionPercent: number;

  sustainabilityScore: number;

  sustainabilityStatus:
    | "EXCELLENT"
    | "GOOD"
    | "MARGINAL"
    | "POOR";

  recommendations: string[];
}

export class IndustrialDecarbonizationEngine {

  static calculate(
    input: IndustrialDecarbonizationInput
  ): IndustrialDecarbonizationResult {

    const electricityFactor =
      input.electricityCO2Factor ?? 0.82;

    const gasFactor =
      input.gasCO2Factor ?? 1.90;

    const electricityCO2 =
      input.annualEnergySavedKWh *
      electricityFactor;

    const gasCO2 =
      input.annualFuelSavedNm3 *
      gasFactor;

    const annualCO2ReductionKg =
      electricityCO2 + gasCO2;

    const annualCO2ReductionTons =
      annualCO2ReductionKg / 1000;

    const production =
      input.annualProductionTons ?? 1;

    const carbonIntensityReductionKgPerTon =
      annualCO2ReductionKg / production;

    const equivalentTreesPlanted =
      annualCO2ReductionKg / 21;

    const netZeroContributionPercent =
      Math.min(
        annualCO2ReductionTons / 100,
        100
      );

    let sustainabilityScore = 100;

    const recommendations: string[] = [];

    if (annualCO2ReductionTons < 100) {
      sustainabilityScore -= 20;

      recommendations.push(
        "Increase waste heat recovery opportunities."
      );
    }

    if (annualCO2ReductionTons < 50) {
      sustainabilityScore -= 20;

      recommendations.push(
        "Consider additional decarbonization measures."
      );
    }

    let sustainabilityStatus:
      | "EXCELLENT"
      | "GOOD"
      | "MARGINAL"
      | "POOR";

    if (sustainabilityScore >= 90) {
      sustainabilityStatus = "EXCELLENT";
    } else if (sustainabilityScore >= 75) {
      sustainabilityStatus = "GOOD";
    } else if (sustainabilityScore >= 60) {
      sustainabilityStatus = "MARGINAL";
    } else {
      sustainabilityStatus = "POOR";
    }

    return {
      annualCO2ReductionKg,

      annualCO2ReductionTons,

      carbonIntensityReductionKgPerTon,

      equivalentTreesPlanted,

      netZeroContributionPercent,

      sustainabilityScore,

      sustainabilityStatus,

      recommendations
    };
  }
}