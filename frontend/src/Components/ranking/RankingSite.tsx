import LocationForm from "./LocationForm";
import RankingTable from "./RankingTable";
import "./RankingSite.module.css";
import { useState } from "react";
import { SearchingInput } from "../../types";

function RankingSite() {
  const [location, setLocation] = useState<SearchingInput>({
    point: undefined,
    weight: undefined,
  });

  function updateState(newState: SearchingInput) {
    setLocation(newState);
  }

  return (
    <>
      <h1>Ranking Parków</h1>
      <LocationForm updateState={updateState} />

      <RankingTable searchingInput={location} />
    </>
  );
}

export default RankingSite;
