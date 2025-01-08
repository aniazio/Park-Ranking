import { LatLngTuple } from "leaflet";
import { Marker, useMapEvents } from "react-leaflet";

function MyMarker({
  position,
  setPosition,
}: {
  position: LatLngTuple;
  setPosition: (newPosition: LatLngTuple) => void;
}) {
  const map = useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return <Marker position={position} interactive={false} />;
}

export default MyMarker;
