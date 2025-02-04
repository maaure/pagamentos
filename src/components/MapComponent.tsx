import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Point } from '../fakeApi';

// Fix para ícones do Leaflet
const defaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

interface MapComponentProps {
    points: Point[];
    onMapClick?: (lat: number, lng: number) => void;
}

function MapClickHandler({ onMapClick }: { onMapClick?: (lat: number, lng: number) => void }) {
    useMapEvent('click', (e) => onMapClick?.(e.latlng.lat, e.latlng.lng));
    return null;
}

export const MapComponent = ({ points, onMapClick }: MapComponentProps) => {
    return (
        <div className="w-full h-full rounded-lg shadow-md overflow-hidden">
            <MapContainer
                center={[-15.77972, -47.92972]}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
                className="rounded-lg"
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <MapClickHandler onMapClick={onMapClick} />
                {points.map((point) => (
                    <Marker key={point.id} position={[point.lat, point.lng]} icon={defaultIcon}>
                        <Popup className="w-64 p-4 bg-white rounded-lg shadow-lg">
                            <strong className="text-lg font-semibold text-gray-800">{point.name}</strong>
                            <p className="text-sm text-gray-600 mt-2">{point.description}</p>
                            <p className="text-sm text-gray-600 mt-1">Valor: R$ {point.value}</p>
                            <p className="text-sm text-gray-600 mt-1">Badges: {point.badges.join(', ')}</p>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};
