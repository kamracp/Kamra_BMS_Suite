export interface CarbonAnalyticsInput {
  annualElectricityKWh: number;

  annualNaturalGasNm3?: number;

  annualDieselLiters?: number;
}

export interface CarbonAnalyticsResult {
  electricityCO2Kg: number;

  naturalGasCO2Kg: number;

  dieselCO2Kg: number;

  totalCO2Kg: number;

  totalCO2Ton: number;

  carbonScore: number;

  designStatus:
    | "SAFE"
    | "WARNING"
    | "CRITICAL";

  recommendations: string[];
}

export class CarbonAnalyticsEngine {

  static calculate(
    input: CarbonAnalyticsInput
  ): CarbonAnalyticsResult {

    const electricityCO2Kg =
      input.annualElectricityKWh * 0.82;

    const naturalGasCO2Kg =
      (input.annualNaturalGasNm3 ?? 0) * 1.90;

    const dieselCO2Kg =
      (input.annualDieselLiters ?? 0) * 2.68;

    const totalCO2Kg =
      electricityCO2Kg +
      naturalGasCO2Kg +
      dieselCO2Kg;

    const totalCO2Ton =
      totalCO2Kg / 1000;

    let carbonScore = 100;

    const recommendations: string[] = [];

    if (totalCO2Ton > 500) {
      carbonScore -= 10;

      recommendations.push(
        "Consider energy efficiency measures."
      );
    }

    if (totalCO2Ton > 1000) {
      carbonScore -= 20;

      recommendations.push(
        "Evaluate decarbonization opportunities."
      );
    }

    let designStatus:
      | "SAFE"
      | "WARNING"
      | "CRITICAL";

    if (carbonScore >= 80) {
      designStatus = "SAFE";
    }
    else if (carbonScore >= 60) {
      designStatus = "WARNING";
    }
    else {
      designStatus = "CRITICAL";
    }

    return {
      electricityCO2Kg,

      naturalGasCO2Kg,

      dieselCO2Kg,

      totalCO2Kg,

      totalCO2Ton,

      carbonScore,

      designStatus,

      recommendations
    };
  }
}