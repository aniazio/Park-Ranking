import { FormEvent, useEffect, useRef, useState } from "react";
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
  const [numberOfErrors, setNumberOfErrors] = useState<number>(0);
  const submitButton = useRef<HTMLButtonElement | null>(null);

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

  function changeError(increase: boolean) {
    const current = numberOfErrors;
    if (increase) {
      setNumberOfErrors(current + 1);
    } else {
      setNumberOfErrors(current - 1);
    }
  }

  function validateWeight(event: React.FocusEvent<HTMLInputElement>) {
    const elem = event.target;
    if (isNaN(+elem.value) || +elem.value < 0 || +elem.value > 1) {
      if (!elem.classList.contains("wrongInput")) {
        elem.setAttribute("class", "wrongInput");
        changeError(true);
      }
    } else {
      if (elem.classList.contains("wrongInput")) {
        elem.removeAttribute("class");
        changeError(false);
      }
    }
  }

  useEffect(() => {
    if (numberOfErrors > 0) {
      submitButton.current?.setAttribute("disabled", "true");
    } else {
      submitButton.current?.removeAttribute("disabled");
    }
  }, [numberOfErrors]);

  return (
    <>
      <h5>
        Wprowadź swoją lokalizację, żeby uwzględnić ją w wyświetlanym rankingu
      </h5>
      <Map
        markerPosition={position}
        setMarkerPosition={setPosition}
        changeError={changeError}
      />
      <form onSubmit={(e) => renderNewRanking(e)}>
        {/* <label htmlFor="latitude">Szerokość geograficzna</label>
        <input type="text" id="latitude" name="latitude"></input>
        <label htmlFor="longitude">Długość geograficzna</label>
        <input type="text" id="longitude" name="longitude"></input> */}
        <label htmlFor="weight">Waga</label>
        <input
          type="text"
          id="weight"
          name="weight"
          onBlur={validateWeight}
        ></input>
        <button type="submit" ref={submitButton}>
          Zastosuj
        </button>
      </form>
    </>
  );
}

export default LocationForm;
