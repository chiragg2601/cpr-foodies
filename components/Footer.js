import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-charcoal-950 border-t border-charcoal-700 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-display text-2xl font-bold text-gradient-gold mb-3">CPR Foodies</h3>
          <p className="text-sm text-charcoal-300 leading-relaxed">
            Where Indian spice, Chinese flair, Continental elegance and quick fast-food bites
            come together on one menu. Dine in, order online, or book your table today.
          </p>
          <div className="flex gap-3 mt-4">
            <a href="#" className="p-2 rounded-full border border-charcoal-700 hover:border-gold-500 hover:text-gold-400 transition-colors">
              <Instagram size={18} />
            </a>
            <a href="#" className="p-2 rounded-full border border-charcoal-700 hover:border-gold-500 hover:text-gold-400 transition-colors">
              <Facebook size={18} />
            </a>
            <a href="#" className="p-2 rounded-full border border-charcoal-700 hover:border-gold-500 hover:text-gold-400 transition-colors">
              <Twitter size={18} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gold-400 mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-charcoal-300">
            <li><Link href="/menu" className="hover:text-gold-400 transition-colors">Our Menu</Link></li>
            <li><Link href="/reservations" className="hover:text-gold-400 transition-colors">Book a Table</Link></li>
            <li><Link href="/about" className="hover:text-gold-400 transition-colors">About Us</Link></li>
            <li><Link href="/reviews" className="hover:text-gold-400 transition-colors">Reviews</Link></li>
            <li><Link href="/contact" className="hover:text-gold-400 transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gold-400 mb-3">Contact Us</h4>
          <ul className="space-y-3 text-sm text-charcoal-300">
            <li className="flex items-start gap-2">
              <MapPin size={18} className="text-gold-500 mt-0.5 flex-shrink-0" />
              <span>123 Spice Street, Connaught Place, New Delhi, 110001</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={18} className="text-gold-500 flex-shrink-0" />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={18} className="text-gold-500 flex-shrink-0" />
              <span>hello@cprfoodies.com</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gold-400 mb-3">Opening Hours</h4>
          <ul className="space-y-2 text-sm text-charcoal-300">
            <li className="flex items-center gap-2">
              <Clock size={18} className="text-gold-500 flex-shrink-0" />
              <span>Mon - Fri: 11:00 AM - 11:00 PM</span>
            </li>
            <li className="flex items-center gap-2">
              <Clock size={18} className="text-gold-500 flex-shrink-0" />
              <span>Sat - Sun: 10:00 AM - 12:00 AM</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-charcoal-700 py-4 text-center text-xs text-charcoal-400">
        &copy; {new Date().getFullYear()} CPR Foodies. All rights reserved.
      </div>
    </footer>
  );
}
