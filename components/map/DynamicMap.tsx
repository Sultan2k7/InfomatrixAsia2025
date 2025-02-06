// components/map/DynamicMap.tsx
'use client';

import React, { useEffect, useCallback } from 'react';
import L, { LatLngTuple, divIcon } from 'leaflet';
import { MapContainer, TileLayer, Marker, Tooltip, useMapEvents } from 'react-leaflet';
import type { Vehicle } from '@/types/vehicles';
import 'leaflet/dist/leaflet.css';

interface DynamicMapProps {
  vehicles: Vehicle[];
  selectedVehicle: Vehicle | null;
  mapCenter: LatLngTuple;
  onVehicleClick: (vehicle: Vehicle) => void;
  onMapDragEnd: (center: LatLngTuple) => void;
  setVehicles: React.Dispatch<React.SetStateAction<Vehicle[]>>;
}

const mapStyles = `
.custom-div-icon {
  background: none;
  border: none;
}
.navigation-icon {
  width: 32px;
  height: 32px;
  cursor: pointer;
}
.speed-tooltip {
  background-color: rgba(0, 0, 0, 0.7);
  border: none;
  border-radius: 3px;
  color: white;
  font-weight: bold;
  padding: 5px;
  font-size: 12px;
}
`;

function VehicleMarker({ vehicle, onClick }: { vehicle: Vehicle; onClick: () => void }) {

  if (!vehicle.location) {
    console.warn(`No GPS data for vehicle ID: ${vehicle.id}`);
    return null; // Don't render a marker if no GPS data
  }
  
  
  const customIcon = divIcon({
    className: 'custom-div-icon',
    html: `<img 
            src="/navigation.svg" 
            class="navigation-icon" 
            style="transform: rotate(${vehicle.bearing || 0}deg);" 
          />`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });

  return (
    <Marker
      position={[vehicle.location.latitude, vehicle.location.longitude]}
      icon={customIcon}
      eventHandlers={{ click: onClick }}
    >
      <Tooltip
        permanent
        direction="top"
        offset={[0, -20]}
        className="speed-tooltip"
      >
        {vehicle.speed} км/ч
      </Tooltip>
    </Marker>
  );
}

export default function DynamicMap({
  vehicles,
  selectedVehicle,
  mapCenter,
  onVehicleClick,
  onMapDragEnd,
  setVehicles,
}: DynamicMapProps) {
  const fetchVehiclesWithGps = useCallback(async () => {
    try {
      const response = await fetch('/api/map'); // Adjust to match your new API route
      if (!response.ok) throw new Error('Failed to fetch vehicles with GPS data');
      const data: Vehicle[] = await response.json();
      setVehicles(data);
    } catch (error) {
      console.error('Error fetching vehicles with GPS data:', error);
    }
  }, [setVehicles]);

  useEffect(() => {
    fetchVehiclesWithGps();
    const intervalId = setInterval(fetchVehiclesWithGps, 1000); // Fetch updated data every second
    return () => clearInterval(intervalId);
  }, [fetchVehiclesWithGps]);

  return (
    <>
      <style>{mapStyles}</style>
      <MapContainer
        center={mapCenter}
        zoom={5}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {vehicles.map((vehicle) => (
          <VehicleMarker
            key={vehicle.id}
            vehicle={vehicle}
            onClick={() => onVehicleClick(vehicle)}
          />
        ))}
        <MapEventHandler onDragEnd={onMapDragEnd} />
      </MapContainer>
    </>
  );
}

function MapEventHandler({ onDragEnd }: { onDragEnd: (center: LatLngTuple) => void }) {
  const map = useMapEvents({
    dragend: () => {
      const center = map.getCenter();
      console.log('New map center:', center);
      onDragEnd([center.lat, center.lng]);
    },
  });
  return null;
}
