import React, { useEffect, useState } from "react";
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
import { PointCard } from "./PointCard";

// Fix para ícones do Leaflet
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

        console.log("Localização obtida com sucesso:", latitude, longitude);
      },
      (error) => {
        console.error("Erro ao obter a localização:", error);
      },
    );
  }, [map]);

  return null;
}

export const MapComponent = ({ points, onMapClick }: MapComponentProps) => {
  return (
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
            {/* <PointCard point={point} /> */}
            <h2 className="text-lg font-medium self-center text-gray-900">
              {point.name}
            </h2>
            <p className="text-xs text-normal text-gray-500 !m-0">
              {point.description}
            </p>
            {/* Valor e badges */}
            <p className="text-sm text-emerald-600">
              <i className="fa-solid fa-coins" /> R$ {point.value}
              <span className="text-sm text-gray-500">
                {` • ${point.badges.join(" • ")}`}
              </span>
            </p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};
