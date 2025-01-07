import { ParkDetailed } from "../../types";

function Input({
  namePl,
  nameEng,
  park,
}: {
  namePl: string;
  nameEng: string;
  park: ParkDetailed | null;
}) {
  return (
    <div>
      <label>{namePl}</label>
      <input
        name={nameEng}
        id={nameEng}
        defaultValue={
          park ? park[nameEng as keyof ParkDetailed]?.toString() : ""
        }
      />
    </div>
  );
}

export default Input;
