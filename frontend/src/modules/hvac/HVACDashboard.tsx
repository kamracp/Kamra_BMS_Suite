import { useState } from "react";

import AHUForm from "./components/AHUForm";
import AHUResults from "./components/AHUResults";
import type {
  AHUInput,
  AHUResult,
} from "./AHUTypes";


import {
  calculateAHU,
} from "./AHUEngine";

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
    useState<AHUResult | null>(
      null
    );

  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        AHU Engineering Module
      </h1>

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
        <AHUResults
          result={result}
        />
      </div>

    </div>
  );
};

export default HVACDashboard;