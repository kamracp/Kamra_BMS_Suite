export interface AnalyticsData {
  plantHealth: number;

  energyScore: number;

  waterScore: number;

  carbonScore: number;

  faultCount: number;

  maintenanceRisk:
    | "LOW"
    | "MEDIUM"
    | "HIGH";

  plantHealthTrend: number[];

  energyTrend: number[];

  waterTrend: number[];

  carbonTrend: number[];
}

export class AnalyticsDataProvider {

  static getAnalyticsData():
    AnalyticsData {

    return {

      plantHealth: 94,

      energyScore: 88,

      waterScore: 92,

      carbonScore: 85,

      faultCount: 3,

      maintenanceRisk: "LOW",

      plantHealthTrend:
        [95, 94, 93, 92, 94],

      energyTrend:
        [12.5, 12.1, 11.8, 11.4, 11.0],

      waterTrend:
        [340, 335, 330, 325, 320],

      carbonTrend:
        [105, 103, 101, 99, 97]
    };
  }
}