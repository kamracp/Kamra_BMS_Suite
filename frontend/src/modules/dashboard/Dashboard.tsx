import KPICard from "../../components/KPICard";
import AlarmCard from "../../components/AlarmCard";
import EquipmentStatusCard from "../../components/EquipmentStatusCard";

const Dashboard = () => {
  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        BMS Dashboard
      </h1>

      {/* KPI Section */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

        <KPICard title="Total Equipment" value="245" />

        <KPICard title="Running AHUs" value="18" />

        <KPICard title="Running Pumps" value="12" />

        <KPICard title="Active Alarms" value="3" />

        <KPICard title="Online Controllers" value="42" />

        <KPICard title="Running Chillers" value="4" />

        <KPICard title="Energy Today" value="12.5 MWh" />

        <KPICard title="Water Usage" value="325 m³" />

      </div>

      {/* Alarm + Equipment Panels */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Alarm Panel */}

        <div>

          <h2 className="text-2xl font-bold mb-4">
            Active Alarms
          </h2>

          <div className="space-y-3">

            <AlarmCard
              level="CRITICAL"
              message="Fire Pump Fault"
            />

            <AlarmCard
              level="MAJOR"
              message="AHU-03 Filter Dirty"
            />

            <AlarmCard
              level="MINOR"
              message="Room Temperature High"
            />

          </div>

        </div>

        {/* Equipment Status */}

        <div>

          <h2 className="text-2xl font-bold mb-4">
            Equipment Status
          </h2>

          <div className="space-y-3">

            <EquipmentStatusCard
              equipment="AHU-01"
              status="RUNNING"
            />

            <EquipmentStatusCard
              equipment="PUMP-01"
              status="RUNNING"
            />

            <EquipmentStatusCard
              equipment="CHILLER-01"
              status="RUNNING"
            />

          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;