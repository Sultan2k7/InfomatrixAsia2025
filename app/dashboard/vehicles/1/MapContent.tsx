'use client';

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { Icon, LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapContentProps {
  coordinates: LatLngTuple;
}

const MapContent: React.FC<MapContentProps> = ({ coordinates }) => {
  const [carIcon, setCarIcon] = useState<Icon | null>(null);

  useEffect(() => {
    // Initialize icon on client side only
    const icon = new Icon({
      iconUrl: '/truck.svg',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });
    setCarIcon(icon);
  }, []);

  if (!carIcon) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
        <span>Initializing map...</span>
      </div>
    );
  }

  return (
    <MapContainer
      center={coordinates}
      zoom={13}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={coordinates} icon={carIcon} />
    </MapContainer>
  );
};

export default MapContent;
