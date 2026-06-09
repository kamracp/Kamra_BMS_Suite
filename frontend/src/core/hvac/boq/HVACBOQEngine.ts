import type {
  HVACBOQItem,
  HVACTakeoffResult,
} from "../types/HVACCoreTypes";

export function generateHVACBOQ(
  takeoff: HVACTakeoffResult
): HVACBOQItem[] {

  return [

    {
      item: "GI Duct",
      unit: "Sq.m",
      quantity: Number(
        takeoff.giSheetQuantityM2.toFixed(2)
      ),
      rate: 1200,
      amount: Number(
        (
          takeoff.giSheetQuantityM2 * 1200
        ).toFixed(2)
      ),
    },

    {
      item: "Duct Insulation",
      unit: "Sq.m",
      quantity: Number(
        takeoff.insulationAreaM2.toFixed(2)
      ),
      rate: 450,
      amount: Number(
        (
          takeoff.insulationAreaM2 * 450
        ).toFixed(2)
      ),
    },

    {
      item: "Flexible Duct",

      unit: "Meter",

      quantity: Number(
        takeoff.flexibleDuctLengthM.toFixed(2)
      ),

      rate: 300,

      amount: Number(
        (
          takeoff.flexibleDuctLengthM * 300
        ).toFixed(2)
      ),
    },

    {
      item: "Hanger Supports",

      unit: "Nos",

      quantity:
        takeoff.hangerQuantityNos,

      rate: 150,

      amount: Number(
        (
          takeoff.hangerQuantityNos * 150
        ).toFixed(2)
      ),
    },

    {
      item: "Diffusers",

      unit: "Nos",

      quantity:
        takeoff.diffuserCount,

      rate: 1800,

      amount: Number(
        (
          takeoff.diffuserCount * 1800
        ).toFixed(2)
      ),
    },

    {
      item: "Grilles",

      unit: "Nos",

      quantity:
        takeoff.grilleCount,

      rate: 1200,

      amount: Number(
        (
          takeoff.grilleCount * 1200
        ).toFixed(2)
      ),
    },

    {
      item: "Volume Control Dampers",

      unit: "Nos",

      quantity:
        takeoff.damperCount,

      rate: 2500,

      amount: Number(
        (
          takeoff.damperCount * 2500
        ).toFixed(2)
      ),
    },
  ];
}