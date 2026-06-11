export type BoilerFuelType =
  | "NATURAL_GAS"
  | "LPG"
  | "DIESEL"
  | "BIOMASS";

export interface BoilerSelectionInput {
  heatingLoadKW: number;

  fuelType: BoilerFuelType;

  boilerEfficiency: number;

  operatingHours: number;
}

export interface BoilerSelectionResult {
  selectedBoilerCapacityKW: number;

  fuelConsumptionPerHour: number;

  annualFuelConsumption: number;

  annualThermalEnergyKWh: number;

  designScore: number;

  designStatus:
    | "SAFE"
    | "WARNING"
    | "CRITICAL";

  warnings: string[];
}

export class BoilerSelectionEngine {

  private static getFuelCV(
    fuelType: BoilerFuelType
  ): number {

    switch (fuelType) {

      case "NATURAL_GAS":
        return 10.5;

      case "LPG":
        return 12.8;

      case "DIESEL":
        return 10.0;

      case "BIOMASS":
        return 4.2;

      default:
        return 10.5;
    }
  }

  static calculate(
    input: BoilerSelectionInput
  ): BoilerSelectionResult {

    const selectedBoilerCapacityKW =
      input.heatingLoadKW * 1.10;

    const fuelCV =
      this.getFuelCV(
        input.fuelType
      );

    const fuelConsumptionPerHour =
      selectedBoilerCapacityKW /
      (
        input.boilerEfficiency *
        fuelCV
      );

    const annualFuelConsumption =
      fuelConsumptionPerHour *
      input.operatingHours;

    const annualThermalEnergyKWh =
      selectedBoilerCapacityKW *
      input.operatingHours;

    let designScore = 100;

    const warnings: string[] = [];

    if (
      input.boilerEfficiency < 0.90
    ) {
      designScore -= 10;

      warnings.push(
        "Boiler efficiency below 90%."
      );
    }

    if (
      input.boilerEfficiency < 0.85
    ) {
      designScore -= 20;

      warnings.push(
        "Boiler efficiency critically low."
      );
    }

    if (
      fuelConsumptionPerHour > 100
    ) {
      designScore -= 10;

      warnings.push(
        "High fuel consumption detected."
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
      selectedBoilerCapacityKW,

      fuelConsumptionPerHour,

      annualFuelConsumption,

      annualThermalEnergyKWh,

      designScore,

      designStatus,

      warnings
    };
  }
}