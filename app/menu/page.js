'use client';

import { useEffect, useState } from 'react';
import MenuCard from '@/components/MenuCard';
import { Search } from 'lucide-react';

const CATEGORIES = [
  'All',
  'Starters',
  'Indian Mains',
  'Chinese Mains',
  'Continental Mains',
  'Fast Food',
  'Breads & Rice',
  'Desserts',
  'Beverages',
];

const CUISINES = ['All', 'Indian', 'Chinese', 'Continental', 'Fast Food', 'Cafe'];

export default function MenuPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [cuisine, setCuisine] = useState('All');
  const [search, setSearch] = useState('');
  const [vegOnly, setVegOnly] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      const params = new URLSearchParams();
      if (category !== 'All') params.set('category', category);
      if (cuisine !== 'All') params.set('cuisine', cuisine);
      if (search) params.set('search', search);

      try {
        const res = await fetch(`/api/menu?${params.toString()}`);
        const data = await res.json();
        setItems(data.items || []);
      } catch (e) {
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    const timeout = setTimeout(fetchItems, 300);
    return () => clearTimeout(timeout);
  }, [category, cuisine, search]);

  const displayedItems = vegOnly ? items.filter((i) => i.isVeg) : items;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <p className="text-gold-400 font-semibold uppercase tracking-wide text-sm mb-2">
          Our Menu
        </p>
        <h1 className="font-display text-4xl font-bold mb-3">Something for Everyone</h1>
        <p className="text-charcoal-300 max-w-2xl mx-auto">
          Indian curries, Chinese stir-fries, Continental classics, and Fast Food favorites —
          browse our full menu and order what you love.
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-md mx-auto mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-400" size={18} />
        <input
          type="text"
          placeholder="Search dishes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-dark pl-10"
        />
      </div>

      {/* Cuisine filter */}
      <div className="flex flex-wrap gap-2 justify-center mb-4">
        {CUISINES.map((c) => (
          <button
            key={c}
            onClick={() => setCuisine(c)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              cuisine === c
                ? 'bg-gold-gradient text-charcoal-950 border-transparent'
                : 'border-charcoal-600 text-charcoal-300 hover:border-gold-500'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
              category === c
                ? 'border-gold-500 text-gold-400'
                : 'border-charcoal-700 text-charcoal-400 hover:border-gold-500'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="flex justify-center mb-10">
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={vegOnly}
            onChange={(e) => setVegOnly(e.target.checked)}
            className="w-4 h-4 accent-gold-500"
          />
          Vegetarian only
        </label>
      </div>

      {/* Results */}
      {loading ? (
        <p className="text-center text-charcoal-400">Loading menu...</p>
      ) : displayedItems.length === 0 ? (
        <p className="text-center text-charcoal-400">No dishes found. Try a different filter.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedItems.map((item) => (
            <MenuCard key={item._id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
