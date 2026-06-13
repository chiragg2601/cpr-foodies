import Image from 'next/image';
import { ChefHat, Globe2, Heart, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div>
      <section className="relative h-72 sm:h-96 flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=80"
          alt="CPR Foodies kitchen"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-charcoal-950/70" />
        <div className="relative z-10 text-center px-4">
          <p className="text-gold-400 font-semibold uppercase tracking-wide text-sm mb-2">About Us</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold">Our Story</h1>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <p className="text-lg text-charcoal-200 leading-relaxed mb-6">
          CPR Foodies was born from a simple idea: why should a meal out mean choosing just
          one cuisine? Our kitchen brings together the warmth of Indian home-style cooking,
          the bold flavors of Chinese stir-fry, the comfort of Continental classics, and the
          quick satisfaction of fast food favorites — all crafted with the same care and
          quality, no matter what's on your plate.
        </p>
        <p className="text-lg text-charcoal-200 leading-relaxed">
          Whether you're here for a quiet weekday lunch, a celebratory family dinner, or
          ordering in for a cozy night at home, we want every CPR Foodies experience to feel
          like a treat. Our elegant dark and gold dining space, friendly staff, and carefully
          sourced ingredients come together to create food and moments worth remembering.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        <div className="text-center">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gold-500/10 flex items-center justify-center">
            <ChefHat className="text-gold-400" size={26} />
          </div>
          <h3 className="font-display text-lg font-semibold mb-1">Expert Chefs</h3>
          <p className="text-sm text-charcoal-300">Specialist chefs for every cuisine on our menu.</p>
        </div>
        <div className="text-center">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gold-500/10 flex items-center justify-center">
            <Globe2 className="text-gold-400" size={26} />
          </div>
          <h3 className="font-display text-lg font-semibold mb-1">Global Flavors</h3>
          <p className="text-sm text-charcoal-300">Authentic recipes from India, China, Europe and beyond.</p>
        </div>
        <div className="text-center">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gold-500/10 flex items-center justify-center">
            <Heart className="text-gold-400" size={26} />
          </div>
          <h3 className="font-display text-lg font-semibold mb-1">Made with Love</h3>
          <p className="text-sm text-charcoal-300">Every dish is prepared fresh, with genuine care.</p>
        </div>
        <div className="text-center">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gold-500/10 flex items-center justify-center">
            <Award className="text-gold-400" size={26} />
          </div>
          <h3 className="font-display text-lg font-semibold mb-1">Quality First</h3>
          <p className="text-sm text-charcoal-300">Carefully sourced ingredients, consistent quality.</p>
        </div>
      </section>
    </div>
  );
}
