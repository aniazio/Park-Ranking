import LocationForm from "./LocationForm";
import RankingTable from "./RankingTable";
import "./RankingSite.module.css";
import { useState } from "react";
import { SearchingInput } from "../../types";
import ParkFilter from "./ParkFilter";

function RankingSite() {
  const [location, setLocation] = useState<SearchingInput>({
    point: undefined,
    weight: undefined,
  });
  const [filter, setFilter] = useState<string | null>(null);

  function updateState(newState: SearchingInput) {
    setLocation(newState);
  }

  return (
    <>
      <h1>Ranking Parków</h1>
      <LocationForm updateState={updateState} />
      <ParkFilter filter={filter} setFilter={setFilter} />
      <RankingTable searchingInput={location} filter={filter} />
    </>
  );
}

export default RankingSite;
