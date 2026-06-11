export const EngineeringConstants = {
  // Physics

  GRAVITY: 9.81,

  // Atmospheric

  ATMOSPHERIC_PRESSURE_KPA: 101.325,

  // Densities

  WATER_DENSITY: 1000,

  AIR_DENSITY: 1.2,

  // Specific Heat

  WATER_CP: 4.186,

  AIR_CP: 1.005,

  // HVAC

  TR_TO_KW: 3.517,

  KW_TO_TR: 0.2843,

  CFM_TO_M3HR: 1.699,

  M3HR_TO_CFM: 0.5886,

  // Energy

  KWH_TO_MJ: 3.6,

  MJ_TO_KWH: 0.2778,

  // Electrical

  HP_TO_KW: 0.746,

  KW_TO_HP: 1.341,

  // Thermal

  BTUHR_TO_KW: 0.000293,

  KW_TO_BTUHR: 3412,

  // Equipment Efficiencies

  MOTOR_EFFICIENCY: 0.90,

  PREMIUM_MOTOR_EFFICIENCY: 0.95,

  FAN_EFFICIENCY: 0.70,

  PUMP_EFFICIENCY: 0.75,

  CHILLER_EFFICIENCY: 0.85,

  BOILER_EFFICIENCY: 0.85,

  PA_TO_MMWC: 0.10197,

  MMWC_TO_PA: 9.80665,

  LPS_TO_M3HR: 3.6,

  M3HR_TO_LPS: 0.2778,

} as const;