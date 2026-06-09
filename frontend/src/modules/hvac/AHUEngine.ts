import type {
  AHUInput,
  AHUResult,
} from "./AHUTypes";
export const calculateAHU = (
  input: AHUInput
): AHUResult => {

  const deltaT =
    input.outsideTemp -
    input.roomTemp;

  const coolingLoadTR =
    (input.airflowCFM * deltaT * 1.08)
    / 12000;

  const heatingLoadKW =
    coolingLoadTR * 3.517;

  const fanPowerKW =
    input.airflowCFM / 10000;

  const recommendedMotorKW =
    Math.ceil(fanPowerKW * 1.25);

  return {
    coolingLoadTR:
      Number(coolingLoadTR.toFixed(2)),

    heatingLoadKW:
      Number(heatingLoadKW.toFixed(2)),

    fanPowerKW:
      Number(fanPowerKW.toFixed(2)),

    recommendedMotorKW,
  };
};