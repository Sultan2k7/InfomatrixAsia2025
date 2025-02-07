import { NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/prisma/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';

const requestSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  type: z.enum(['repair', 'maintenance', 'other']),
  urgency: z.enum(['low', 'medium', 'high']),
});

export const POST = async (req: Request) => {
  try {
    // @ts-ignore
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const body = await req.json();
    const validatedData = requestSchema.parse(body);

    const newRequest = await prisma.request.create({
      data: {
        ...validatedData,
        status: 'pending',
        user: {
          connect: { id: user.id },
        },
        media: {}, // providing an empty object as a default value
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(newRequest, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error('Request creation error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
};
