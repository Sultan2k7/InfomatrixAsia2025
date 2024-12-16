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
      position={vehicle.position}
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
  // Функция для обновления только скорости из API
  const fetchVehicleSpeed = useCallback(async () => {
    try {
      const response = await fetch('/api/vehiclestest/1/'); // Ваш API эндпоинт
      if (!response.ok) throw new Error('Failed to fetch vehicle speed');
      const data: {
        vehicleSpeed: number;
        timestamp: string;
        engineLoad: number;
        
      } = await response.json();

      const now = new Date();
      const lastUpdate = new Date(data.timestamp);

      // Проверка на задержку обновления (1 минута)
      const isStale = (now.getTime() - lastUpdate.getTime()) / 1000 > 60;

      setVehicles((prevVehicles) =>
        prevVehicles.map((vehicle) => ({
          ...vehicle,
          speed: isStale ? 0 : data.vehicleSpeed, // Устанавливаем скорость в 0, если данные устарели
          engineLoad: isStale ? 0 : Math.round(data.engineLoad), // Устанавливаем округленную нагрузку двигателя или 0
        }))
      );
    } catch (error) {
      console.error('Error fetching vehicle speed:', error);
    }
  }, [setVehicles]);




  // Оригинальная логика обновления координат и bearing
  const fetchVehicles = useCallback(async () => {
    try {
      const response = await fetch('/api/map/1/gps');
      if (!response.ok) throw new Error('Failed to fetch vehicle data');
      const data = await response.json();

      setVehicles((prevVehicles) =>
        prevVehicles.map((vehicle) => {
          const updatedVehicle = data.find((v: any) => v.vehicleId === vehicle.id);

          if (updatedVehicle) {
            const newPosition: LatLngTuple = [updatedVehicle.latitude, updatedVehicle.longitude];

            // Если координаты остались такими же, сохраняем текущий bearing
            if (
              vehicle.position[0] === newPosition[0] &&
              vehicle.position[1] === newPosition[1]
            ) {
              return {
                ...vehicle,
                speed: 0, // Если координаты остались такими же, то это означает что скорость равна 0
                engineLoad: updatedVehicle.engineLoad || vehicle.engineLoad,
              };
            }

            // Рассчитываем новый bearing, если координаты изменились
            const bearing = calculateBearing(vehicle.position, newPosition);

            return {
              ...vehicle,
              position: newPosition,
              speed: updatedVehicle.speed || vehicle.speed,
              engineLoad: updatedVehicle.engineLoad || vehicle.engineLoad,
              bearing, // Рассчитанный bearing
            };
          }
          return vehicle;
        })
      );
    } catch (error) {
      console.error('Error fetching vehicle data:', error);
    }
  }, [setVehicles]);

  // Рассчет bearing между координатами
  const calculateBearing = (from: LatLngTuple, to: LatLngTuple): number => {
    if (!from || !to || from.length !== 2 || to.length !== 2) {
      console.error('Invalid coordinates provided for bearing calculation:', from, to);
      return 0;
    }

    const [lat1, lon1] = from.map((deg) => (deg ?? 0) * (Math.PI / 180));
    const [lat2, lon2] = to.map((deg) => (deg ?? 0) * (Math.PI / 180));
    const deltaLon = lon2 - lon1;

    const x = Math.sin(deltaLon) * Math.cos(lat2);
    const y =
      Math.cos(lat1) * Math.sin(lat2) -
      Math.sin(lat1) * Math.cos(lat2) * Math.cos(deltaLon);

    const bearing = (Math.atan2(x, y) * 180) / Math.PI;
    return (bearing + 360) % 360; // Нормализация
  };

  useEffect(() => {
    fetchVehicles(); // Получение координат
    fetchVehicleSpeed(); // Получение скорости
    const intervalId = setInterval(() => {
      fetchVehicles();
      fetchVehicleSpeed();
    }, 1000); // Обновляем каждые 1000 мс
    return () => clearInterval(intervalId); // Очистка интервала
  }, [fetchVehicles, fetchVehicleSpeed]);

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
      onDragEnd([center.lat, center.lng]);
    },
  });
  return null;
}
