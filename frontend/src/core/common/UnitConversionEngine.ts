import { EngineeringConstants } from "./EngineeringConstants";

export class UnitConversionEngine {

  static trToKW(tr: number): number {
    return tr * EngineeringConstants.TR_TO_KW;
  }

  static kwToTR(kw: number): number {
    return kw * EngineeringConstants.KW_TO_TR;
  }

  static cfmToM3Hr(cfm: number): number {
    return cfm * EngineeringConstants.CFM_TO_M3HR;
  }

  static m3HrToCFM(m3hr: number): number {
    return m3hr * EngineeringConstants.M3HR_TO_CFM;
  }

  static hpToKW(hp: number): number {
    return hp * EngineeringConstants.HP_TO_KW;
  }

  static kwToHP(kw: number): number {
    return kw * EngineeringConstants.KW_TO_HP;
  }

  static paToMMWC(pa: number): number {
    return pa * EngineeringConstants.PA_TO_MMWC;
  }

  static mmwcToPa(mmwc: number): number {
    return mmwc * EngineeringConstants.MMWC_TO_PA;
  }

  static cToF(c: number): number {
    return (c * 9) / 5 + 32;
  }

  static fToC(f: number): number {
    return ((f - 32) * 5) / 9;
  }

  static kwhToMJ(kwh: number): number {
    return kwh * EngineeringConstants.KWH_TO_MJ;
  }

  static mjToKwh(mj: number): number {
    return mj * EngineeringConstants.MJ_TO_KWH;
  }

  static lpsToM3Hr(lps: number): number {
    return lps * EngineeringConstants.LPS_TO_M3HR;
  }

  static m3HrToLps(m3hr: number): number {
    return m3hr * EngineeringConstants.M3HR_TO_LPS;
  }

}