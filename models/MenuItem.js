import mongoose from 'mongoose';

const MenuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: '' },
    price: { type: Number, required: true },
    category: {
      type: String,
      required: true,
      enum: [
        'Starters',
        'Indian Mains',
        'Chinese Mains',
        'Continental Mains',
        'Fast Food',
        'Breads & Rice',
        'Desserts',
        'Beverages',
      ],
    },
    cuisine: {
      type: String,
      enum: ['Indian', 'Chinese', 'Continental', 'Fast Food', 'Cafe'],
      default: 'Indian',
    },
    image: { type: String, default: '' },
    isVeg: { type: Boolean, default: true },
    isAvailable: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    spicyLevel: { type: Number, min: 0, max: 3, default: 1 },
  },
  { timestamps: true }
);

export default mongoose.models.MenuItem || mongoose.model('MenuItem', MenuItemSchema);
