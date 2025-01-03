import { Park } from "../../types";
import { useEffect, useState } from "react";
import "./RankingTable.module.css";
import { SearchingInput } from "../../types";
import { Oval } from "react-loader-spinner";

function RankingTable({ searchingInput }: { searchingInput: SearchingInput }) {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [parks, setParks] = useState<Park[]>([]);

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
      const response = await fetch(url);
      const resData: Park[] = await response.json();
      setParks(resData);
      setIsFetching(false);
    }

    fetchParks();
  }, [searchingInput]);

  return (
    <>
      {!isFetching || (
        <Oval
          visible={true}
          height="80"
          width="80"
          ariaLabel="oval-loading"
          wrapperStyle={{ margin: "auto", width: "fit-content" }}
          wrapperClass=""
        />
      )}
      {isFetching || (
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
                <td>{park.name}</td>
                <td>{park.district}</td>
                <td>{park.rating.toString()}</td>
                <td>{park.distance.dist.toFixed(2).toString()} km</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default RankingTable;
