import { NextResponse } from 'next/server';
import prisma from '@/prisma/prisma';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const vehicleId = url.searchParams.get('vehicleId'); // Get vehicleId from query

    const vehicles = await prisma.vehicle.findMany({
      where: vehicleId ? { id: vehicleId } : {}, // If vehicleId is provided, filter by it
      select: {
        id: true,
        licensePlate: true,
        vehicleType: true,
        status: true,
        obd: true,
        location: {
          select: {
            id: true,
            latitude: true,
            longitude: true,
            speed: true,
            timestamp: true,
          },
        },
      },
    });

    // Format response to match previous structure
    const formattedResponse = vehicles.map(vehicle => ({
      vehicleId: vehicle.id,
      licensePlate: vehicle.licensePlate,
      vehicleType: vehicle.vehicleType,
      status: vehicle.status,
      obd: vehicle.obd,
      location: vehicle.location
        ? {
            latitude: vehicle.location.latitude,
            longitude: vehicle.location.longitude,
            speed: vehicle.location.speed,
            timestamp: vehicle.location.timestamp,
          }
        : null,
    }));

    return NextResponse.json(formattedResponse);
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    return NextResponse.json(
      { error: 'Unable to fetch vehicles. Please try again later.' },
      { status: 500 }
    );
  }
}
