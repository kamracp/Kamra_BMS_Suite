export interface HVACTakeoffInput {
  airflowCFM: number;

  mainDuctLengthM: number;

  branchDuctLengthM: number;

  averageDuctWidthMM: number;

  averageDuctHeightMM: number;

  diffuserCount: number;

  grilleCount: number;

  damperCount: number;
}

export interface HVACTakeoffResult {
  totalDuctLengthM: number;

  ductSurfaceAreaM2: number;

  giSheetQuantityM2: number;

  insulationAreaM2: number;

  flexibleDuctLengthM: number;

  hangerQuantityNos: number;

  diffuserCount: number;

  grilleCount: number;

  damperCount: number;
}

export interface HVACBOQItem {
  item: string;

  unit: string;

  quantity: number;

  rate: number;

  amount: number;
}

export interface HVACEstimationResult {
  materialCost: number;

  fabricationCost: number;

  installationCost: number;

  testingCommissioningCost: number;

  overheadCost: number;

  contractorMargin: number;

  totalProjectCost: number;
}
// ============================
// COOLING LOAD
// ============================

export interface CoolingLoadInput {
  roomName: string;

  roomArea: number;

  roomHeight: number;

  occupancyCount: number;

  lightingLoadWm2: number;

  equipmentLoadKW: number;

  freshAirCFM: number;

  outdoorTemp: number;

  indoorTemp: number;
}

export interface CoolingLoadResult {
  roomVolume: number;

  occupancyLoadKW: number;

  lightingLoadKW: number;

  equipmentLoadKW: number;

  freshAirLoadKW: number;

  totalCoolingLoadKW: number;

  totalCoolingLoadTR: number;

  recommendedAHUCFM: number;

  diversityFactor: number;

  designStatus: string;

  warnings: string[];
}
// =====================================================
// PSYCHROMETRIC TYPES
// =====================================================

export interface PsychrometricInput {
  dryBulbTemp: number;      // °C

  wetBulbTemp: number;      // °C

  relativeHumidity: number; // %

  atmosphericPressure: number; // kPa
}

export interface PsychrometricResult {
  humidityRatio: number;

  enthalpy: number;

  dewPoint: number;

  specificVolume: number;

  sensibleHeatRatio: number;

  designStatus: string;

  warnings: string[];
}
// =====================================================
// DUCT SIZING
// =====================================================

export interface DuctSizingInput {
  airflowCFM: number;

  velocityMPS: number;

  ductLengthM: number;
}

export interface DuctSizingResult {
  airflowCMS: number;

  ductAreaM2: number;

  ductWidthMM: number;

  ductHeightMM: number;

  pressureDropPa: number;

  frictionLossPaPerM: number;

  designStatus: string;

  warnings: string[];
}
// =====================================================
// AHU SELECTION
// =====================================================

export interface AHUSelectionInput {
  airflowCFM: number;

  coolingLoadKW: number;

  enteringAirDB: number;

  leavingAirDB: number;

  fanEfficiency: number;

  filterPressureDropPa: number;

  coilPressureDropPa: number;

  ductPressureDropPa: number;
}

export interface AHUSelectionResult {
  coilCapacityKW: number;

  faceAreaM2: number;

  faceVelocityMPS: number;

  coilRows: number;

  totalStaticPressurePa: number;

  fanPowerKW: number;

  selectedMotorKW: number;

  motorUtilizationPercent: number;

  designScore: number;

  designStatus: string;

  warnings: string[];

  futureChillerLoadTR?: number;

  futureCHWFlowLPM?: number;

  futureEnteringCHWT?: number;

  futureLeavingCHWT?: number;
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
// =====================================================
// CHILLER SELECTION
// =====================================================

export interface ChillerSelectionInput {
  totalCoolingLoadTR: number;

  redundancyFactor: number;

  chillerCOP: number;
}

export interface ChillerSelectionResult {
  totalCoolingLoadTR: number;

  selectedChillerTR: number;

  numberOfChillers: number;

  installedCapacityTR: number;

  chillerPowerKW: number;

  chilledWaterFlowLPM: number;

  designStatus: string;

  warnings: string[];
}
// =====================================================
// PUMP SELECTION
// =====================================================

export interface PumpSelectionInput {
  flowLPM: number;

  headM: number;

  pumpEfficiency: number;
}

export interface PumpSelectionResult {
  flowLPM: number;

  headM: number;

  hydraulicPowerKW: number;

  brakePowerKW: number;

  selectedMotorKW: number;

  designStatus: string;

  warnings: string[];
}