'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import StatusBadge from '@/components/StatusBadge';
import { User, Package, CalendarCheck } from 'lucide-react';

export default function AccountPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/account');
    }
  }, [status, router]);

  useEffect(() => {
    if (status !== 'authenticated') return;

    const fetchData = async () => {
      try {
        const [ordersRes, reservationsRes] = await Promise.all([
          fetch('/api/orders'),
          fetch('/api/reservations'),
        ]);
        const ordersData = await ordersRes.json();
        const reservationsData = await reservationsRes.json();
        setOrders(ordersData.orders || []);
        setReservations(reservationsData.reservations || []);
      } catch (e) {
        // ignore
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [status]);

  if (status === 'loading' || status === 'unauthenticated') {
    return <div className="text-center py-24 text-charcoal-400">Loading...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center">
          <User className="text-gold-400" size={24} />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold">{session.user.name}</h1>
          <p className="text-charcoal-400 text-sm">{session.user.email}</p>
        </div>
      </div>

      {loading ? (
        <p className="text-center text-charcoal-400">Loading your history...</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Orders */}
          <div>
            <h2 className="font-display text-xl font-semibold mb-4 flex items-center gap-2">
              <Package size={20} className="text-gold-400" /> My Orders
            </h2>
            {orders.length === 0 ? (
              <p className="text-charcoal-400 text-sm">No orders yet.</p>
            ) : (
              <div className="space-y-3">
                {orders.map((order) => (
                  <div key={order._id} className="card-charcoal p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-sm text-charcoal-400">
                          {new Date(order.createdAt).toLocaleDateString('en-IN', {
                            year: 'numeric', month: 'short', day: 'numeric',
                          })}
                        </p>
                        <p className="font-semibold text-gold-400">₹{order.totalAmount}</p>
                      </div>
                      <StatusBadge status={order.status} />
                    </div>
                    <ul className="text-sm text-charcoal-300 space-y-0.5">
                      {order.items.map((item, idx) => (
                        <li key={idx}>{item.name} x{item.quantity}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Reservations */}
          <div>
            <h2 className="font-display text-xl font-semibold mb-4 flex items-center gap-2">
              <CalendarCheck size={20} className="text-gold-400" /> My Reservations
            </h2>
            {reservations.length === 0 ? (
              <p className="text-charcoal-400 text-sm">No reservations yet.</p>
            ) : (
              <div className="space-y-3">
                {reservations.map((res) => (
                  <div key={res._id} className="card-charcoal p-4">
                    <div className="flex justify-between items-start mb-1">
                      <p className="font-semibold">{res.date} at {res.time}</p>
                      <StatusBadge status={res.status} />
                    </div>
                    <p className="text-sm text-charcoal-300">{res.guests} guests</p>
                    {res.specialRequest && (
                      <p className="text-xs text-charcoal-400 mt-1">Note: {res.specialRequest}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
