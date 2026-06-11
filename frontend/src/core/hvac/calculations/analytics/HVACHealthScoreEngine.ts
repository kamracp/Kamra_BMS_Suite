export interface HVACHealthScoreInput {
  chillerEfficiency: number;

  pumpEfficiency: number;

  fanEfficiency: number;

  coolingTowerPerformance: number;

  heatPumpCOP?: number;
}

export interface HVACHealthScoreResult {
  healthScore: number;

  reliabilityGrade:
    | "A+"
    | "A"
    | "B"
    | "C";

  designStatus:
    | "SAFE"
    | "WARNING"
    | "CRITICAL";

  recommendations: string[];
}

export class HVACHealthScoreEngine {

  static calculate(
    input: HVACHealthScoreInput
  ): HVACHealthScoreResult {

    const heatPumpScore =
      input.heatPumpCOP
        ? Math.min(
            input.heatPumpCOP * 20,
            100
          )
        : 100;

    const healthScore =
      (
        input.chillerEfficiency * 0.30 +
        input.pumpEfficiency * 0.20 +
        input.fanEfficiency * 0.20 +
        input.coolingTowerPerformance * 0.20 +
        heatPumpScore * 0.10
      );

    const recommendations: string[] = [];

    if (
      input.chillerEfficiency < 80
    ) {
      recommendations.push(
        "Review chiller performance and COP."
      );
    }

    if (
      input.pumpEfficiency < 75
    ) {
      recommendations.push(
        "Pump efficiency below recommended value."
      );
    }

    if (
      input.fanEfficiency < 75
    ) {
      recommendations.push(
        "Fan efficiency requires optimization."
      );
    }

    if (
      input.coolingTowerPerformance < 80
    ) {
      recommendations.push(
        "Cooling tower approach temperature may be high."
      );
    }

    let reliabilityGrade:
      | "A+"
      | "A"
      | "B"
      | "C";

    if (healthScore >= 90) {
      reliabilityGrade = "A+";
    } else if (healthScore >= 80) {
      reliabilityGrade = "A";
    } else if (healthScore >= 70) {
      reliabilityGrade = "B";
    } else {
      reliabilityGrade = "C";
    }

    let designStatus:
      | "SAFE"
      | "WARNING"
      | "CRITICAL";

    if (healthScore >= 80) {
      designStatus = "SAFE";
    } else if (healthScore >= 60) {
      designStatus = "WARNING";
    } else {
      designStatus = "CRITICAL";
    }

    return {
      healthScore:
        Math.round(healthScore),

      reliabilityGrade,

      designStatus,

      recommendations
    };
  }
}