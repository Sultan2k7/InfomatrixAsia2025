import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/prisma/prisma';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';

export async function GET(req: Request) {
  // @ts-ignore
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { role: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ role: user.role }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
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
    const { driverName } = await req.json();

    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: { role: 'DRIVER', name: driverName },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
