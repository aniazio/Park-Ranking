import { FormEvent, useEffect, useRef, useState } from "react";
import { ParkDetailed } from "../../types";
import Input from "./Input";
import "./ParkForm.module.css";
import FeaturesInput from "./FeaturesInput";
import { useNavigate } from "react-router-dom";
import { LatLngTuple } from "leaflet";
import { defaultLocation } from "../commons/Map";
import Map from "../commons/Map";

type stateInputsCount = {
  pluses: number;
  minuses: number;
  plusesDescriptions: string[];
  minusesDescriptions: string[];
};

function ParkForm({
  park,
  setEditing,
  setPark,
}: {
  park: ParkDetailed | null;
  setEditing: (value: boolean) => void;
  setPark: (value: ParkDetailed | null) => void;
}) {
  const navigate = useNavigate();
  const submitButton = useRef<HTMLButtonElement | null>(null);
  const [numberOfErrors, setNumberOfErrors] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [position, setPosition] = useState<LatLngTuple>(
    park ? [park.latitude, park.longitude] : defaultLocation
  );
  const [inputsCount, setInputsCount] = useState<stateInputsCount>({
    pluses: park ? park.pluses.length + 1 : 1,
    minuses: park ? park.minuses.length + 1 : 1,
    plusesDescriptions: (park
      ? park.pluses.map((elem) => elem.description)
      : []
    ).concat(""),
    minusesDescriptions: (park
      ? park.minuses.map((elem) => elem.description)
      : []
    ).concat(""),
  });

  function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    submitButton.current?.setAttribute("disabled", "true");

    const fd = new FormData(event.currentTarget);

    const plusesFiltered = inputsCount.plusesDescriptions
      .map((elem) => elem.trim())
      .filter((elem) => elem !== "");
    const minusesFiltered = inputsCount.minusesDescriptions
      .map((elem) => elem.trim())
      .filter((elem) => elem !== "");

    const data = Object.assign(Object.fromEntries(fd.entries()), {
      latitude: position[0],
      longitude: position[1],
      pluses: plusesFiltered,
      minuses: minusesFiltered,
    });

    const method = park ? "PUT" : "POST";
    let url = "http://localhost:8080/parks/detailed";
    if (park) {
      url += "/" + park.id.toString();
    }

    fetch(url, {
      method: method,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        if (response.status === 200) {
          setError("");
          const responseData: ParkDetailed = await response.json();
          navigate("/" + responseData.id);
          setPark(responseData);
          setEditing(false);
        } else {
          setError(
            "Zgłoszenie nie powiodło się. Sprawdź poprawność formularza i wyślij ponownie."
          );
        }
      })
      .finally(() => {
        submitButton.current?.removeAttribute("disabled");
      });
  }

  function changeCountPluses(sign: number, newPluses: string[]) {
    const newState: stateInputsCount = {
      pluses: inputsCount.pluses + 1 * sign,
      minuses: inputsCount.minuses,
      plusesDescriptions: newPluses,
      minusesDescriptions: inputsCount.minusesDescriptions,
    };
    setInputsCount(newState);
  }

  function changeCountMinuses(sign: number, newMinuses: string[]) {
    const newState: stateInputsCount = {
      pluses: inputsCount.pluses,
      minuses: inputsCount.minuses + 1 * sign,
      plusesDescriptions: inputsCount.plusesDescriptions,
      minusesDescriptions: newMinuses,
    };
    setInputsCount(newState);
  }

  useEffect(() => {
    if (numberOfErrors > 0) {
      submitButton.current?.setAttribute("disabled", "true");
    } else {
      submitButton.current?.removeAttribute("disabled");
    }
  }, [numberOfErrors]);

  function changeError(increase: boolean) {
    const current = numberOfErrors;
    if (increase) {
      setNumberOfErrors(current + 1);
    } else {
      setNumberOfErrors(current - 1);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        namePl="Nazwa parku"
        nameEng="name"
        park={park}
        changeError={changeError}
      />
      <Input
        namePl="Dzielnica"
        nameEng="district"
        park={park}
        changeError={changeError}
      />
      <Input
        namePl="Ocena"
        nameEng="rating"
        park={park}
        changeError={changeError}
      />
      {/* <Input namePl="Szerokość geograficzna" nameEng="latitude" park={park} />
      <Input namePl="Długość geograficzna" nameEng="longitude" park={park} /> */}
      <Map
        markerPosition={position}
        setMarkerPosition={setPosition}
        changeError={changeError}
      />
      <FeaturesInput
        isPositive={true}
        inputsCount={inputsCount.pluses}
        set={inputsCount.plusesDescriptions}
        changeCount={changeCountPluses}
      />
      <FeaturesInput
        isPositive={false}
        inputsCount={inputsCount.minuses}
        set={inputsCount.minusesDescriptions}
        changeCount={changeCountMinuses}
      />
      <button type="submit" ref={submitButton}>
        Zapisz
      </button>
      {error.length !== 0 && <p>{error}</p>}
    </form>
  );
}

export default ParkForm;
