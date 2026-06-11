import type {
  PumpSelectionInput,
  PumpSelectionResult
} from "../../types/HVACCoreTypes";

export class PumpSelectionEngine {

  private static readonly MOTOR_DATABASE = [
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
    input: PumpSelectionInput
  ): PumpSelectionResult {

    const warnings: string[] = [];

    const flowM3S =
      input.flowLPM /
      1000 /
      60;

    const hydraulicPowerKW =
      (
        1000 *
        9.81 *
        flowM3S *
        input.headM
      ) / 1000;

    const brakePowerKW =
      hydraulicPowerKW /
      input.pumpEfficiency;

    const selectedMotorKW =
      this.selectMotor(
        brakePowerKW
      );

    let designStatus = "SAFE";

    if (input.headM > 60) {
      warnings.push(
        "High pump head"
      );

      designStatus = "WARNING";
    }

    return {
      flowLPM: input.flowLPM,

      headM: input.headM,

      hydraulicPowerKW,

      brakePowerKW,

      selectedMotorKW,

      designStatus,

      warnings
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