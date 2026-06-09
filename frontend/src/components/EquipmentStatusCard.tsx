interface Props {
  equipment: string;
  status: string;
}

const EquipmentStatusCard = ({
  equipment,
  status,
}: Props) => {
  return (
    <div className="bg-white border rounded-xl shadow p-4">
      <h3 className="font-semibold">
        {equipment}
      </h3>

      <p className="mt-2 text-green-600 font-bold">
        {status}
      </p>
    </div>
  );
};

export default EquipmentStatusCard;