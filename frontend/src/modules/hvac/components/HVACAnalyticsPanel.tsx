interface HVACAnalyticsPanelProps {
  healthScore: number;

  energyScore: number;

  waterScore: number;

  carbonScore: number;

  faultCount: number;

  maintenanceRisk: string;
}

const HVACAnalyticsPanel = ({
  healthScore,
  energyScore,
  waterScore,
  carbonScore,
  faultCount,
  maintenanceRisk,
}: HVACAnalyticsPanelProps) => {
  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">

      <h2 className="text-2xl font-bold mb-6 text-cyan-400">
        HVAC Analytics Intelligence
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        <div className="bg-slate-800 p-4 rounded-lg">
          <p className="text-slate-400">
            Health Score
          </p>
          <h3 className="text-3xl font-bold text-green-400">
            {healthScore}%
          </h3>
        </div>

        <div className="bg-slate-800 p-4 rounded-lg">
          <p className="text-slate-400">
            Energy Score
          </p>
          <h3 className="text-3xl font-bold text-cyan-400">
            {energyScore}%
          </h3>
        </div>

        <div className="bg-slate-800 p-4 rounded-lg">
          <p className="text-slate-400">
            Water Score
          </p>
          <h3 className="text-3xl font-bold text-blue-400">
            {waterScore}%
          </h3>
        </div>

        <div className="bg-slate-800 p-4 rounded-lg">
          <p className="text-slate-400">
            Carbon Score
          </p>
          <h3 className="text-3xl font-bold text-emerald-400">
            {carbonScore}%
          </h3>
        </div>

        <div className="bg-slate-800 p-4 rounded-lg">
          <p className="text-slate-400">
            Active Faults
          </p>
          <h3 className="text-3xl font-bold text-yellow-400">
            {faultCount}
          </h3>
        </div>

        <div className="bg-slate-800 p-4 rounded-lg">
          <p className="text-slate-400">
            Maintenance Risk
          </p>
          <h3 className="text-3xl font-bold text-red-400">
            {maintenanceRisk}
          </h3>
        </div>

      </div>
    </div>
  );
};

export default HVACAnalyticsPanel;