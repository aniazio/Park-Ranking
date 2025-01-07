import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ParkDetailed } from "../../types";
import Waiting from "../commons/Waiting";
import ParkForm from "./ParkForm";

function ParkSite() {
  const params = useParams();

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

  return (
    <>
      {!isFetching || <Waiting />}
      {isFetching || isEditing || (
        <>
          <h1>{park?.name}</h1>
          <h2>Dzielnica: {park?.district}</h2>
          <h2>Ocena: {park?.rating.toString()}</h2>
          <div>
            <p>Szerokość geograficzna: {park?.latitude.toString()}</p>
            <p>Długość geograficzna: {park?.longitude.toString()}</p>
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
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}
      {isFetching || !isEditing || <ParkForm park={park} />}
    </>
  );
}

export default ParkSite;
