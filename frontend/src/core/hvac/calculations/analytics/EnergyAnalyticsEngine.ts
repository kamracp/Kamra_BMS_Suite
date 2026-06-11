export interface EnergyAnalyticsInput {
  coolingLoadTR: number;

  cop: number;

  operatingHoursPerDay: number;

  electricityTariff: number;

  daysPerYear: number;
}

export interface EnergyAnalyticsResult {
  coolingCapacityKW: number;

  chillerPowerKW: number;

  dailyEnergyKWh: number;

  monthlyEnergyKWh: number;

  annualEnergyKWh: number;

  annualEnergyCost: number;

  annualCO2Kg: number;

  energyScore: number;

  designStatus:
    | "SAFE"
    | "WARNING"
    | "CRITICAL";

  recommendations: string[];
}

export class EnergyAnalyticsEngine {

  static calculate(
    input: EnergyAnalyticsInput
  ): EnergyAnalyticsResult {

    const coolingCapacityKW =
      input.coolingLoadTR * 3.517;

    const chillerPowerKW =
      coolingCapacityKW /
      input.cop;

    const dailyEnergyKWh =
      chillerPowerKW *
      input.operatingHoursPerDay;

    const monthlyEnergyKWh =
      dailyEnergyKWh * 30;

    const annualEnergyKWh =
      dailyEnergyKWh *
      input.daysPerYear;

    const annualEnergyCost =
      annualEnergyKWh *
      input.electricityTariff;

    const annualCO2Kg =
      annualEnergyKWh * 0.82;

    let energyScore = 100;

    const recommendations: string[] = [];

    if (input.cop < 5.0) {
      energyScore -= 15;

      recommendations.push(
        "Improve chiller COP for better energy efficiency."
      );
    }

    if (annualEnergyKWh > 1000000) {
      energyScore -= 10;

      recommendations.push(
        "High annual energy consumption detected."
      );
    }

    let designStatus:
      | "SAFE"
      | "WARNING"
      | "CRITICAL";

    if (energyScore >= 80) {
      designStatus = "SAFE";
    }
    else if (energyScore >= 60) {
      designStatus = "WARNING";
    }
    else {
      designStatus = "CRITICAL";
    }

    return {
      coolingCapacityKW,

      chillerPowerKW,

      dailyEnergyKWh,

      monthlyEnergyKWh,

      annualEnergyKWh,

      annualEnergyCost,

      annualCO2Kg,

      energyScore,

      designStatus,

      recommendations
    };
  }
}