import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useCallback } from 'react';
import { LatLngTuple } from 'leaflet';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculateBearingHelper = (
  start: LatLngTuple,
  end: LatLngTuple
) => {
  const toRad = (degree: number) => (degree * Math.PI) / 180;
  const toDeg = (radian: number) => (radian * 180) / Math.PI;

  const lat1 = toRad(start[0]);
  const lon1 = toRad(start[1]);
  const lat2 = toRad(end[0]);
  const lon2 = toRad(end[1]);

  const y = Math.sin(lon2 - lon1) * Math.cos(lat2);
  const x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);
  const bearing = toDeg(Math.atan2(y, x));

  return (bearing + 360) % 360;
};
