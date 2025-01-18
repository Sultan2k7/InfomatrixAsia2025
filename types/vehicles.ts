import type { LatLngTuple } from 'leaflet';

export interface Vehicle {
  id: string;
  position: LatLngTuple;
  fuelAmount: number;
  driver: string;
  startPoint: LatLngTuple;
  endPoint: LatLngTuple;
  status: string;
  speed: number;
  location: Location;
  weather: {
    temperature: number;
    humidity: number;
    precipitation: number;
  };
  engineLoad: number;
  arrivalTime: string;
  route: LatLngTuple[];
  routeIndex: number;
  bearing: number;
}

export interface Location {
  latitude: number;
  longitude: number;
  altitude?: number; // Optional
  timestamp: string;
}