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