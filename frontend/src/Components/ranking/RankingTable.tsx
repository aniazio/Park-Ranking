import { Park } from "../../types";
import { useEffect, useState } from "react";
import "./RankingTable.module.css";
import { SearchingInput } from "../../types";
import Waiting from "../commons/Waiting";
import { Link } from "react-router-dom";

let parksFromServer: Park[] = [];

function RankingTable({
  searchingInput,
  filter,
}: {
  searchingInput: SearchingInput;
  filter: string | null;
}) {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [parks, setParks] = useState<Park[]>([]);
  const [isError, setError] = useState<boolean>(false);

  useEffect(() => {
    async function fetchParks() {
      setIsFetching(true);
      let url = "http://localhost:8080/parks/ranking";
      if (
        searchingInput.point &&
        searchingInput.weight &&
        searchingInput.weight > 0
      ) {
        url +=
          `?lat=${searchingInput.point.latitude}&` +
          `long=${searchingInput.point.longitude}&` +
          `weight=${searchingInput.weight}`;
      }
      fetch(url)
        .then(async (response) => {
          if (response.status === 200) {
            const resData: Park[] = await response.json();
            parksFromServer = resData;
            setParks(filterParks(resData));
          } else {
            setError(true);
          }
          setIsFetching(false);
        })
        .catch(() => {
          setError(true);
          setIsFetching(false);
        });
    }

    fetchParks();
  }, [searchingInput]);

  function filterParks(unfiltered: Park[]) {
    let filtered: Park[] = [...unfiltered];
    if (filter) {
      filtered = unfiltered.filter(
        (elem) =>
          elem.name.toLowerCase().indexOf(filter) >= 0 ||
          elem.district.toLowerCase().indexOf(filter) >= 0
      );
    }
    return filtered;
  }

  useEffect(() => {
    setParks(filterParks(parksFromServer));
  }, [filter]);

  return (
    <>
      {isFetching && <Waiting />}
      {!isFetching && !isError && (
        <table>
          <thead>
            <tr>
              <th>Nazwa Parku</th>
              <th>Dzielnica</th>
              <th>Ocena</th>
              <th>Odległość</th>
            </tr>
          </thead>
          <tbody>
            {parks.map((park) => (
              <tr key={park.id.toString()}>
                <td>
                  <Link to={"/" + park.id.toString()}>{park.name}</Link>
                </td>
                <td>{park.district}</td>
                <td>{park.rating.toString()}</td>
                <td>{park.distance.dist.toFixed(2).toString()} km</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {isError && <p>Ładowanie danych z serwera nie powiodło się</p>}
    </>
  );
}

export default RankingTable;
