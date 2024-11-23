'use client';

import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { Icon, LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapProps {
  coordinates: LatLngTuple;
}

const Map: React.FC<MapProps> = ({ coordinates }) => {
  // Define the icon here to ensure it's only created on the client side
  const carIcon = new Icon({
    iconUrl: '/truck.svg',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

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

export default Map;