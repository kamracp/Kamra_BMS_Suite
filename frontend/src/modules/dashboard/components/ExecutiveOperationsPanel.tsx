 interface ExecutiveOperationsPanelProps{
  plantHealth: number;

  energyScore: number;

  waterScore: number;

  carbonScore: number;

  faultCount: number;

  maintenanceRisk: string;
}

const ExecutiveOperationsPanel  = ({
  plantHealth,
  energyScore,
  waterScore,
  carbonScore,
  faultCount,
  maintenanceRisk,
}:  ExecutiveOperationsPanelProps)  => {
  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-700 mb-8">

      <h2 className="text-2xl font-bold mb-6 text-cyan-400">
        Executive Operations Analytics
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        <div className="bg-slate-800 p-4 rounded-lg">
          <p>Plant Health</p>
          <h3 className="text-3xl font-bold text-green-400">
            {plantHealth}%
          </h3>
        </div>

        <div className="bg-slate-800 p-4 rounded-lg">
          <p>Energy Score</p>
          <h3 className="text-3xl font-bold text-cyan-400">
            {energyScore}%
          </h3>
        </div>

        <div className="bg-slate-800 p-4 rounded-lg">
          <p>Water Score</p>
          <h3 className="text-3xl font-bold text-blue-400">
            {waterScore}%
          </h3>
        </div>

        <div className="bg-slate-800 p-4 rounded-lg">
          <p>Carbon Score</p>
          <h3 className="text-3xl font-bold text-emerald-400">
            {carbonScore}%
          </h3>
        </div>

        <div className="bg-slate-800 p-4 rounded-lg">
          <p>Active Faults</p>
          <h3 className="text-3xl font-bold text-yellow-400">
            {faultCount}
          </h3>
        </div>

        <div className="bg-slate-800 p-4 rounded-lg">
          <p>Maintenance Risk</p>
          <h3 className="text-3xl font-bold text-red-400">
            {maintenanceRisk}
          </h3>
        </div>

      </div>

    </div>
  );
};

export default ExecutiveOperationsPanel;