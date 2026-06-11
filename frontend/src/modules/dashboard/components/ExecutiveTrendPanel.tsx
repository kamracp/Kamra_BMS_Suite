interface ExecutiveTrendPanelProps {
  plantHealthTrend: number[];

  energyTrend: number[];

  waterTrend: number[];

  carbonTrend: number[];
}

const ExecutiveTrendPanel = ({
  plantHealthTrend,
  energyTrend,
  waterTrend,
  carbonTrend,
}: ExecutiveTrendPanelProps) => {
  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-700 mb-8">

      <h2 className="text-2xl font-bold mb-6 text-cyan-400">
        Executive Performance Trends
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div className="bg-slate-800 rounded-lg p-4">
          <p className="text-slate-400">
            Plant Health Trend
          </p>

          <h3 className="text-2xl font-bold text-green-400 mt-2">
            {plantHealthTrend.join(" → ")}
          </h3>
        </div>

        <div className="bg-slate-800 rounded-lg p-4">
          <p className="text-slate-400">
            Energy Trend
          </p>

          <h3 className="text-2xl font-bold text-cyan-400 mt-2">
            {energyTrend.join(" → ")}
          </h3>
        </div>

        <div className="bg-slate-800 rounded-lg p-4">
          <p className="text-slate-400">
            Water Trend
          </p>

          <h3 className="text-2xl font-bold text-blue-400 mt-2">
            {waterTrend.join(" → ")}
          </h3>
        </div>

        <div className="bg-slate-800 rounded-lg p-4">
          <p className="text-slate-400">
            Carbon Trend
          </p>

          <h3 className="text-2xl font-bold text-emerald-400 mt-2">
            {carbonTrend.join(" → ")}
          </h3>
        </div>

      </div>

    </div>
  );
};

export default ExecutiveTrendPanel;