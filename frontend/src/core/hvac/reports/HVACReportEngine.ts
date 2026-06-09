import type {
  HVACBOQItem,
  HVACEstimationResult,
  HVACTakeoffResult,
} from "../types/HVACCoreTypes";

export interface HVACReportData {
  projectName: string;
  generatedOn: string;

  takeoff: HVACTakeoffResult;

  boq: HVACBOQItem[];

  estimation: HVACEstimationResult;
}

export function generateHVACReport(
  report: HVACReportData
): string {

  return `
========================================
KAMRA HVAC ENGINEERING REPORT
========================================

Project:
${report.projectName}

Generated On:
${report.generatedOn}

----------------------------------------
TAKEOFF SUMMARY
----------------------------------------

Total Duct Length:
${report.takeoff.totalDuctLengthM.toFixed(2)} m

Duct Surface Area:
${report.takeoff.ductSurfaceAreaM2.toFixed(2)} m²

GI Sheet Quantity:
${report.takeoff.giSheetQuantityM2.toFixed(2)} m²

Insulation Area:
${report.takeoff.insulationAreaM2.toFixed(2)} m²

Flexible Duct:
${report.takeoff.flexibleDuctLengthM.toFixed(2)} m

Hangers:
${report.takeoff.hangerQuantityNos}

----------------------------------------
BOQ SUMMARY
----------------------------------------

Total BOQ Items:
${report.boq.length}

----------------------------------------
ESTIMATION SUMMARY
----------------------------------------

Material Cost:
₹${report.estimation.materialCost.toFixed(2)}

Fabrication Cost:
₹${report.estimation.fabricationCost.toFixed(2)}

Installation Cost:
₹${report.estimation.installationCost.toFixed(2)}

T&C Cost:
₹${report.estimation.testingCommissioningCost.toFixed(2)}

Overheads:
₹${report.estimation.overheadCost.toFixed(2)}

Contractor Margin:
₹${report.estimation.contractorMargin.toFixed(2)}

TOTAL PROJECT COST:
₹${report.estimation.totalProjectCost.toFixed(2)}

========================================
END OF REPORT
========================================
`;
}