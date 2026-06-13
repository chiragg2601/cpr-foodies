'use client';

import { Star } from 'lucide-react';

export default function StarRating({ rating, size = 16, interactive = false, onChange }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < rating;
        return (
          <Star
            key={i}
            size={size}
            className={`${filled ? 'text-gold-400 fill-gold-400' : 'text-charcoal-500'} ${
              interactive ? 'cursor-pointer hover:text-gold-300' : ''
            }`}
            onClick={() => interactive && onChange && onChange(i + 1)}
          />
        );
      })}
    </div>
  );
}
