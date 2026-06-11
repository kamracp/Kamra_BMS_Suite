export interface FaultDetectionInput {
  chillerCOP: number;

  pumpEfficiency: number;

  fanEfficiency: number;

  coolingTowerApproachC: number;

  heatPumpCOP?: number;
}

export interface FaultDetectionResult {
  faultCount: number;

  faultSeverity:
    | "LOW"
    | "MEDIUM"
    | "HIGH";

  designStatus:
    | "SAFE"
    | "WARNING"
    | "CRITICAL";

  faults: string[];

  recommendations: string[];
}

export class FaultDetectionEngine {

  static calculate(
    input: FaultDetectionInput
  ): FaultDetectionResult {

    const faults: string[] = [];

    const recommendations: string[] = [];

    if (input.chillerCOP < 4.5) {
      faults.push(
        "Low Chiller COP Detected"
      );

      recommendations.push(
        "Inspect chiller efficiency and operating conditions."
      );
    }

    if (input.pumpEfficiency < 75) {
      faults.push(
        "Low Pump Efficiency"
      );

      recommendations.push(
        "Review pump selection and hydraulic balancing."
      );
    }

    if (input.fanEfficiency < 75) {
      faults.push(
        "Low Fan Efficiency"
      );

      recommendations.push(
        "Inspect fan system and airflow restrictions."
      );
    }

    if (
      input.coolingTowerApproachC > 5
    ) {
      faults.push(
        "High Cooling Tower Approach Temperature"
      );

      recommendations.push(
        "Check tower performance and fill condition."
      );
    }

    if (
      input.heatPumpCOP !== undefined &&
      input.heatPumpCOP < 3.5
    ) {
      faults.push(
        "Low Heat Pump COP"
      );

      recommendations.push(
        "Review heat pump operating temperatures."
      );
    }

    const faultCount =
      faults.length;

    let faultSeverity:
      | "LOW"
      | "MEDIUM"
      | "HIGH";

    if (faultCount <= 1) {
      faultSeverity = "LOW";
    }
    else if (faultCount <= 3) {
      faultSeverity = "MEDIUM";
    }
    else {
      faultSeverity = "HIGH";
    }

    let designStatus:
      | "SAFE"
      | "WARNING"
      | "CRITICAL";

    if (faultCount === 0) {
      designStatus = "SAFE";
    }
    else if (faultCount <= 2) {
      designStatus = "WARNING";
    }
    else {
      designStatus = "CRITICAL";
    }

    return {
      faultCount,

      faultSeverity,

      designStatus,

      faults,

      recommendations
    };
  }
}