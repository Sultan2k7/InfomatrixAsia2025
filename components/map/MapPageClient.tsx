// components/map/MapPageClient.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import type { LatLngTuple } from 'leaflet';
import { VehicleDetails } from '@/components/shared/vehicle-details';
import type { Vehicle } from '@/types/vehicles';

const DynamicMap = dynamic(() => import('@/components/map/DynamicMap'), {
  ssr: false,
});

// Mock vehicles — данные, которые остаются постоянными
const mockVehicles: Vehicle[] = [
  {
    id: '23',
    position: [43.222, 76.8512],
    fuelAmount: 67,
    driver: 'Михаил Абай',
    startPoint: [43.222, 76.8512], // Almaty
    endPoint: [51.1605, 71.4704], // Astana
    status: 'В движении',
    speed: 64,
    location: 'Актау',
    weather: {
      temperature: 30,
      humidity: 32,
      precipitation: 0,
    },
    engineLoad: 40,
    arrivalTime: '16:56',
    route: [],
    routeIndex: 0,
    bearing: 0,
  },
];

export default function MapPageClient() {
  // Сохраняем состояние на основе mockVehicles
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [mapCenter, setMapCenter] = useState<LatLngTuple>([48.0196, 66.9237]);

  // Функция для получения новых позиций из API
  const fetchGpsPositions = useCallback(async () => {
    try {
      const response = await fetch('/api/map/gps');
      if (!response.ok) throw new Error('Failed to fetch GPS data');
      const data = await response.json();

      // Обновляем позиции в `vehicles`, но оставляем остальные данные из `mockVehicles`
      setVehicles((prevVehicles) =>
        prevVehicles.map((vehicle) => {
          const updatedData = data.find((record: any) => record.vehicleId === vehicle.id);
          if (updatedData) {
            return {
              ...vehicle, // Сохраняем остальные данные из mockVehicles
              position: [updatedData.latitude, updatedData.longitude] as LatLngTuple,
              speed: updatedData.speed || vehicle.speed, // Обновляем скорость, если доступна
            };
          }
          return vehicle; // Если данные отсутствуют, оставляем без изменений
        })
      );
    } catch (error) {
      console.error('Error fetching GPS positions:', error);
    }
  }, []);

  useEffect(() => {
    fetchGpsPositions(); // Получаем данные при монтировании
    const intervalId = setInterval(fetchGpsPositions, 1000); // Обновляем каждую секунду
    return () => clearInterval(intervalId); // Очищаем таймер при размонтировании
  }, [fetchGpsPositions]);

  const handleVehicleClick = useCallback((vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
  }, []);

  const handleCloseVehicleDetails = useCallback(() => {
    setSelectedVehicle(null);
  }, []);

  const handleMapDragEnd = useCallback((center: LatLngTuple) => {
    setMapCenter(center);
  }, []);

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">Карта транспорта</h2>
        <div className="aspect-video bg-muted relative">
          <DynamicMap
            vehicles={vehicles}
            selectedVehicle={selectedVehicle}
            mapCenter={mapCenter}
            onVehicleClick={handleVehicleClick}
            onMapDragEnd={handleMapDragEnd}
            setVehicles={setVehicles}
          />
          {selectedVehicle && (
            <VehicleDetails
              vehicle={selectedVehicle}
              onClose={handleCloseVehicleDetails}
            />
          )}
        </div>
      </div>
    </div>
  );
}
