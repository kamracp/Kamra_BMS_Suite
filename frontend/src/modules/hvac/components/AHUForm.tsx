import type { AHUInput } from "../AHUTypes";

interface Props {
  input: AHUInput;

  setInput: React.Dispatch<
    React.SetStateAction<AHUInput>
  >;
}

const AHUForm = ({
  input,
  setInput,
}: Props) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow">

      <h2 className="text-xl font-bold mb-4">
        AHU Inputs
      </h2>

      <div className="grid grid-cols-2 gap-4">

        <input
          type="number"
          placeholder="Air Flow CFM"
          value={input.airflowCFM}
          onChange={(e) =>
            setInput({
              ...input,
              airflowCFM:
                Number(e.target.value),
            })
          }
        />

        <input
          type="number"
          placeholder="Fresh Air %"
          value={input.freshAirPercent}
          onChange={(e) =>
            setInput({
              ...input,
              freshAirPercent:
                Number(e.target.value),
            })
          }
        />

        <input
          type="number"
          placeholder="Room Temp"
          value={input.roomTemp}
          onChange={(e) =>
            setInput({
              ...input,
              roomTemp:
                Number(e.target.value),
            })
          }
        />

        <input
          type="number"
          placeholder="Outside Temp"
          value={input.outsideTemp}
          onChange={(e) =>
            setInput({
              ...input,
              outsideTemp:
                Number(e.target.value),
            })
          }
        />

      </div>
    </div>
  );
};

export default AHUForm;