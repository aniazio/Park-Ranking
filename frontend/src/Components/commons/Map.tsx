import { LatLngTuple } from "leaflet";
import { MapContainer } from "react-leaflet/MapContainer";
import { Marker } from "react-leaflet/Marker";
import { TileLayer } from "react-leaflet/TileLayer";
import "leaflet/dist/leaflet.css";
import MyMarker from "./MyMarker";

export const defaultLocation: LatLngTuple = [52.2278197, 21.0028638];

function Map({
  markerPosition,
  setMarkerPosition,
}: {
  markerPosition: LatLngTuple;
  setMarkerPosition: (position: LatLngTuple) => void;
}) {
  return (
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
  );
}

export default Map;
