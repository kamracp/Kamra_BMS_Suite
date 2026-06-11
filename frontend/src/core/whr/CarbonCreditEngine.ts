export interface CarbonCreditInput {
  annualCO2ReductionTons: number;

  carbonCreditPriceUSD: number;

  exchangeRate?: number;
}

export interface CarbonCreditResult {
  carbonCreditsGenerated: number;

  annualRevenueUSD: number;

  annualRevenueINR: number;

  sustainabilityScore: number;

  sustainabilityStatus:
    | "EXCELLENT"
    | "GOOD"
    | "MARGINAL"
    | "POOR";

  recommendations: string[];
}

export class CarbonCreditEngine {

  static calculate(
    input: CarbonCreditInput
  ): CarbonCreditResult {

    const exchangeRate =
      input.exchangeRate ?? 85;

    const carbonCreditsGenerated =
      input.annualCO2ReductionTons;

    const annualRevenueUSD =
      carbonCreditsGenerated *
      input.carbonCreditPriceUSD;

    const annualRevenueINR =
      annualRevenueUSD *
      exchangeRate;

    let sustainabilityScore = 100;

    const recommendations: string[] = [];

    if (
      carbonCreditsGenerated < 100
    ) {
      sustainabilityScore -= 15;

      recommendations.push(
        "Increase decarbonization projects."
      );
    }

    if (
      carbonCreditsGenerated < 50
    ) {
      sustainabilityScore -= 20;

      recommendations.push(
        "Carbon credit generation is low."
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
      carbonCreditsGenerated,

      annualRevenueUSD,

      annualRevenueINR,

      sustainabilityScore,

      sustainabilityStatus,

      recommendations
    };
  }
}