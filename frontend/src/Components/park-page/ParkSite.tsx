import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ParkDetailed } from "../../types";
import Waiting from "../commons/Waiting";
import ParkForm from "./ParkForm";
import Map, { defaultLocation } from "../commons/Map";

function ParkSite() {
  const params = useParams();
  const navigate = useNavigate();
  const deleteButton = useRef<HTMLButtonElement | null>(null);

  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [park, setPark] = useState<ParkDetailed | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    async function fetchPark() {
      setIsFetching(true);
      let url = "http://localhost:8080/parks/detailed/" + params.id;

      const response = await fetch(url);
      const resData: ParkDetailed = await response.json();
      setPark(resData);
      setIsFetching(false);
    }

    fetchPark();
  }, []);

  function handleDelete() {
    deleteButton.current?.setAttribute("disabled", "true");

    let url = "http://localhost:8080/parks/detailed/" + params.id;

    fetch(url, {
      method: "DELETE",
    })
      .then(() => {
        navigate("/");
      })
      .finally(() => {
        deleteButton.current?.removeAttribute("disabled");
      });
  }

  return (
    <>
      {!isFetching || <Waiting />}
      {isFetching || isEditing || (
        <>
          <h1>{park?.name}</h1>
          <h2>Dzielnica: {park?.district}</h2>
          <h2>Ocena: {park?.rating.toString()}</h2>
          <div>
            <Map
              markerPosition={
                park ? [park.latitude, park.longitude] : defaultLocation
              }
              setMarkerPosition={(value) => {}}
              changeError={() => {}}
            />
          </div>
          <h4>Plusy:</h4>
          <ul>
            {park?.pluses.map((plus) => (
              <li key={plus.id.toString()}>{plus.description}</li>
            ))}
          </ul>
          <h4>Minusy:</h4>
          <ul>
            {park?.minuses.map((minus) => (
              <li key={minus.id.toString()}>{minus.description}</li>
            ))}
          </ul>
          <button onClick={() => setIsEditing(true)}>Edytuj</button>
          <button className="delete" onClick={handleDelete} ref={deleteButton}>
            Usuń
          </button>
        </>
      )}
      {isFetching || !isEditing || (
        <ParkForm park={park} setEditing={setIsEditing} setPark={setPark} />
      )}
    </>
  );
}

export default ParkSite;
