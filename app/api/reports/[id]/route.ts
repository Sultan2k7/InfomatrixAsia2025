import { NextResponse } from 'next/server';
import prisma from '@/prisma/prisma';

export async function GET(req: Request) {
  try {
    const reportData = await prisma.report.findMany();

    if (reportData.length === 0) {
      return NextResponse.json({ error: 'No entries found' }, { status: 404 });
    }

    const formattedReports = reportData.map((report) => ({
      ...report,
      time: new Date(report.time).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }),
    }));

    return NextResponse.json(formattedReports);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
