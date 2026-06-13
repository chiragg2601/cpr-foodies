'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { Loader2, CalendarCheck } from 'lucide-react';

const TIME_SLOTS = [
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
  '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM',
];

export default function ReservationsPage() {
  const { data: session } = useSession();

  const [form, setForm] = useState({
    name: session?.user?.name || '',
    email: session?.user?.email || '',
    phone: '',
    date: '',
    time: '',
    guests: 2,
    specialRequest: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === 'guests' ? Number(value) : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || 'Something went wrong');
        return;
      }

      toast.success('Reservation request submitted! We will confirm shortly.');
      setForm({ ...form, date: '', time: '', specialRequest: '' });
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <p className="text-gold-400 font-semibold uppercase tracking-wide text-sm mb-2">
          Book a Table
        </p>
        <h1 className="font-display text-4xl font-bold mb-3">Reserve Your Spot</h1>
        <p className="text-charcoal-300 max-w-xl mx-auto">
          Planning a dinner with friends, family, or a special occasion? Reserve a table at
          CPR Foodies and we'll have it ready for you.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="card-charcoal p-6 sm:p-8 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Full Name *</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} className="input-dark" required />
          </div>
          <div>
            <label className="block text-sm mb-1">Email *</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} className="input-dark" required />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Phone Number *</label>
            <input type="tel" name="phone" value={form.phone} onChange={handleChange} className="input-dark" required />
          </div>
          <div>
            <label className="block text-sm mb-1">Number of Guests *</label>
            <input type="number" name="guests" min="1" max="20" value={form.guests} onChange={handleChange} className="input-dark" required />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Date *</label>
            <input type="date" name="date" min={today} value={form.date} onChange={handleChange} className="input-dark" required />
          </div>
          <div>
            <label className="block text-sm mb-1">Time *</label>
            <select name="time" value={form.time} onChange={handleChange} className="input-dark" required>
              <option value="">Select a time</option>
              {TIME_SLOTS.map((slot) => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm mb-1">Special Requests (optional)</label>
          <textarea
            name="specialRequest"
            value={form.specialRequest}
            onChange={handleChange}
            rows={3}
            placeholder="Birthday celebration, window seating, dietary requirements, etc."
            className="input-dark"
          />
        </div>

        <button type="submit" disabled={loading} className="btn-gold w-full disabled:opacity-60">
          {loading ? <Loader2 className="animate-spin" size={18} /> : <CalendarCheck size={18} />}
          {loading ? 'Submitting...' : 'Reserve Table'}
        </button>
      </form>
    </div>
  );
}
