import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Point } from "../../fakeApi";

// Ícone padrão do Leaflet (usado para os marcadores já existentes)
const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface MapComponentProps {
  points: Point[];
  onMapClick?: (lat: number, lng: number) => void;
  addingPoint?: boolean;
  onCenterChanged?: (lat: number, lng: number) => void;
  coordinates?: { lat: number; lng: number };
  updateCoordinates?: { lat: number; lng: number };
}

function MapClickHandler({
  onMapClick,
}: {
  onMapClick?: (lat: number, lng: number) => void;
}) {
  useMapEvent("click", (e) => onMapClick?.(e.latlng.lat, e.latlng.lng));
  return null;
}

function LocateUser() {
  const map = useMap();

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Geolocalização não é suportada pelo seu navegador.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        map.setView([latitude, longitude], 13);
      },
      (error) => {
        console.error("Erro ao obter a localização:", error);
      },
    );
  }, [map]);

  return null;
}

function UpdateCenterCoordinates({
  onCenterChanged,
  coordinates,
}: {
  onCenterChanged: (lat: number, lng: number) => void;
  coordinates?: { lat: number; lng: number };
}) {
  const map = useMap();

  useEffect(() => {
    const center = map.getCenter();
    onCenterChanged(center.lat, center.lng);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const updateCenter = () => {
      const center = map.getCenter();
      onCenterChanged(center.lat, center.lng);
    };

    map.on("drag", updateCenter);

    return () => {
      map.off("drag", updateCenter);
    };
  }, [map, onCenterChanged]);

  useEffect(() => {
    if (coordinates) {
      map.flyTo([coordinates.lat, coordinates.lng], 13);
    }
  }, [coordinates, map]);

  return (
    <div
      className="absolute top-1/2 left-1/2 pointer-events-none"
      style={{
        transform: "translate(-50%, -100%)",
      }}
    >
      <img
        src="https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png"
        alt="Marcador central"
        className="w-full h-full"
      />
    </div>
  );
}

export const MapComponent = ({
  points,
  onMapClick,
  addingPoint = false,
  onCenterChanged = () => {},
  updateCoordinates,
}: MapComponentProps) => {
  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={[-15.77972, -47.92972]} // Posição inicial padrão (Brasília)
        zoom={13}
        className="w-full h-full z-0"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <MapClickHandler onMapClick={onMapClick} />
        <LocateUser />

        {points.map((point) => (
          <Marker
            key={point.id}
            position={[point.lat, point.lng]}
            icon={defaultIcon}
          >
            <Popup>
              <h2 className="text-lg font-medium text-gray-900">
                {point.name}
              </h2>
              <p className="text-xs text-gray-500 !m-0">{point.description}</p>
              <p className="text-sm text-emerald-600">
                <i className="fa-solid fa-coins" /> R$ {point.value}
                <span className="text-sm text-gray-500">
                  {` • ${point.badges.join(" • ")}`}
                </span>
              </p>
            </Popup>
          </Marker>
        ))}

        {addingPoint && (
          <UpdateCenterCoordinates
            onCenterChanged={onCenterChanged}
            coordinates={updateCoordinates}
          />
        )}
      </MapContainer>

      {addingPoint && (
        <div
          className="absolute top-1/2 left-1/2 pointer-events-none"
          style={{
            transform: "translate(-50%, -100%)",
          }}
        >
          <img
            src="https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png"
            alt="Marcador central"
            className="w-full h-full"
          />
        </div>
      )}
    </div>
  );
};
