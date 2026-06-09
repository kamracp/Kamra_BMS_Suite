import KPICard from "../../components/KPICard";

const Dashboard = () => {
  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        BMS Dashboard
      </h1>

      <div className="grid grid-cols-4 gap-4">

        <KPICard
          title="Total Equipment"
          value="245"
        />

        <KPICard
          title="Running AHUs"
          value="18"
        />

        <KPICard
          title="Running Pumps"
          value="12"
        />

        <KPICard
          title="Active Alarms"
          value="3"
        />

      </div>

    </div>
  );
};

export default Dashboard;