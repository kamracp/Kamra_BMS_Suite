export interface WaterAnalyticsInput {
  makeupWaterM3Hr: number;

  operatingHoursPerDay: number;

  waterTariff: number;

  daysPerYear: number;
}

export interface WaterAnalyticsResult {
  dailyWaterConsumptionM3: number;

  monthlyWaterConsumptionM3: number;

  annualWaterConsumptionM3: number;

  annualWaterCost: number;

  waterEfficiencyScore: number;

  designStatus:
    | "SAFE"
    | "WARNING"
    | "CRITICAL";

  recommendations: string[];
}

export class WaterAnalyticsEngine {

  static calculate(
    input: WaterAnalyticsInput
  ): WaterAnalyticsResult {

    const dailyWaterConsumptionM3 =
      input.makeupWaterM3Hr *
      input.operatingHoursPerDay;

    const monthlyWaterConsumptionM3 =
      dailyWaterConsumptionM3 * 30;

    const annualWaterConsumptionM3 =
      dailyWaterConsumptionM3 *
      input.daysPerYear;

    const annualWaterCost =
      annualWaterConsumptionM3 *
      input.waterTariff;

    let waterEfficiencyScore = 100;

    const recommendations: string[] = [];

    if (
      annualWaterConsumptionM3 > 10000
    ) {
      waterEfficiencyScore -= 10;

      recommendations.push(
        "Review cooling tower water consumption."
      );
    }

    if (
      annualWaterConsumptionM3 > 50000
    ) {
      waterEfficiencyScore -= 20;

      recommendations.push(
        "High annual water usage detected."
      );
    }

    let designStatus:
      | "SAFE"
      | "WARNING"
      | "CRITICAL";

    if (waterEfficiencyScore >= 80) {
      designStatus = "SAFE";
    }
    else if (waterEfficiencyScore >= 60) {
      designStatus = "WARNING";
    }
    else {
      designStatus = "CRITICAL";
    }

    return {
      dailyWaterConsumptionM3,

      monthlyWaterConsumptionM3,

      annualWaterConsumptionM3,

      annualWaterCost,

      waterEfficiencyScore,

      designStatus,

      recommendations
    };
  }
}