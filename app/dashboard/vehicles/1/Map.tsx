'use client';

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
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
      style={{ height: '100%', width: '100%', zIndex: 0 }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <UpdateMapCenter coordinates={coordinates} />
      <Marker position={coordinates} icon={carIcon} />
    </MapContainer>
  );
};

interface UpdateMapCenterProps {
  coordinates: LatLngTuple;
}

const UpdateMapCenter: React.FC<UpdateMapCenterProps> = ({ coordinates }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(coordinates); // Update the center of the map
  }, [coordinates, map]);

  return null;
};

export default Map;
