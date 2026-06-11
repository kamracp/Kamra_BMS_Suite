export interface CostAnalysisInput {
  projectCost: number;

  annualSaving: number;
}

export interface CostAnalysisResult {
  paybackYears: number;

  paybackMonths: number;

  roiPercent: number;
}

export class CostAnalysisEngine {
  static calculate(
    input: CostAnalysisInput
  ): CostAnalysisResult {

    const paybackYears =
      input.projectCost /
      input.annualSaving;

    const paybackMonths =
      paybackYears * 12;

    const roiPercent =
      (
        input.annualSaving /
        input.projectCost
      ) * 100;

    return {
      paybackYears,

      paybackMonths,

      roiPercent
    };
  }
}
