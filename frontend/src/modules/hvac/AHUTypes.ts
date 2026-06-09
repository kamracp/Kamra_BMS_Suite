export interface AHUInput {
  airflowCFM: number;

  freshAirPercent: number;

  roomTemp: number;

  outsideTemp: number;

  roomRH: number;

  outsideRH: number;
}

export interface AHUResult {
  coolingLoadTR: number;

  heatingLoadKW: number;

  fanPowerKW: number;

  recommendedMotorKW: number;
}