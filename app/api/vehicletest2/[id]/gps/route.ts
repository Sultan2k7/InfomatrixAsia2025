import { NextResponse } from 'next/server';
import prisma from '@/prisma/prisma';

export async function GET(req: Request) {
  try {
    // Получаем последнее значение из базы данных, сортируя по id в порядке убывания и беря только одно
    const gpsData = await prisma.gps.findMany({
      orderBy: {
        id: 'desc' // Убедитесь, что 'id' является полем для сортировки, указывающим порядок данных
      },
      take: 1 // Берем только одно значение
    });

    // Проверяем, есть ли данные
    if (!gpsData || gpsData.length === 0) {
      return NextResponse.json(
        { error: 'No entries found' },
        { status: 404 }
      );
    }

    // Возвращаем последнее значение
    return NextResponse.json(gpsData[0]);
  } catch (error) {
    console.error('Error fetching data:', error);
    // Возвращаем ошибку 404 при сбое подключения к базе данных или другой ошибке
    return NextResponse.json(
      { error: 'Unable to fetch data. Please try again later.' },
      { status: 404 }
    );
  }
}
