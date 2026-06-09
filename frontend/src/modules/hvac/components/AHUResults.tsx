import type { AHUResult } from "../AHUTypes";
interface Props {
  result: AHUResult | null;
}

const AHUResults = ({
  result,
}: Props) => {

  if (!result)
    return null;

  return (
    <div className="bg-white p-5 rounded-xl shadow">

      <h2 className="text-xl font-bold mb-4">
        AHU Results
      </h2>

      <p>
        Cooling Load :
        {result.coolingLoadTR} TR
      </p>

      <p>
        Heating Load :
        {result.heatingLoadKW} kW
      </p>

      <p>
        Fan Power :
        {result.fanPowerKW} kW
      </p>

      <p>
        Recommended Motor :
        {result.recommendedMotorKW} kW
      </p>

    </div>
  );
};

export default AHUResults;