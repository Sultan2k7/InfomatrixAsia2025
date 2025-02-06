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

    const obdData = await prisma.obd.findMany({
      where: {
        vehicleId: vehicleId
      },
      orderBy: {
        time: 'desc'
      },
      take: recordLimit,
      select: {
        id: true,
        vehicleId: true,
        engineRpm: true,
        vehicleSpeed: true,
        throttlePosition: true,
        fuelLevel: true,
        shortTrim1: true,
        longTrim1: true,
        shortTrim2: true,
        longTrim2: true,
        engineLoad: true,
        intakeAirTemperature: true,
        massAirFlow: true,
        fuelPressure: true,
        fuelConsumptionRate: true,
        engineCoolantTemperature: true,
        oxygenSensorReading: true,
        catalystTemperature: true,
        evapEmissionControlPressure: true,
        diagnosticTroubleCode: true,
        batteryVoltage: true,
        oilTemperature: true,
        distanceTraveled: true,
        time: true,
        createdAt: true,
        updatedAt: true
      }
    });

    return NextResponse.json(obdData);
  } catch (error) {
    console.error('Error fetching OBD data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch OBD data' },
      { status: 500 }
    );
  }
}
