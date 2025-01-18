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

export default function MapPageClient() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [mapCenter, setMapCenter] = useState<LatLngTuple>([48.0196, 66.9237]);

  const fetchVehiclesWithGps = useCallback(async () => {
    try {
      const response = await fetch('/api/map/1/gps');
      if (!response.ok) throw new Error('Failed to fetch vehicles with GPS data');
      const data: Vehicle[] = await response.json();
      console.log('Fetched vehicles with GPS:', data); // Log the data
      setVehicles(data);
    } catch (error) {
      console.error('Error fetching vehicles with GPS data:', error);
    }
  }, []);
  

  useEffect(() => {
    fetchVehiclesWithGps();
    const intervalId = setInterval(fetchVehiclesWithGps, 1000); // Refresh data every second
    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, [fetchVehiclesWithGps]);

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
