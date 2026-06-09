interface Props {
  title: string;
  value: string | number;
  unit?: string;
  status?: string;
}

const HVACCommercialCard = ({
  title,
  value,
  unit,
  status,
}: Props) => {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-5 shadow-lg">
      <p className="text-slate-400 text-sm">{title}</p>

      <h3 className="text-2xl font-bold text-cyan-400 mt-2">
        {value} {unit}
      </h3>

      {status && (
        <p className="text-sm text-green-400 mt-2">
          {status}
        </p>
      )}
    </div>
  );
};

export default HVACCommercialCard;