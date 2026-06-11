import type {
  AHUSelectionInput,
  AHUSelectionResult
} from "../../types/HVACCoreTypes";

export class AHUSelectionEngine {

  private static MOTOR_DATABASE = [
    0.37,
    0.55,
    0.75,
    1.1,
    1.5,
    2.2,
    3,
    4,
    5.5,
    7.5,
    11,
    15,
    18.5,
    22,
    30,
    37,
    45,
    55,
    75,
    90,
    110,
    132,
    160,
    200,
    250
  ];

  static calculate(
    input: AHUSelectionInput
  ): AHUSelectionResult {

    const warnings: string[] = [];

    const airflowCMS =
      input.airflowCFM * 0.0004719;

    const coilCapacityKW =
      input.coolingLoadKW;

    const faceVelocityMPS =
      2.5;

    const faceAreaM2 =
      airflowCMS / faceVelocityMPS;

    let coilRows = 4;

    if (coilCapacityKW > 150)
      coilRows = 8;
    else if (coilCapacityKW > 75)
      coilRows = 6;
    else if (coilCapacityKW > 35)
      coilRows = 4;
    else
      coilRows = 2;

    const totalStaticPressurePa =
      input.filterPressureDropPa +
      input.coilPressureDropPa +
      input.ductPressureDropPa;

    const fanPowerKW =
      (airflowCMS *
        totalStaticPressurePa) /
      input.fanEfficiency;

    const selectedMotorKW =
      this.selectMotor(fanPowerKW);

    const motorUtilizationPercent =
      (fanPowerKW /
        selectedMotorKW) *
      100;

    let designScore = 100;

    if (faceVelocityMPS > 3.0) {
      warnings.push(
        "High face velocity"
      );
      designScore -= 15;
    }

    if (
      totalStaticPressurePa > 1200
    ) {
      warnings.push(
        "High static pressure"
      );
      designScore -= 15;
    }

    if (
      motorUtilizationPercent > 90
    ) {
      warnings.push(
        "Motor utilization high"
      );
      designScore -= 10;
    }

    if (
      coilCapacityKW >
      input.coolingLoadKW * 1.20
    ) {
      warnings.push(
        "AHU oversized"
      );
      designScore -= 5;
    }

    let designStatus = "SAFE";

    if (designScore < 70)
      designStatus = "CRITICAL";
    else if (designScore < 90)
      designStatus = "WARNING";

    return {
      coilCapacityKW,

      faceAreaM2,

      faceVelocityMPS,

      coilRows,

      totalStaticPressurePa,

      fanPowerKW,

      selectedMotorKW,

      motorUtilizationPercent,

      designScore,

      designStatus,

      warnings,

      futureChillerLoadTR:
        coilCapacityKW / 3.517,

      futureCHWFlowLPM: 0,

      futureEnteringCHWT: 7,

      futureLeavingCHWT: 12
    };
  }

  private static selectMotor(
    requiredKW: number
  ): number {

    for (const motor of
      this.MOTOR_DATABASE) {

      if (motor >= requiredKW)
        return motor;
    }

    return 250;
  }
}
