// components/map/DynamicMap.tsx
'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import L, { LatLngTuple, divIcon } from 'leaflet';
import { MapContainer, TileLayer, Marker, Polyline, Tooltip, useMapEvents } from 'react-leaflet';
import type { Vehicle } from '@/types/vehicles';
import { calculateBearingHelper } from '@/lib/utils';

// Import Leaflet CSS
import 'leaflet/dist/leaflet.css';

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
.start-icon {
  color: green;
}
.end-icon {
  color: red;
}
`;

function VehicleMarker({ vehicle, onClick, isSelected }: {
  vehicle: Vehicle;
  onClick: () => void;
  isSelected: boolean;
}) {
  const markerRef = useRef<L.Marker>(null);

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.setLatLng(vehicle.position);
    }
  }, [vehicle.position]);

  const customIcon = divIcon({
    className: 'custom-div-icon',
    html: `<img src="/navigation.svg" class="navigation-icon" style="transform: rotate(${vehicle.bearing}deg);" />`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });

  return (
    <>
      <Marker
        position={vehicle.position}
        icon={customIcon}
        eventHandlers={{ click: onClick }}
        ref={markerRef}
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
      {isSelected && (
        <>
          <Polyline positions={vehicle.route} color="#4CAF50" weight={4} />
          <DestinationMarker position={vehicle.startPoint} isStart={true} />
          <DestinationMarker position={vehicle.endPoint} isStart={false} />
        </>
      )}
    </>
  );
}

function DestinationMarker({ position, isStart }: {
  position: LatLngTuple;
  isStart: boolean;
}) {
  const icon = divIcon({
    className: `custom-div-icon ${isStart ? 'start-icon' : 'end-icon'}`,
    html: isStart ? '🟢' : '🔴',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });

  return (
    <Marker position={position} icon={icon}>
      <Tooltip permanent direction="top" offset={[0, -20]}>
        {isStart ? 'Начало' : 'Конец'}
      </Tooltip>
    </Marker>
  );
}

function MapEventHandler({ onDragEnd }: {
  onDragEnd: (center: LatLngTuple) => void;
}) {
  const map = useMapEvents({
    dragend: () => {
      const center = map.getCenter();
      onDragEnd([center.lat, center.lng]);
    },
  });
  return null;
}

interface DynamicMapProps {
  vehicles: Vehicle[];
  selectedVehicle: Vehicle | null;
  mapCenter: LatLngTuple;
  onVehicleClick: (vehicle: Vehicle) => void;
  onMapDragEnd: (center: LatLngTuple) => void;
  setVehicles: React.Dispatch<React.SetStateAction<Vehicle[]>>;
}

export default function DynamicMap({
  vehicles,
  selectedVehicle,
  mapCenter,
  onVehicleClick,
  onMapDragEnd,
  setVehicles,
}: DynamicMapProps) {
  // Move your route fetching and vehicle updating logic here
  const fetchRoute = useCallback(
    async (start: LatLngTuple, end: LatLngTuple, vehicleId: string) => {
      const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${process.env.NEXT_PUBLIC_OPENROUTESERVICE_API_KEY}&start=${start[1]},${start[0]}&end=${end[1]},${end[0]}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        const coordinates = data.features[0].geometry.coordinates.map(
          (coord: number[]) => [coord[1], coord[0]] as LatLngTuple
        );
        handleRouteFound(coordinates, vehicleId);
      } catch (error) {
        console.error('Error fetching route:', error);
      }
    },
    []
  );

  const handleRouteFound = useCallback(
    (route: LatLngTuple[], vehicleId: string) => {
      setVehicles((prevVehicles) =>
        prevVehicles.map((vehicle) =>
          vehicle.id === vehicleId
            ? { ...vehicle, route, routeIndex: 0 }
            : vehicle
        )
      );
    },
    [setVehicles]
  );

  useEffect(() => {
    vehicles.forEach((vehicle) => {
      fetchRoute(vehicle.startPoint, vehicle.endPoint, vehicle.id);
    });
  }, []); // Empty dependency array since we only want to fetch routes once

  const updateVehicles = useCallback(() => {
    setVehicles((prevVehicles) =>
      prevVehicles.map((vehicle) => {
        if (
          vehicle.route.length < 2 ||
          vehicle.routeIndex >= vehicle.route.length - 1
        ) {
          return vehicle;
        }

        const nextIndex = vehicle.routeIndex + 1;
        const currentPoint = vehicle.route[vehicle.routeIndex];
        const nextPoint = vehicle.route[nextIndex];

        return {
          ...vehicle,
          position: nextPoint,
          routeIndex: nextIndex,
          bearing: calculateBearingHelper(currentPoint, nextPoint),
          speed: Math.floor(Math.random() * 30) + 50,
        };
      })
    );
  }, [setVehicles]);

  useEffect(() => {
    const intervalId = setInterval(updateVehicles, 1000);
    return () => clearInterval(intervalId);
  }, [updateVehicles]);

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
            isSelected={selectedVehicle?.id === vehicle.id}
          />
        ))}
        <MapEventHandler onDragEnd={onMapDragEnd} />
      </MapContainer>
    </>
  );
}