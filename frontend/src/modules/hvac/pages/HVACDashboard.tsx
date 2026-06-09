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

      </div>

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

    </div>
  );
};

export default HVACDashboard;