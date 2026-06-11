
interface HVACTrendPanelProps {
  healthTrend: number[];

  energyTrend: number[];

  waterTrend: number[];

  carbonTrend: number[];
}

const HVACTrendPanel = ({
  healthTrend,
  energyTrend,
  waterTrend,
  carbonTrend,
}: HVACTrendPanelProps) => {
  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">

      <h2 className="text-2xl font-bold mb-6 text-cyan-400">
        HVAC Performance Trends
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div className="bg-slate-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-green-400 mb-2">
            Health Trend
          </h3>

          <div className="text-3xl font-bold">
            {healthTrend.join(" → ")}
          </div>
        </div>

        <div className="bg-slate-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-cyan-400 mb-2">
            Energy Trend
          </h3>

          <div className="text-3xl font-bold">
            {energyTrend.join(" → ")}
          </div>
        </div>

        <div className="bg-slate-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-400 mb-2">
            Water Trend
          </h3>

          <div className="text-3xl font-bold">
            {waterTrend.join(" → ")}
          </div>
        </div>

        <div className="bg-slate-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-emerald-400 mb-2">
            Carbon Trend
          </h3>

          <div className="text-3xl font-bold">
            {carbonTrend.join(" → ")}
          </div>
        </div>

      </div>
    </div>
  );
};

export default HVACTrendPanel;