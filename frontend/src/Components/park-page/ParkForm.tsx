import { FormEvent } from "react";
import { ParkDetailed } from "../../types";
import Input from "./Input";
import "./ParkForm.module.css";

function ParkForm({ park }: { park: ParkDetailed | null }) {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input namePl="Nazwa parku" nameEng="name" park={park} />
      <Input namePl="Dzielnica" nameEng="district" park={park} />
      <Input namePl="Ocena" nameEng="rating" park={park} />
      <Input namePl="Szerokość geograficzna" nameEng="latitude" park={park} />
      <Input namePl="Długość geograficzna" nameEng="longitude" park={park} />
      <button type="submit">Zapisz</button>
    </form>
  );
}

export default ParkForm;
