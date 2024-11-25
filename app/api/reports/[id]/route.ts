import { NextResponse } from 'next/server';
import prisma from '@/prisma/prisma';

export async function GET(req: Request) {
    try{
        const reportData = await prisma.report.findMany();


        if(reportData.length === 0){
            return NextResponse.json(
                { error: 'No entries found' },
                { status: 404}
            );
        }

        return NextResponse.json(reportData);
    } catch (error) {
        console.error('Error fetching data:', error); // Log the error for debugging
        return NextResponse.json(
          { error: 'Internal Server Error' },
          { status: 500 }
        );
    }

}