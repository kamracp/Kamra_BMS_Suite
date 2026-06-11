import type {
  FanSelectionInput,
  FanSelectionResult
} from "../../types/HVACCoreTypes";

export class FanSelectionEngine {

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
    input: FanSelectionInput
  ): FanSelectionResult {

    const fanPowerKW =
      (
        input.airflowCMS *
        input.totalStaticPressurePa
      ) /
      (
        input.fanEfficiency * 1000
      );

    const selectedMotorKW =
      this.selectMotor(fanPowerKW);

    const motorUtilizationPercent =
      (
        fanPowerKW /
        selectedMotorKW
      ) * 100;

    return {
      fanPowerKW,

      selectedMotorKW,

      motorUtilizationPercent
    };
  }

  private static selectMotor(
    requiredKW: number
  ): number {

    for (const motor of this.MOTOR_DATABASE) {

      if (motor >= requiredKW) {
        return motor;
      }

    }

    return 250;
  }
}