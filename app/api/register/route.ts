import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import prisma from '@/prisma/prisma';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: 'User created successfully' },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error('Registration error:', error);

    if (error instanceof Error) {
      return NextResponse.json(
        { message: `An error occurred: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
