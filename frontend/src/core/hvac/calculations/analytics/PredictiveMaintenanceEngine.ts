export interface PredictiveMaintenanceInput {
  equipmentType: string;

  runtimeHours: number;

  designLifeHours: number;

  faultCount: number;

  healthScore: number;
}

export interface PredictiveMaintenanceResult {
  remainingLifePercent: number;

  maintenanceRisk:
    | "LOW"
    | "MEDIUM"
    | "HIGH";

  recommendedAction: string;

  designStatus:
    | "SAFE"
    | "WARNING"
    | "CRITICAL";
}

export class PredictiveMaintenanceEngine {

  static calculate(
    input: PredictiveMaintenanceInput
  ): PredictiveMaintenanceResult {

    const remainingLifePercent =
      Math.max(
        0,
        (
          (
            input.designLifeHours -
            input.runtimeHours
          ) /
          input.designLifeHours
        ) * 100
      );

    let maintenanceRisk:
      | "LOW"
      | "MEDIUM"
      | "HIGH";

    let recommendedAction =
      "Continue normal operation.";

    let designStatus:
      | "SAFE"
      | "WARNING"
      | "CRITICAL";

    if (
      remainingLifePercent < 20 ||
      input.faultCount >= 4 ||
      input.healthScore < 60
    ) {

      maintenanceRisk = "HIGH";

      recommendedAction =
        "Schedule major inspection immediately.";

      designStatus = "CRITICAL";

    } else if (
      remainingLifePercent < 40 ||
      input.faultCount >= 2 ||
      input.healthScore < 80
    ) {

      maintenanceRisk = "MEDIUM";

      recommendedAction =
        "Plan preventive maintenance.";

      designStatus = "WARNING";

    } else {

      maintenanceRisk = "LOW";

      recommendedAction =
        "Continue routine maintenance.";

      designStatus = "SAFE";
    }

    return {
      remainingLifePercent,

      maintenanceRisk,

      recommendedAction,

      designStatus
    };
  }
}