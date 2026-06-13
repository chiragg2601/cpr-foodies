import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Reservation from '@/models/Reservation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const session = await getServerSession(authOptions);

    const { name, email, phone, date, time, guests, specialRequest } = body;

    if (!name || !email || !phone || !date || !time || !guests) {
      return NextResponse.json({ error: 'Please fill in all required fields' }, { status: 400 });
    }

    const reservation = await Reservation.create({
      user: session?.user?.id || null,
      name,
      email,
      phone,
      date,
      time,
      guests,
      specialRequest: specialRequest || '',
    });

    return NextResponse.json(
      { message: 'Reservation request submitted successfully', reservation },
      { status: 201 }
    );
  } catch (error) {
    console.error('Reservation error:', error);
    return NextResponse.json({ error: 'Failed to create reservation' }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    let query = {};
    if (session.user.role !== 'admin') {
      query = { user: session.user.id };
    }

    const reservations = await Reservation.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ reservations });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch reservations' }, { status: 500 });
  }
}
