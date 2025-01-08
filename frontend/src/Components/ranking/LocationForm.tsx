import { FormEvent, useState } from "react";
import { Point, SearchingInput } from "../../types";
import Map, { defaultLocation } from "../commons/Map";
import "./LocationForm.module.css";
import { LatLngTuple } from "leaflet";

function LocationForm({
  updateState,
}: {
  updateState: (newState: SearchingInput) => void;
}) {
  const [position, setPosition] = useState<LatLngTuple>(defaultLocation);

  function renderNewRanking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    const point: Point = {
      latitude: +(position[0] || 0),
      longitude: +(position[1] || 0),
    };
    const weight: number = +(fd.get("weight") || 0);
    updateState({ point, weight });
  }

  return (
    <>
      <h5>
        Wprowadź swoją lokalizację, żeby uwzględnić ją w wyświetlanym rankingu
      </h5>
      <Map markerPosition={position} setMarkerPosition={setPosition} />
      <form onSubmit={(e) => renderNewRanking(e)}>
        {/* <label htmlFor="latitude">Szerokość geograficzna</label>
        <input type="text" id="latitude" name="latitude"></input>
        <label htmlFor="longitude">Długość geograficzna</label>
        <input type="text" id="longitude" name="longitude"></input> */}
        <label htmlFor="weight">Waga</label>
        <input type="text" id="weight" name="weight"></input>
        <button type="submit">Zastosuj</button>
      </form>
    </>
  );
}

export default LocationForm;
