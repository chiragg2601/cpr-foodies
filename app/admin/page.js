'use client';

import { useState } from 'react';
import AdminGuard from '@/components/AdminGuard';
import AdminMenuTab from '@/components/admin/AdminMenuTab';
import AdminOrdersTab from '@/components/admin/AdminOrdersTab';
import AdminReservationsTab from '@/components/admin/AdminReservationsTab';
import AdminMessagesTab from '@/components/admin/AdminMessagesTab';
import { Utensils, Package, CalendarCheck, Mail } from 'lucide-react';

const TABS = [
  { id: 'menu', label: 'Menu', icon: Utensils },
  { id: 'orders', label: 'Orders', icon: Package },
  { id: 'reservations', label: 'Reservations', icon: CalendarCheck },
  { id: 'messages', label: 'Messages', icon: Mail },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('menu');

  return (
    <AdminGuard>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="font-display text-3xl font-bold mb-6">Admin Dashboard</h1>

        <div className="flex flex-wrap gap-2 mb-8 border-b border-charcoal-700 pb-2">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-gold-gradient text-charcoal-950'
                    : 'text-charcoal-300 hover:text-gold-400'
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {activeTab === 'menu' && <AdminMenuTab />}
        {activeTab === 'orders' && <AdminOrdersTab />}
        {activeTab === 'reservations' && <AdminReservationsTab />}
        {activeTab === 'messages' && <AdminMessagesTab />}
      </div>
    </AdminGuard>
  );
}
