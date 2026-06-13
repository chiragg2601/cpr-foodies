import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Reservation from '@/models/Reservation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

export async function PUT(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    await connectDB();
    const { status } = await req.json();

    const reservation = await Reservation.findByIdAndUpdate(
      params.id,
      { status },
      { new: true }
    );

    if (!reservation) return NextResponse.json({ error: 'Reservation not found' }, { status: 404 });

    return NextResponse.json({ reservation });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update reservation' }, { status: 500 });
  }
}
