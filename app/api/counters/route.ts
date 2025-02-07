import { NextResponse } from 'next/server';
import prisma from '@/prisma/prisma';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const vehicleId = url.searchParams.get('vehicleId');

    if (!vehicleId) {
      return NextResponse.json(
        { error: 'Vehicle ID is required' },
        { status: 400 }
      );
    }

    const counters = await prisma.counter.findMany({
      where: {
        vehicleId: vehicleId
      },
      select: {
        id: true,
        title: true,
        description: true,
        currentDistance: true,
        needDistance: true
      }
    });

    return NextResponse.json(counters);
  } catch (error) {
    console.error('Error fetching counters:', error);
    return NextResponse.json(
      { error: 'Failed to fetch counters' },
      { status: 500 }
    );
  }
} 