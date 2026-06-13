'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/app/providers';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <ShoppingBag size={48} className="mx-auto text-charcoal-500 mb-4" />
        <h1 className="font-display text-3xl font-bold mb-2">Your cart is empty</h1>
        <p className="text-charcoal-300 mb-6">Looks like you haven't added anything yet.</p>
        <Link href="/menu" className="btn-gold">
          Browse Menu <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  const deliveryFee = cartTotal > 0 ? 40 : 0;
  const gst = Math.round(cartTotal * 0.05);
  const grandTotal = cartTotal + deliveryFee + gst;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-display text-3xl font-bold mb-8">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div key={item._id} className="card-charcoal p-4 flex gap-4 items-center">
              <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=200&q=80'}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gold-400 font-bold">₹{item.price}</p>
              </div>
              <div className="flex items-center gap-3 border border-charcoal-700 rounded-lg px-2 py-1">
                <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="p-1 hover:text-gold-400">
                  <Minus size={16} />
                </button>
                <span className="w-6 text-center">{item.quantity}</span>
                <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="p-1 hover:text-gold-400">
                  <Plus size={16} />
                </button>
              </div>
              <button onClick={() => removeFromCart(item._id)} className="p-2 text-charcoal-400 hover:text-red-400">
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        <div className="card-charcoal p-6 h-fit">
          <h2 className="font-display text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-2 text-sm text-charcoal-300 mb-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{cartTotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>₹{deliveryFee}</span>
            </div>
            <div className="flex justify-between">
              <span>GST (5%)</span>
              <span>₹{gst}</span>
            </div>
          </div>
          <div className="border-t border-charcoal-700 pt-4 flex justify-between font-semibold text-lg mb-6">
            <span>Total</span>
            <span className="text-gold-400">₹{grandTotal}</span>
          </div>
          <Link href="/checkout" className="btn-gold w-full">
            Proceed to Checkout <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
