'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useCart } from '@/app/providers';
import { Menu, X, ShoppingCart, User, LogOut, LayoutDashboard } from 'lucide-react';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/about', label: 'About' },
  { href: '/reservations', label: 'Reservations' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  const { cartCount } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-charcoal-950/90 backdrop-blur-md border-b border-charcoal-700">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-display text-2xl font-bold text-gradient-gold">CPR Foodies</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-gold-400 ${
                pathname === link.href ? 'text-gold-400' : 'text-charcoal-200'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/cart" className="relative p-2 hover:text-gold-400 transition-colors">
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gold-500 text-charcoal-950 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {session ? (
            <div className="flex items-center gap-3">
              {session.user.role === 'admin' && (
                <Link href="/admin" className="btn-outline-gold !py-2 !px-3 text-sm">
                  <LayoutDashboard size={16} />
                  Admin
                </Link>
              )}
              <Link href="/account" className="flex items-center gap-2 text-sm hover:text-gold-400 transition-colors">
                <User size={18} />
                {session.user.name?.split(' ')[0]}
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="p-2 hover:text-gold-400 transition-colors"
                title="Sign out"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login" className="text-sm font-medium hover:text-gold-400 transition-colors">
                Login
              </Link>
              <Link href="/signup" className="btn-gold !py-2 !px-4 text-sm">
                Sign Up
              </Link>
            </div>
          )}
        </div>

        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-charcoal-900 border-t border-charcoal-700 px-4 py-4 space-y-3">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`block text-sm font-medium ${
                pathname === link.href ? 'text-gold-400' : 'text-charcoal-200'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/cart" onClick={() => setOpen(false)} className="block text-sm font-medium text-charcoal-200">
            Cart ({cartCount})
          </Link>
          {session ? (
            <>
              {session.user.role === 'admin' && (
                <Link href="/admin" onClick={() => setOpen(false)} className="block text-sm font-medium text-gold-400">
                  Admin Dashboard
                </Link>
              )}
              <Link href="/account" onClick={() => setOpen(false)} className="block text-sm font-medium text-charcoal-200">
                My Account
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="block text-sm font-medium text-charcoal-200"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" onClick={() => setOpen(false)} className="block text-sm font-medium text-charcoal-200">
                Login
              </Link>
              <Link href="/signup" onClick={() => setOpen(false)} className="block text-sm font-medium text-gold-400">
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
