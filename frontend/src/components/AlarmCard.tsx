interface Props {
  level: string;
  message: string;
}

const AlarmCard = ({
  level,
  message,
}: Props) => {
  return (
    <div className="bg-red-50 border border-red-300 rounded-xl p-4">
      <h3 className="font-bold text-red-600">
        {level}
      </h3>

      <p className="mt-2 text-slate-700">
        {message}
      </p>
    </div>
  );
};

export default AlarmCard;