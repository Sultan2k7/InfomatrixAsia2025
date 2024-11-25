import { NextResponse } from 'next/server';
import prisma from '@/prisma/prisma';

export async function GET(req: Request) {
    try {
        // Fetch all entries from the obd_check table
        const obdCheckData = await prisma.obd_check.findMany();
      
        // Check if any data is returned
        if (obdCheckData.length === 0) {
          return NextResponse.json(
            { error: 'No entries found' },
            { status: 404 }
          );
        }
      
        // Return the 'all' field of the first entry as JSON
        return NextResponse.json(obdCheckData);
      } catch (error) {
        console.error('Error fetching data:', error); // Log the error for debugging
        return NextResponse.json(
          { error: 'Internal Server Error' },
          { status: 500 }
        );
      }
      
      
}
