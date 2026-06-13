'use client';

import { useEffect, useState } from 'react';
import { Mail } from 'lucide-react';

export default function AdminMessagesTab() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch('/api/contact');
        const data = await res.json();
        setMessages(data.messages || []);
      } catch (e) {
        setMessages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div>
      <h2 className="font-display text-xl font-semibold mb-6">Contact Messages ({messages.length})</h2>

      {loading ? (
        <p className="text-charcoal-400 text-center">Loading...</p>
      ) : messages.length === 0 ? (
        <p className="text-charcoal-400 text-center">No messages yet.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg._id} className="card-charcoal p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-gold-400" />
                  <span className="font-semibold">{msg.name}</span>
                  <span className="text-charcoal-400 text-sm">({msg.email})</span>
                </div>
                <span className="text-charcoal-400 text-xs">
                  {new Date(msg.createdAt).toLocaleString('en-IN')}
                </span>
              </div>
              <p className="text-gold-400 text-sm font-medium mb-1">{msg.subject || 'General Inquiry'}</p>
              <p className="text-charcoal-300 text-sm">{msg.message}</p>
              {msg.phone && <p className="text-charcoal-400 text-xs mt-2">Phone: {msg.phone}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
