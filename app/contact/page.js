'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { Loader2, Send, MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || 'Failed to send message');
        return;
      }

      toast.success(data.message);
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <p className="text-gold-400 font-semibold uppercase tracking-wide text-sm mb-2">
          Get in Touch
        </p>
        <h1 className="font-display text-4xl font-bold mb-3">Contact Us</h1>
        <p className="text-charcoal-300 max-w-xl mx-auto">
          Questions, feedback, or special requests? We'd love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card-charcoal p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">Name *</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} className="input-dark" required />
              </div>
              <div>
                <label className="block text-sm mb-1">Email *</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} className="input-dark" required />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">Phone</label>
                <input type="tel" name="phone" value={form.phone} onChange={handleChange} className="input-dark" />
              </div>
              <div>
                <label className="block text-sm mb-1">Subject</label>
                <input type="text" name="subject" value={form.subject} onChange={handleChange} className="input-dark" placeholder="General Inquiry" />
              </div>
            </div>
            <div>
              <label className="block text-sm mb-1">Message *</label>
              <textarea name="message" value={form.message} onChange={handleChange} rows={5} className="input-dark" required />
            </div>
            <button type="submit" disabled={loading} className="btn-gold w-full disabled:opacity-60">
              {loading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="card-charcoal p-6">
            <h3 className="font-display text-xl font-semibold mb-4">Visit Us</h3>
            <div className="space-y-4 text-sm text-charcoal-300">
              <div className="flex items-start gap-3">
                <MapPin className="text-gold-500 mt-0.5" size={20} />
                <span>123 Spice Street, Connaught Place, New Delhi, 110001</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-gold-500" size={20} />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="text-gold-500" size={20} />
                <span>hello@cprfoodies.com</span>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="text-gold-500 mt-0.5" size={20} />
                <div>
                  <p>Mon - Fri: 11:00 AM - 11:00 PM</p>
                  <p>Sat - Sun: 10:00 AM - 12:00 AM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden h-64 border border-charcoal-700">
            <iframe
              title="CPR Foodies Location"
              width="100%"
              height="100%"
              loading="lazy"
              src="https://www.google.com/maps?q=Connaught+Place+New+Delhi&output=embed"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
