import { NextResponse } from 'next/server';
import prisma from '@/prisma/prisma';

export async function GET(req: Request) {
  try {
    //console.log('Fetching vehicles and their location IDs...');

    const vehicles = await prisma.vehicle.findMany({
      select: {
        id: true,
        licensePlate: true,
        vehicleType: true,
        status: true,
        obd: true,
        locationId: true,
      },
    });

    //console.log('Vehicles fetched:', vehicles);

    const locationIds = vehicles
      .map(vehicle => vehicle.locationId)
      .filter((id): id is string => id !== null)
      .map(id => id.toString()); // Convert ObjectId to string

    //console.log('Processed location IDs:', locationIds);

    const gpsData = await prisma.gps.findMany({
      where: {
        id: {
          in: locationIds,
        },
      },
      select: {
        id: true,
        latitude: true,
        longitude: true,
        speed: true,
        timestamp: true,
      },
    });

    //console.log('GPS data fetched:', gpsData);

    const gpsMap = gpsData.reduce((map, gps) => {
      map[gps.id] = gps;
      return map;
    }, {} as Record<string, typeof gpsData[0]>);

    //console.log('GPS map:', gpsMap);

    const formattedResponse = vehicles.map(vehicle => {
      const gps = vehicle.locationId ? gpsMap[vehicle.locationId] : null;

      if (!gps) {
        console.warn(
          `No GPS data for vehicle ID: ${vehicle.id}, locationId: ${vehicle.locationId}`
        );
      }

      return {
        vehicleId: vehicle.id,
        licensePlate: vehicle.licensePlate,
        vehicleType: vehicle.vehicleType,
        status: vehicle.status,
        obd: vehicle.obd,
        location: gps
          ? {
              latitude: gps.latitude,
              longitude: gps.longitude,
              speed: gps.speed,
              timestamp: gps.timestamp,
            }
          : null,
      };
    });

    //console.log('Formatted response:', formattedResponse);

    return NextResponse.json(formattedResponse);
  } catch (error) {
    console.error('Error fetching vehicles and GPS data:', error);
    return NextResponse.json(
      { error: 'Unable to fetch data. Please try again later.' },
      { status: 500 }
    );
  }
}
