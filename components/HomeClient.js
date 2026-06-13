'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MenuCard from '@/components/MenuCard';
import HeroSlideshow from '@/components/HeroSlideshow';
import ScrollReveal from '@/components/ScrollReveal';
import { ArrowRight, UtensilsCrossed, Truck, CalendarCheck, Star } from 'lucide-react';

export default function HomeClient({ featured }) {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/menu');
    }, 10000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[85vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <HeroSlideshow />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-950/70 via-charcoal-950/60 to-charcoal-950" />
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <p className="text-gold-400 font-semibold tracking-widest uppercase mb-3 text-sm">
            Indian · Chinese · Continental · Fast Food
          </p>
          <h1 className="font-display text-4xl sm:text-6xl font-bold mb-4">
            Welcome to <span className="text-gradient-gold">CPR Foodies</span>
          </h1>
          <p className="text-charcoal-200 text-lg mb-8 max-w-xl mx-auto">
            One menu, every craving covered. Elegant dining, doorstep delivery, and flavors
            from across the world — all under one roof.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/menu" className="btn-gold">
              View Menu <ArrowRight size={18} />
            </Link>
            <Link href="/reservations" className="btn-outline-gold">
              Book a Table
            </Link>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div className="card-charcoal p-6 text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gold-500/10 flex items-center justify-center">
            <UtensilsCrossed className="text-gold-400" size={24} />
          </div>
          <h3 className="font-display text-xl font-semibold mb-2">Multi-Cuisine Menu</h3>
          <p className="text-charcoal-300 text-sm">
            From butter chicken to dim sum, pasta to burgers — flavors for every mood.
          </p>
        </div>
        <div className="card-charcoal p-6 text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gold-500/10 flex items-center justify-center">
            <Truck className="text-gold-400" size={24} />
          </div>
          <h3 className="font-display text-xl font-semibold mb-2">Fast Delivery & Pickup</h3>
          <p className="text-charcoal-300 text-sm">
            Order online and get it delivered hot, or pick it up at your convenience.
          </p>
        </div>
        <div className="card-charcoal p-6 text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gold-500/10 flex items-center justify-center">
            <CalendarCheck className="text-gold-400" size={24} />
          </div>
          <h3 className="font-display text-xl font-semibold mb-2">Easy Reservations</h3>
          <p className="text-charcoal-300 text-sm">
            Reserve your table online in seconds for any occasion, big or small.
          </p>
        </div>
      </section>

      {/* Featured Items */}
      {featured.length > 0 && (
        <ScrollReveal>
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-gold-400 font-semibold uppercase tracking-wide text-sm mb-1">
                  Chef's Picks
                </p>
                <h2 className="font-display text-3xl font-bold">Featured Dishes</h2>
              </div>
              <Link href="/menu" className="text-gold-400 font-medium hover:underline hidden sm:flex items-center gap-1">
                View Full Menu <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featured.map((item) => (
                <MenuCard key={item._id} item={item} />
              ))}
            </div>
          </section>
        </ScrollReveal>
      )}

      {/* Ambience Gallery */}
      <section className="mt-16 mb-16">
        <ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8">
          <p className="text-gold-400 font-semibold uppercase tracking-wide text-sm mb-1">
            Step Inside
          </p>
          <h2 className="font-display text-3xl font-bold">The CPR Foodies Experience</h2>
          <p className="text-charcoal-300 max-w-2xl mx-auto mt-2">
            Warm lighting, rich textures, and a menu that travels the world — come see why
            our guests love to linger.
          </p>
        </ScrollReveal>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 auto-rows-[160px] sm:auto-rows-[200px]">
          <ScrollReveal delay={0} className="col-span-2 row-span-2">
            <div className="relative w-full h-full rounded-xl overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80"
                alt="CPR Foodies dining hall with warm gold lighting"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div className="relative w-full h-full rounded-xl overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=500&q=80"
                alt="Elegant table setting"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div className="relative w-full h-full rounded-xl overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=500&q=80"
                alt="Restaurant bar area"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={300}>
            <div className="relative w-full h-full rounded-xl overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=500&q=80"
                alt="Chef plating a dish"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={400}>
            <div className="relative w-full h-full rounded-xl overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?auto=format&fit=crop&w=500&q=80"
                alt="Cozy seating area with gold accents"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-gold-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col sm:flex-row items-center justify-between gap-6 text-charcoal-950">
          <div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold mb-1">Planning a visit?</h3>
            <p className="text-charcoal-800">Reserve your table and let us take care of the rest.</p>
          </div>
          <Link href="/reservations" className="bg-charcoal-950 text-gold-400 font-semibold px-6 py-3 rounded-lg hover:bg-charcoal-800 transition-colors flex items-center gap-2">
            Book a Table <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Testimonial teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="flex justify-center mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={20} className="text-gold-400 fill-gold-400" />
          ))}
        </div>
        <p className="text-xl font-display italic max-w-2xl mx-auto mb-3">
          "CPR Foodies is the only place where my entire family agrees on what to order —
          and that says a lot!"
        </p>
        <p className="text-charcoal-400 text-sm mb-6">— A happy regular customer</p>
        <Link href="/reviews" className="text-gold-400 font-medium hover:underline">
          Read more reviews
        </Link>
      </section>
    </div>
  );
}
