import React from "react";

interface HVACKPICardProps {
  title: string;
  value: string | number;
  unit?: string;
}

const HVACKPICard: React.FC<HVACKPICardProps> = ({
  title,
  value,
  unit,
}) => {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-lg">
      <h3 className="text-sm text-slate-400 mb-2">
        {title}
      </h3>

      <div className="text-3xl font-bold text-cyan-400">
        {value}
        {unit && (
          <span className="text-lg ml-1">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
};

export default HVACKPICard;