import { NextResponse } from 'next/server';
import prisma from '@/prisma/prisma';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const vehicleId = url.searchParams.get('vehicleId');
    const limit = url.searchParams.get('limit');

    if (!vehicleId) {
      return NextResponse.json(
        { error: 'Vehicle ID is required' },
        { status: 400 }
      );
    }

    // Convert limit to number, default to 100 if not provided or invalid
    const recordLimit = limit ? parseInt(limit) : 100;

    if (isNaN(recordLimit) || recordLimit <= 0) {
      return NextResponse.json(
        { error: 'Invalid limit parameter' },
        { status: 400 }
      );
    }

    const gpsData = await prisma.gps.findMany({
      where: {
        vehicleId: vehicleId
      },
      orderBy: {
        timestamp: 'desc'
      },
      take: recordLimit,
      select: {
        id: true,
        latitude: true,
        longitude: true,
        altitude: true,
        speed: true,
        timestamp: true,
        createdAt: true,
        updatedAt: true
      }
    });

    return NextResponse.json(gpsData);
  } catch (error) {
    console.error('Error fetching GPS data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GPS data' },
      { status: 500 }
    );
  }
}
