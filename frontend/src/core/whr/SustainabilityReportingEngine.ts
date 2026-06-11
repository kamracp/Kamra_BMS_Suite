export interface SustainabilityReportingInput {
  annualEnergySavedKWh: number;

  annualFuelSavedNm3: number;

  annualCO2ReductionTons: number;

  carbonCreditsGenerated: number;

  annualCostSaving: number;
}

export interface SustainabilityReportingResult {
  executiveSummary: string;

  sustainabilityScore: number;

  sustainabilityStatus:
    | "EXCELLENT"
    | "GOOD"
    | "MARGINAL"
    | "POOR";

  netZeroContributionPercent: number;

  recommendations: string[];
}

export class SustainabilityReportingEngine {

  static calculate(
    input: SustainabilityReportingInput
  ): SustainabilityReportingResult {

    let sustainabilityScore = 100;

    const recommendations: string[] = [];

    if (input.annualCO2ReductionTons < 100) {
      sustainabilityScore -= 20;

      recommendations.push(
        "Increase decarbonization initiatives."
      );
    }

    if (input.carbonCreditsGenerated < 50) {
      sustainabilityScore -= 10;

      recommendations.push(
        "Expand carbon credit opportunities."
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

    const netZeroContributionPercent =
      Math.min(
        input.annualCO2ReductionTons / 100,
        100
      );

    const executiveSummary =
      `Annual Energy Saved: ${input.annualEnergySavedKWh.toFixed(0)} kWh, ` +
      `Fuel Saved: ${input.annualFuelSavedNm3.toFixed(0)} Nm3, ` +
      `CO2 Reduced: ${input.annualCO2ReductionTons.toFixed(2)} Tons, ` +
      `Carbon Credits: ${input.carbonCreditsGenerated.toFixed(2)}, ` +
      `Annual Savings: ₹${input.annualCostSaving.toFixed(0)}.`;

    return {
      executiveSummary,

      sustainabilityScore,

      sustainabilityStatus,

      netZeroContributionPercent,

      recommendations
    };
  }
}