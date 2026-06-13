import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

export default function OrderSuccessPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <CheckCircle2 size={64} className="mx-auto text-green-500 mb-4" />
      <h1 className="font-display text-3xl font-bold mb-2">Order Placed Successfully!</h1>
      <p className="text-charcoal-300 mb-8">
        Thank you for ordering from CPR Foodies. We're preparing your food and will have it
        ready soon. You can track your order status from your account page.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link href="/account" className="btn-gold">View My Orders</Link>
        <Link href="/menu" className="btn-outline-gold">Order More</Link>
      </div>
    </div>
  );
}
