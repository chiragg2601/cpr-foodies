import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import MenuItem from '@/models/MenuItem';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const cuisine = searchParams.get('cuisine');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');
    const showAll = searchParams.get('showAll');

    const query = showAll ? {} : { isAvailable: true };
    if (category) query.category = category;
    if (cuisine) query.cuisine = cuisine;
    if (featured) query.isFeatured = true;
    if (search) query.name = { $regex: search, $options: 'i' };

    const items = await MenuItem.find(query).sort({ category: 1, name: 1 });

    return NextResponse.json({ items });
  } catch (error) {
    console.error('Menu fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch menu' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    await connectDB();
    const body = await req.json();

    const item = await MenuItem.create(body);
    return NextResponse.json({ item }, { status: 201 });
  } catch (error) {
    console.error('Menu create error:', error);
    return NextResponse.json({ error: 'Failed to create menu item' }, { status: 500 });
  }
}
