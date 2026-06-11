import { useState } from "react";

import AHUForm from "../components/AHUForm";
import AHUResults from "../components/AHUResults";
import HVACKPICard from "../components/HVACKPICard";
import HVACEquipmentCard from "../components/HVACEquipmentCard";

import type {
  AHUInput,
  AHUResult,
} from "../AHUTypes";

import {
  calculateAHU,
} from "../AHUEngine";
import HVACCommercialCard from "../components/HVACCommercialCard";
import HVACAnalyticsPanel from "../components/HVACAnalyticsPanel";
import { HVACHealthScoreEngine } from "../../../core/hvac/calculations/analytics/HVACHealthScoreEngine";

import { EnergyAnalyticsEngine } from "../../../core/hvac/calculations/analytics/EnergyAnalyticsEngine";

import { WaterAnalyticsEngine } from "../../../core/hvac/calculations/analytics/WaterAnalyticsEngine";

import { CarbonAnalyticsEngine } from "../../../core/hvac/calculations/analytics/CarbonAnalyticsEngine";

import { FaultDetectionEngine } from "../../../core/hvac/calculations/analytics/FaultDetectionEngine";

import { PredictiveMaintenanceEngine } from "../../../core/hvac/calculations/analytics/PredictiveMaintenanceEngine";
import HVACTrendPanel
from "../components/HVACTrendPanel";
const HVACDashboard = () => {
  const [input, setInput] =
    useState<AHUInput>({
      airflowCFM: 10000,
      freshAirPercent: 20,
      roomTemp: 24,
      outsideTemp: 40,
      roomRH: 50,
      outsideRH: 70,
    });

  const [result, setResult] =
    useState<AHUResult | null>(null);
const healthResult =
  HVACHealthScoreEngine.calculate({
    chillerEfficiency: 92,
    pumpEfficiency: 85,
    fanEfficiency: 88,
    coolingTowerPerformance: 90,
    heatPumpCOP: 4.2,
  });

const energyResult =
  EnergyAnalyticsEngine.calculate({
    coolingLoadTR: 300,
    cop: 5.5,
    operatingHoursPerDay: 20,
    electricityTariff: 8,
    daysPerYear: 330,
  });

const waterResult =
  WaterAnalyticsEngine.calculate({
    makeupWaterM3Hr: 3.5,
    operatingHoursPerDay: 20,
    waterTariff: 60,
    daysPerYear: 330,
  });

const carbonResult =
  CarbonAnalyticsEngine.calculate({
    annualElectricityKWh:
      energyResult.annualEnergyKWh,
  });

const faultResult =
  FaultDetectionEngine.calculate({
    chillerCOP: 5.5,
    pumpEfficiency: 85,
    fanEfficiency: 88,
    coolingTowerApproachC: 4,
    heatPumpCOP: 4.2,
  });

const maintenanceResult =
  PredictiveMaintenanceEngine.calculate({
    equipmentType: "Chiller",
    runtimeHours: 25000,
    designLifeHours: 60000,
    faultCount: faultResult.faultCount,
    healthScore:
      healthResult.healthScore,
  });
 const healthTrend =
  [95, 94, 93, 92, 94];

const energyTrend =
  [1250, 1220, 1180, 1160, 1140];

const waterTrend =
  [85, 84, 82, 81, 80];

const carbonTrend =
  [100, 98, 96, 95, 94];
 
  return (
    <div className="p-6 space-y-8">

      <div>
        <h1 className="text-3xl font-bold text-cyan-400">
          Kamra BMS Suite - HVAC Dashboard
        </h1>

        <p className="text-slate-400 mt-2">
          Enterprise HVAC Monitoring & Engineering Platform
        </p>
      </div>

      {/* KPI SECTION */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

        <HVACKPICard
          title="AHU Status"
          value="ONLINE"
        />

        <HVACKPICard
          title="Chiller Status"
          value="ONLINE"
        />

        <HVACKPICard
          title="Cooling Tower Status"
          value="ONLINE"
        />

        <HVACKPICard
          title="Pump Status"
          value="WARNING"
        />

        <HVACKPICard
          title="HVAC Health Score"
          value={94}
          unit="%"
        />

        <HVACKPICard
          title="Active Alarms"
          value={2}
        />

        <HVACKPICard
          title="Energy Consumption"
          value={1250}
          unit="kWh"
        />
<HVACKPICard
  title="Water Consumption"
  value={18500}
  unit="m³/yr"
/>

<HVACKPICard
  title="Carbon Emissions"
  value={1020}
  unit="tCO₂"
/>

<HVACKPICard
  title="Fault Count"
  value={3}
/>

<HVACKPICard
  title="Maintenance Risk"
  value="LOW"
/>
      </div>

      {/* EQUIPMENT SECTION */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

        <HVACEquipmentCard
          equipmentName="AHU-01"
          status="ONLINE"
          healthScore={96}
        />

        <HVACEquipmentCard
          equipmentName="CHILLER-01"
          status="ONLINE"
          healthScore={93}
        />

        <HVACEquipmentCard
          equipmentName="CT-01"
          status="ONLINE"
          healthScore={91}
        />

        <HVACEquipmentCard
          equipmentName="PUMP-01"
          status="WARNING"
          healthScore={82}
        />
<HVACAnalyticsPanel
  healthScore={
    healthResult.healthScore
  }
  energyScore={
    energyResult.energyScore
  }
  waterScore={
    waterResult.waterEfficiencyScore
  }
  carbonScore={
    carbonResult.carbonScore
  }
  faultCount={
    faultResult.faultCount
  }
  maintenanceRisk={
    maintenanceResult.maintenanceRisk
  }
/>

      </div>
<HVACTrendPanel
  healthTrend={healthTrend}
  energyTrend={energyTrend}
  waterTrend={waterTrend}
  carbonTrend={carbonTrend}
/>
      {/* AHU ENGINEERING */}

      <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">

        <h2 className="text-2xl font-bold mb-4 text-cyan-400">
          AHU Engineering Module
        </h2>

        <AHUForm
          input={input}
          setInput={setInput}
        />

        <button
          className="bg-cyan-600 text-white px-5 py-2 rounded mt-4"
          onClick={() =>
            setResult(
              calculateAHU(input)
            )
          }
        >
          Calculate AHU
        </button>

        <div className="mt-6">
          <AHUResults result={result} />
        </div>

      </div>
      {/* HVAC COMMERCIAL INTELLIGENCE */}

      <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
        <h2 className="text-2xl font-bold mb-4 text-cyan-400">
          HVAC Commercial Intelligence
        </h2>

        <p className="text-slate-400 mb-6">
          Design to Takeoff, BOQ, Estimation, Tender and BIM readiness.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <HVACCommercialCard
            title="Duct Takeoff"
            value={245}
            unit="m²"
            status="Quantity Ready"
          />

          <HVACCommercialCard
            title="BOQ Items"
            value={18}
            unit="Items"
            status="BOQ Generated"
          />

          <HVACCommercialCard
            title="Estimated Value"
            value="₹18.5"
            unit="Lakh"
            status="Cost Ready"
          />

          <HVACCommercialCard
            title="Tender Package"
            value="READY"
            status="Commercial Ready"
          />

          <HVACCommercialCard
            title="BIM Integration"
            value="PLANNED"
            status="IFC / Revit Future"
          />
        </div>
      </div>
    </div>
  );
};

export default HVACDashboard;