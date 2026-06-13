'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Script from 'next/script';
import { useCart } from '@/app/providers';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const { data: session } = useSession();
  const router = useRouter();

  const [form, setForm] = useState({
    name: session?.user?.name || '',
    email: session?.user?.email || '',
    phone: '',
    address: '',
    orderType: 'delivery',
  });
  const [loading, setLoading] = useState(false);

  const deliveryFee = form.orderType === 'delivery' ? 40 : 0;
  const gst = Math.round(cartTotal * 0.05);
  const grandTotal = cartTotal + deliveryFee + gst;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    if (!form.name || !form.email || !form.phone || (form.orderType === 'delivery' && !form.address)) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      const orderRes = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: grandTotal }),
      });
      const orderData = await orderRes.json();

      if (!orderData.order) {
        toast.error('Could not initiate payment. Please check Razorpay configuration.');
        setLoading(false);
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.order.amount,
        currency: 'INR',
        name: 'CPR Foodies',
        description: 'Order Payment',
        order_id: orderData.order.id,
        theme: { color: '#d4a017' },
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        handler: async function (response) {
          const verifyRes = await fetch('/api/razorpay/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              items: cart.map((i) => ({
                menuItem: i._id,
                name: i.name,
                price: i.price,
                quantity: i.quantity,
              })),
              totalAmount: grandTotal,
              deliveryAddress: form.orderType === 'delivery' ? form.address : 'Pickup at restaurant',
              orderType: form.orderType,
              guestInfo: { name: form.name, email: form.email, phone: form.phone },
            }),
          });

          const verifyData = await verifyRes.json();

          if (verifyRes.ok) {
            clearCart();
            toast.success('Order placed successfully!');
            router.push('/order-success');
          } else {
            toast.error(verifyData.error || 'Payment verification failed');
          }
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-display text-3xl font-bold mb-8">Checkout</h1>

        <form onSubmit={handlePayment} className="card-charcoal p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Full Name *</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="input-dark"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Email *</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="input-dark"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Phone Number *</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="input-dark"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Order Type</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="radio"
                  name="orderType"
                  value="delivery"
                  checked={form.orderType === 'delivery'}
                  onChange={handleChange}
                  className="accent-gold-500"
                />
                Delivery
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="radio"
                  name="orderType"
                  value="pickup"
                  checked={form.orderType === 'pickup'}
                  onChange={handleChange}
                  className="accent-gold-500"
                />
                Pickup
              </label>
            </div>
          </div>

          {form.orderType === 'delivery' && (
            <div>
              <label className="block text-sm mb-1">Delivery Address *</label>
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                rows={3}
                className="input-dark"
                required
              />
            </div>
          )}

          <div className="border-t border-charcoal-700 pt-4 space-y-2 text-sm text-charcoal-300">
            <div className="flex justify-between"><span>Subtotal</span><span>₹{cartTotal}</span></div>
            <div className="flex justify-between"><span>Delivery Fee</span><span>₹{deliveryFee}</span></div>
            <div className="flex justify-between"><span>GST (5%)</span><span>₹{gst}</span></div>
            <div className="flex justify-between font-semibold text-lg text-white pt-2">
              <span>Total</span><span className="text-gold-400">₹{grandTotal}</span>
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-gold w-full disabled:opacity-60">
            {loading ? <Loader2 className="animate-spin" size={18} /> : null}
            {loading ? 'Processing...' : `Pay ₹${grandTotal}`}
          </button>
        </form>
      </div>
    </>
  );
}
