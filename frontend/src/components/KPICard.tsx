interface Props {
  title: string;
  value: string;
}

const KPICard = ({
  title,
  value,
}: Props) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-5 border border-slate-200">
      <h3 className="text-sm text-slate-500">
        {title}
      </h3>

      <p className="text-3xl font-bold text-slate-800 mt-2">
        {value}
      </p>
    </div>
  );
};

export default KPICard;