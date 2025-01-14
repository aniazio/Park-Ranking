import { LatLngTuple } from "leaflet";
import { MapContainer } from "react-leaflet/MapContainer";
import { Marker } from "react-leaflet/Marker";
import { TileLayer } from "react-leaflet/TileLayer";
import "leaflet/dist/leaflet.css";
import MyMarker from "./MyMarker";
import { useEffect, useState } from "react";
import { UNSAFE_ErrorResponseImpl } from "react-router-dom";

export const defaultLocation: LatLngTuple = [52.2278197, 21.0028638];

function Map({
  markerPosition,
  setMarkerPosition,
  changeError,
}: {
  markerPosition: LatLngTuple;
  setMarkerPosition: (position: LatLngTuple) => void;
  changeError: (increase: boolean) => void;
}) {
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (
      markerPosition[0] <= defaultLocation[0] - 0.5 ||
      markerPosition[0] >= defaultLocation[0] + 0.5 ||
      markerPosition[1] <= defaultLocation[1] - 0.5 ||
      markerPosition[1] >= defaultLocation[1] + 0.5
    ) {
      if (error.length == 0) {
        changeError(true);
        setError("Zła lokalizacja. Wybierz lokalozację w Warszawie");
      }
    } else {
      if (error.length !== 0) {
        changeError(false);
        setError("");
      }
    }
  }, [markerPosition]);

  return (
    <>
      <MapContainer
        style={{
          height: "300px",
          width: "60%",
          margin: "auto",
          marginBottom: "20px",
        }}
        center={defaultLocation}
        zoom={11}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MyMarker position={markerPosition} setPosition={setMarkerPosition} />
      </MapContainer>
      {error.length !== 0 && <p>{error}</p>}
    </>
  );
}

export default Map;
