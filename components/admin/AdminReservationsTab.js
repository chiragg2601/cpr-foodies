'use client';

import { useEffect, useState } from 'react';
import StatusBadge from '@/components/StatusBadge';
import toast from 'react-hot-toast';

const RESERVATION_STATUSES = ['pending', 'confirmed', 'completed', 'cancelled'];

export default function AdminReservationsTab() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/reservations');
      const data = await res.json();
      setReservations(data.reservations || []);
    } catch (e) {
      setReservations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      const res = await fetch(`/api/reservations/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || 'Failed to update reservation');
        return;
      }

      toast.success('Reservation status updated');
      setReservations((prev) => prev.map((r) => (r._id === id ? { ...r, status } : r)));
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  return (
    <div>
      <h2 className="font-display text-xl font-semibold mb-6">Reservations ({reservations.length})</h2>

      {loading ? (
        <p className="text-charcoal-400 text-center">Loading...</p>
      ) : reservations.length === 0 ? (
        <p className="text-charcoal-400 text-center">No reservations yet.</p>
      ) : (
        <div className="overflow-x-auto card-charcoal">
          <table className="w-full text-sm">
            <thead className="border-b border-charcoal-700 text-charcoal-400 text-left">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Contact</th>
                <th className="p-3">Date & Time</th>
                <th className="p-3">Guests</th>
                <th className="p-3">Note</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((res) => (
                <tr key={res._id} className="border-b border-charcoal-800 last:border-0">
                  <td className="p-3 font-medium">{res.name}</td>
                  <td className="p-3 text-charcoal-300">
                    {res.email}<br />{res.phone}
                  </td>
                  <td className="p-3 text-charcoal-300">{res.date}<br />{res.time}</td>
                  <td className="p-3 text-charcoal-300">{res.guests}</td>
                  <td className="p-3 text-charcoal-400 text-xs max-w-[150px]">{res.specialRequest || '-'}</td>
                  <td className="p-3">
                    <div className="flex flex-col gap-1">
                      <StatusBadge status={res.status} />
                      <select
                        value={res.status}
                        onChange={(e) => handleStatusChange(res._id, e.target.value)}
                        className="input-dark !w-auto !py-1 text-xs"
                      >
                        {RESERVATION_STATUSES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
