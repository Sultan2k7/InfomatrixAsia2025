// components/map/MapPageClient.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import type { LatLngTuple } from 'leaflet';
import { VehicleDetails } from '@/components/shared/vehicle-details';

// Import only the types from your existing map component
import type { Vehicle } from '@/types/vehicles'; // Move your Vehicle interface to a separate types file

const DynamicMap = dynamic(() => import('@/components/map/DynamicMap'), {
  ssr: false,
});

const mockVehicles: Vehicle[] = [
    {
      id: '57432',
      position: [43.222, 76.8512],
      fuelAmount: 67,
      driver: 'Михаил Абай',
      startPoint: [43.222, 76.8512], // Almaty
      endPoint: [51.1605, 71.4704], // Astana
      status: 'В движении',
      speed: 64,
      location: 'Алматы',
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
    {
      id: '57433',
      position: [53.2198, 63.6354],
      fuelAmount: 75,
      driver: 'Айдар Казбеков',
      startPoint: [53.2198, 63.6354], // Kostanay
      endPoint: [49.8028, 73.1021], // Karaganda
      status: 'В движении',
      speed: 72,
      location: 'Костанай',
      weather: {
        temperature: 28,
        humidity: 35,
        precipitation: 0,
      },
      engineLoad: 35,
      arrivalTime: '18:30',
      route: [],
      routeIndex: 0,
      bearing: 0,
    },
  ];

export default function MapPageClient() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [mapCenter, setMapCenter] = useState<LatLngTuple>([48.0196, 66.9237]);

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