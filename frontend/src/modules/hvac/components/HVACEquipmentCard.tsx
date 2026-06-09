import React from "react";

interface HVACEquipmentCardProps {
  equipmentName: string;
  status: "ONLINE" | "OFFLINE" | "WARNING";
  healthScore: number;
}

const HVACEquipmentCard: React.FC<HVACEquipmentCardProps> = ({
  equipmentName,
  status,
  healthScore,
}) => {
  const getStatusColor = () => {
    switch (status) {
      case "ONLINE":
        return "text-green-400";

      case "WARNING":
        return "text-yellow-400";

      case "OFFLINE":
        return "text-red-400";

      default:
        return "text-slate-400";
    }
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-lg">
      <h3 className="text-lg font-semibold text-white mb-3">
        {equipmentName}
      </h3>

      <p className={`font-bold ${getStatusColor()}`}>
        {status}
      </p>

      <p className="text-slate-400 mt-2">
        Health Score: {healthScore}%
      </p>
    </div>
  );
};

export default HVACEquipmentCard;