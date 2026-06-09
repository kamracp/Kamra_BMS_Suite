import type {
  HVACBOQItem,
  HVACEstimationResult,
} from "../types/HVACCoreTypes";

export function generateHVACEstimation(
  boqItems: HVACBOQItem[]
): HVACEstimationResult {

  const materialCost =
    boqItems.reduce(
      (sum, item) => sum + item.amount,
      0
    );

  /*
    Industry Assumptions
  */

  const fabricationCost =
    materialCost * 0.10;

  const installationCost =
    materialCost * 0.15;

  const testingCommissioningCost =
    materialCost * 0.03;

  const overheadCost =
    materialCost * 0.05;

  const contractorMargin =
    materialCost * 0.10;

  const totalProjectCost =
    materialCost +
    fabricationCost +
    installationCost +
    testingCommissioningCost +
    overheadCost +
    contractorMargin;

  return {
    materialCost: Number(
      materialCost.toFixed(2)
    ),

    fabricationCost: Number(
      fabricationCost.toFixed(2)
    ),

    installationCost: Number(
      installationCost.toFixed(2)
    ),

    testingCommissioningCost: Number(
      testingCommissioningCost.toFixed(2)
    ),

    overheadCost: Number(
      overheadCost.toFixed(2)
    ),

    contractorMargin: Number(
      contractorMargin.toFixed(2)
    ),

    totalProjectCost: Number(
      totalProjectCost.toFixed(2)
    ),
  };
}