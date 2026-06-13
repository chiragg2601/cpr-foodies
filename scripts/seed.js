/**
 * Seed script for CPR Foodies
 * Run with: npm run seed
 * Requires MONGODB_URI in .env.local
 */

require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MenuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: '' },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    cuisine: { type: String, default: 'Indian' },
    image: { type: String, default: '' },
    isVeg: { type: Boolean, default: true },
    isAvailable: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    spicyLevel: { type: Number, default: 1 },
  },
  { timestamps: true }
);

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    phone: { type: String },
    role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
  },
  { timestamps: true }
);

const MenuItem = mongoose.models.MenuItem || mongoose.model('MenuItem', MenuItemSchema);
const User = mongoose.models.User || mongoose.model('User', UserSchema);

const menuItems = [
  // Starters
  { name: 'Paneer Tikka', description: 'Char-grilled cottage cheese marinated in spiced yogurt', price: 240, category: 'Starters', cuisine: 'Indian', image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=600&q=80', isVeg: true, isFeatured: true, spicyLevel: 2 },
  { name: 'Chicken Seekh Kebab', description: 'Minced chicken skewers with aromatic Indian spices', price: 290, category: 'Starters', cuisine: 'Indian', image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=600&q=80', isVeg: false, spicyLevel: 2 },
  { name: 'Crispy Chilli Potato', description: 'Crunchy potato fingers tossed in spicy Indo-Chinese sauce', price: 200, category: 'Starters', cuisine: 'Chinese', image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?auto=format&fit=crop&w=600&q=80', isVeg: true, isFeatured: true, spicyLevel: 2 },
  { name: 'Chicken Manchurian', description: 'Crispy chicken in a tangy, spicy Manchurian sauce', price: 280, category: 'Starters', cuisine: 'Chinese', image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80', isVeg: false, spicyLevel: 2 },
  { name: 'Cream of Tomato Soup', description: 'Velvety tomato soup with a hint of basil', price: 150, category: 'Starters', cuisine: 'Continental', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80', isVeg: true, spicyLevel: 0 },

  // Indian Mains
  { name: 'Butter Chicken', description: 'Tender chicken in a rich, creamy tomato gravy', price: 380, category: 'Indian Mains', cuisine: 'Indian', image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=600&q=80', isVeg: false, isFeatured: true, spicyLevel: 1 },
  { name: 'Paneer Butter Masala', description: 'Cottage cheese cubes in a buttery tomato-cashew gravy', price: 320, category: 'Indian Mains', cuisine: 'Indian', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80', isVeg: true, isFeatured: true, spicyLevel: 1 },
  { name: 'Dal Makhani', description: 'Slow-cooked black lentils with cream and butter', price: 260, category: 'Indian Mains', cuisine: 'Indian', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80', isVeg: true, spicyLevel: 1 },
  { name: 'Mutton Rogan Josh', description: 'Slow-braised mutton in aromatic Kashmiri spices', price: 460, category: 'Indian Mains', cuisine: 'Indian', image: 'https://images.unsplash.com/photo-1631292784640-2b24be784d5d?auto=format&fit=crop&w=600&q=80', isVeg: false, spicyLevel: 3 },
  { name: 'Palak Paneer', description: 'Cottage cheese cubes simmered in a creamy spinach gravy', price: 290, category: 'Indian Mains', cuisine: 'Indian', image: 'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?auto=format&fit=crop&w=600&q=80', isVeg: true, spicyLevel: 1 },

  // Chinese Mains
  { name: 'Kung Pao Chicken', description: 'Spicy stir-fried chicken with peanuts and chilies', price: 350, category: 'Chinese Mains', cuisine: 'Chinese', image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=80', isVeg: false, isFeatured: true, spicyLevel: 3 },
  { name: 'Veg Hakka Noodles', description: 'Stir-fried noodles with fresh vegetables and soy sauce', price: 240, category: 'Chinese Mains', cuisine: 'Chinese', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80', isVeg: true, spicyLevel: 1 },
  { name: 'Chilli Garlic Fried Rice', description: 'Wok-tossed rice with chilli, garlic and spring onions', price: 230, category: 'Chinese Mains', cuisine: 'Chinese', image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=600&q=80', isVeg: true, spicyLevel: 2 },
  { name: 'Sweet and Sour Chicken', description: 'Crispy chicken in a tangy sweet and sour glaze', price: 340, category: 'Chinese Mains', cuisine: 'Chinese', image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=600&q=80', isVeg: false, spicyLevel: 1 },

  // Continental Mains
  { name: 'Grilled Chicken Steak', description: 'Herb-marinated grilled chicken breast with sauteed veggies', price: 420, category: 'Continental Mains', cuisine: 'Continental', image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=600&q=80', isVeg: false, isFeatured: true, spicyLevel: 0 },
  { name: 'Spaghetti Aglio e Olio', description: 'Classic Italian pasta with garlic, olive oil and chilli flakes', price: 320, category: 'Continental Mains', cuisine: 'Continental', image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80', isVeg: true, spicyLevel: 1 },
  { name: 'Mushroom Risotto', description: 'Creamy arborio rice with wild mushrooms and parmesan', price: 360, category: 'Continental Mains', cuisine: 'Continental', image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=600&q=80', isVeg: true, spicyLevel: 0 },
  { name: 'Fish and Chips', description: 'Beer-battered fish fillet with crispy fries and tartar sauce', price: 390, category: 'Continental Mains', cuisine: 'Continental', image: 'https://images.unsplash.com/photo-1579208030886-b937da0925dc?auto=format&fit=crop&w=600&q=80', isVeg: false, spicyLevel: 0 },

  // Fast Food
  { name: 'Classic Cheeseburger', description: 'Juicy beef-style patty with cheddar, lettuce and special sauce', price: 250, category: 'Fast Food', cuisine: 'Fast Food', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80', isVeg: false, isFeatured: true, spicyLevel: 0 },
  { name: 'Veggie Loaded Burger', description: 'Crispy veg patty with cheese, lettuce and tangy mayo', price: 220, category: 'Fast Food', cuisine: 'Fast Food', image: 'https://images.unsplash.com/photo-1525059696034-4967a729002e?auto=format&fit=crop&w=600&q=80', isVeg: true, spicyLevel: 1 },
  { name: 'Loaded Cheese Fries', description: 'Crispy fries topped with melted cheese and jalapenos', price: 190, category: 'Fast Food', cuisine: 'Fast Food', image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=600&q=80', isVeg: true, spicyLevel: 2 },
  { name: 'Chicken Pop Corn', description: 'Bite-sized crispy fried chicken poppers', price: 230, category: 'Fast Food', cuisine: 'Fast Food', image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80', isVeg: false, spicyLevel: 2 },

  // Breads & Rice
  { name: 'Butter Naan', description: 'Soft leavened bread brushed with butter', price: 60, category: 'Breads & Rice', cuisine: 'Indian', image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=600&q=80', isVeg: true, spicyLevel: 0 },
  { name: 'Garlic Naan', description: 'Naan topped with garlic and fresh coriander', price: 70, category: 'Breads & Rice', cuisine: 'Indian', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80', isVeg: true, spicyLevel: 0 },
  { name: 'Jeera Rice', description: 'Basmati rice tempered with cumin seeds', price: 180, category: 'Breads & Rice', cuisine: 'Indian', image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=600&q=80', isVeg: true, spicyLevel: 0 },

  // Desserts
  { name: 'Gulab Jamun', description: 'Soft milk dumplings soaked in rose-flavored sugar syrup', price: 120, category: 'Desserts', cuisine: 'Indian', image: 'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=600&q=80', isVeg: true, isFeatured: true, spicyLevel: 0 },
  { name: 'Chocolate Lava Cake', description: 'Warm chocolate cake with a molten center, served with ice cream', price: 180, category: 'Desserts', cuisine: 'Continental', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80', isVeg: true, isFeatured: true, spicyLevel: 0 },
  { name: 'New York Cheesecake', description: 'Creamy baked cheesecake with a buttery biscuit base', price: 220, category: 'Desserts', cuisine: 'Continental', image: 'https://images.unsplash.com/photo-1567171466295-4afa63d45416?auto=format&fit=crop&w=600&q=80', isVeg: true, spicyLevel: 0 },

  // Beverages
  { name: 'Masala Chai', description: 'Traditional Indian spiced tea', price: 70, category: 'Beverages', cuisine: 'Indian', image: 'https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?auto=format&fit=crop&w=600&q=80', isVeg: true, spicyLevel: 0 },
  { name: 'Fresh Lime Soda', description: 'Refreshing lime soda, sweet or salted', price: 90, category: 'Beverages', cuisine: 'Cafe', image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=600&q=80', isVeg: true, spicyLevel: 0 },
  { name: 'Cold Coffee', description: 'Chilled coffee blended with milk and ice cream', price: 150, category: 'Beverages', cuisine: 'Cafe', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=80', isVeg: true, isFeatured: true, spicyLevel: 0 },
  { name: 'Mango Lassi', description: 'Thick yogurt-based mango smoothie', price: 130, category: 'Beverages', cuisine: 'Indian', image: 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?auto=format&fit=crop&w=600&q=80', isVeg: true, spicyLevel: 0 },
];

async function seed() {
  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI not found. Please set it in .env.local');
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');

  // Seed menu items
  await MenuItem.deleteMany({});
  await MenuItem.insertMany(menuItems);
  console.log(`Seeded ${menuItems.length} menu items`);

  // Seed admin user
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@cprfoodies.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123';

  const existingAdmin = await User.findOne({ email: adminEmail });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    await User.create({
      name: 'CPR Foodies Admin',
      email: adminEmail,
      password: hashedPassword,
      phone: '9876543210',
      role: 'admin',
    });
    console.log(`Admin user created: ${adminEmail} / ${adminPassword}`);
  } else {
    console.log('Admin user already exists, skipping');
  }

  await mongoose.disconnect();
  console.log('Seeding complete!');
}

seed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
