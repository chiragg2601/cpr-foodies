'use client';

import { useEffect, useState } from 'react';
import StatusBadge from '@/components/StatusBadge';
import toast from 'react-hot-toast';

const ORDER_STATUSES = ['pending', 'confirmed', 'preparing', 'out-for-delivery', 'delivered', 'cancelled'];

export default function AdminOrdersTab() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      setOrders(data.orders || []);
    } catch (e) {
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || 'Failed to update order');
        return;
      }

      toast.success('Order status updated');
      setOrders((prev) => prev.map((o) => (o._id === id ? { ...o, status } : o)));
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  return (
    <div>
      <h2 className="font-display text-xl font-semibold mb-6">Orders ({orders.length})</h2>

      {loading ? (
        <p className="text-charcoal-400 text-center">Loading...</p>
      ) : orders.length === 0 ? (
        <p className="text-charcoal-400 text-center">No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="card-charcoal p-4">
              <div className="flex flex-wrap justify-between items-start gap-3 mb-3">
                <div>
                  <p className="font-semibold">
                    {order.guestInfo?.name || 'Registered Customer'}
                    {order.guestInfo?.phone && (
                      <span className="text-charcoal-400 font-normal text-sm"> · {order.guestInfo.phone}</span>
                    )}
                  </p>
                  <p className="text-charcoal-400 text-xs">
                    {new Date(order.createdAt).toLocaleString('en-IN')}
                  </p>
                  <p className="text-charcoal-400 text-sm mt-1">
                    {order.orderType === 'delivery' ? `Deliver to: ${order.deliveryAddress}` : 'Pickup'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-gold-400 font-bold text-lg">₹{order.totalAmount}</p>
                  <StatusBadge status={order.status} />
                </div>
              </div>

              <ul className="text-sm text-charcoal-300 mb-3 space-y-0.5">
                {order.items.map((item, idx) => (
                  <li key={idx}>{item.name} x{item.quantity} — ₹{item.price * item.quantity}</li>
                ))}
              </ul>

              <div className="flex items-center gap-2">
                <label className="text-sm text-charcoal-400">Update status:</label>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  className="input-dark !w-auto !py-1.5 text-sm"
                >
                  {ORDER_STATUSES.map((s) => (
                    <option key={s} value={s}>{s.replace(/-/g, ' ')}</option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
