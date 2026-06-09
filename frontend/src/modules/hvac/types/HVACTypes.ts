export interface HVACKPI {
  title: string;
  value: string | number;
  unit?: string;
  status?: "ONLINE" | "OFFLINE" | "WARNING";
}

export interface HVACEquipment {
  name: string;
  status: "ONLINE" | "OFFLINE" | "WARNING";
  healthScore: number;
}

export interface HVACDashboardData {
  ahuStatus: string;
  chillerStatus: string;
  coolingTowerStatus: string;
  pumpStatus: string;

  healthScore: number;

  activeAlarms: number;

  energyConsumption: number;
}