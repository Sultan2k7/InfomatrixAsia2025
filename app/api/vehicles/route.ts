import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import * as z from 'zod';
import prisma from '@/prisma/prisma';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';

const vehicleSchema = z.object({
  vehicleNumber: z.string().min(1, 'Номер транспортного средства обязателен'),
  phoneNumber: z.string().min(1, 'Номер телефона обязателен'),
  vehicleType: z.enum(['Автомобиль', 'Фургон', 'Грузовик']),
  currentMission: z.string().optional(),
  licensePlate: z.string().min(1, 'Номерной знак обязателен'),
});

export async function GET(req: Request) {
  try {
    const vehicles = await prisma.vehicle.findMany({
      select: {
        id: true,
        licensePlate: true,
        vehicleType: true,
        status: true,
        obd: true,
        locationId: true,
        driver: true,
      },
    });

    const formattedResponse = vehicles.map(vehicle => {
      return {
        vehicleId: vehicle.id,
        licensePlate: vehicle.licensePlate,
        vehicleType: vehicle.vehicleType,
        status: vehicle.status,
        obd: vehicle.obd,
        locationId: vehicle.locationId,
        driver: vehicle.driver,
      };
    });

    return NextResponse.json(formattedResponse);
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    return NextResponse.json(
      { error: 'Unable to fetch data. Please try again later.' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  // @ts-ignore
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      vehicleNumber,
      vehicleType,
      currentMission,
      phoneNumber,
      licensePlate,
    } = vehicleSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { role: true, id: true },
    });

    if (!user || user.role !== 'DRIVER') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const newVehicle = await prisma.vehicle.create({
      data: {
        licensePlate: licensePlate,
        vin: vehicleNumber,
        vehicleType,
        driverId: user.id,
        location_time: new Date(), // or appropriate value
        obd: '', // or appropriate value
      },
    });

    return NextResponse.json(newVehicle, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
