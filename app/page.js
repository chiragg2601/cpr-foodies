import { connectDB } from '@/lib/db';
import MenuItem from '@/models/MenuItem';
import HomeClient from '@/components/HomeClient';

async function getFeaturedItems() {
  try {
    await connectDB();
    const items = await MenuItem.find({ isFeatured: true, isAvailable: true }).limit(8);
    return JSON.parse(JSON.stringify(items));
  } catch (e) {
    return [];
  }
}

export default async function HomePage() {
  const featured = await getFeaturedItems();
  return <HomeClient featured={featured} />;
}
