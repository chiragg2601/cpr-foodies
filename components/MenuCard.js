'use client';

import Image from 'next/image';
import { useCart } from '@/app/providers';
import { Plus, Leaf, Drumstick, Flame } from 'lucide-react';
import toast from 'react-hot-toast';

export default function MenuCard({ item }) {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart(item);
    toast.success(`${item.name} added to cart`);
  };

  return (
    <div className="card-charcoal overflow-hidden flex flex-col group hover:border-gold-600 transition-colors">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80'}
          alt={item.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          {item.isVeg ? (
            <span className="bg-charcoal-950/80 border border-green-500 rounded p-1" title="Vegetarian">
              <Leaf size={14} className="text-green-500" />
            </span>
          ) : (
            <span className="bg-charcoal-950/80 border border-red-500 rounded p-1" title="Non-Vegetarian">
              <Drumstick size={14} className="text-red-500" />
            </span>
          )}
        </div>
        {item.spicyLevel > 0 && (
          <div className="absolute top-3 right-3 bg-charcoal-950/80 rounded px-1.5 py-1 flex items-center gap-0.5">
            {Array.from({ length: item.spicyLevel }).map((_, i) => (
              <Flame key={i} size={12} className="text-orange-500" />
            ))}
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-display text-lg font-semibold">{item.name}</h3>
          <span className="text-gold-400 font-bold whitespace-nowrap">₹{item.price}</span>
        </div>
        <p className="text-sm text-charcoal-300 flex-1 mb-3 line-clamp-2">{item.description}</p>
        <span className="text-xs text-charcoal-400 mb-3">{item.cuisine} · {item.category}</span>
        <button onClick={handleAdd} className="btn-gold w-full !py-2 text-sm">
          <Plus size={16} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
