import { NextResponse } from 'next/server';
import prisma from '@/prisma/prisma';

export async function GET(req: Request) {
  try {
    // Fetch the latest record for each vehicle
    const latestRecords = await prisma.gps.groupBy({
      by: ['vehicleId'],
      _max: {
        id: true, // Assuming 'id' is a unique increment field
      },
    });

    // Use the max `id` to get the latest record for each vehicle
    const latestData = await Promise.all(
        latestRecords.map(async (record) => {
          // Ensure 'id' is a string or undefined, not null
          const id = record._max.id ?? undefined; // Convert 'null' to 'undefined'
          
          if (!id) {
            return null; // Skip if 'id' is still null or undefined
          }
      
          // Fetch the unique record using 'id'
          const data = await prisma.gps.findUnique({
            where: { id }, // 'id' is now guaranteed to be a string or undefined
            select: {
              vehicleId: true,
              latitude: true,
              longitude: true,
              speed: true,
            },
          });
          return data;
        })
      );
      
      // Filter out any null values from the result
        return NextResponse.json(latestData.filter((item) => item !== null));      
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json(
      { error: 'Unable to fetch data. Please try again later.' },
      { status: 404 }
    );
  }
}
