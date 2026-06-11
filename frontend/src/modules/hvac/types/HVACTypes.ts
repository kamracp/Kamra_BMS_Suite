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
// =====================================================
// FAN SELECTION
// =====================================================

export interface FanSelectionInput {
  airflowCMS: number;

  totalStaticPressurePa: number;

  fanEfficiency: number;
}

export interface FanSelectionResult {
  fanPowerKW: number;

  selectedMotorKW: number;

  motorUtilizationPercent: number;
}