'use client';

import Link from 'next/link';
import { ArrowLeft, UtensilsCrossed, Wine, Cake, PartyPopper, Briefcase, TreePine, Heart } from 'lucide-react';

const services = [
  {
    icon: <Heart className="w-6 h-6" />,
    title: 'Wedding Catering',
    description: 'From traditional ceremonies to modern receptions. We specialise in fusion menus that honour your heritage — whether it\'s a white wedding in Sandton or umembeso in KwaZulu-Natal.',
    price: 'From R450 per person',
  },
  {
    icon: <Briefcase className="w-6 h-6" />,
    title: 'Corporate Events',
    description: 'Impress clients and celebrate teams with professionally executed events. From boardroom lunches in Rosebank to product launches at the Harare International Conference Centre.',
    price: 'From R350 per person',
  },
  {
    icon: <PartyPopper className="w-6 h-6" />,
    title: 'Private Celebrations',
    description: 'Milestone birthdays, anniversaries, lobola feasts, and family reunions. Every menu is crafted around your story, your family\'s favourites, and your cultural traditions.',
    price: 'From R400 per person',
  },
  {
    icon: <UtensilsCrossed className="w-6 h-6" />,
    title: 'Buffet Catering',
    description: 'Elegant buffet spreads featuring Southern African classics alongside international cuisine. Perfect for large gatherings, corporate functions, and community events.',
    price: 'From R280 per person',
  },
  {
    icon: <Wine className="w-6 h-6" />,
    title: 'Plated Fine Dining',
    description: 'Multi-course tasting menus with wine pairings. Our chefs blend French technique with African ingredients — think warthog carpaccio, mopane worm canapés, and malva pudding reimagined.',
    price: 'From R650 per person',
  },
  {
    icon: <Cake className="w-6 h-6" />,
    title: 'Finger Foods & Canapés',
    description: 'Sophisticated bite-sized creations for cocktail receptions and networking events. Mini bunny chows, boerewors skewers, and Zambezi bream tartlets.',
    price: 'From R180 per person',
  },
  {
    icon: <TreePine className="w-6 h-6" />,
    title: 'Outdoor Events',
    description: 'Bush dinners, garden parties, and vineyard weddings. We bring the kitchen to you — fully equipped mobile setups for any location across Gauteng, Limpopo, or Mashonaland.',
    price: 'Custom quote',
  },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Header */}
      <div className="bg-[#2c2c2c] text-white py-24 px-6 text-center">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors mb-8">
          <ArrowLeft size={16} /> Back to home
        </Link>
        <h1 className="font-serif text-4xl md:text-6xl font-normal mb-4">Our Services</h1>
        <p className="text-white/60 font-light max-w-xl mx-auto">
          Full-service catering and event planning across Southern Africa. Every menu, every detail, tailored to you.
        </p>
      </div>

      {/* Services List */}
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="space-y-px bg-[#e8e4dc] rounded-sm overflow-hidden">
          {services.map((service, i) => (
            <div key={i} className="bg-[#faf8f5] p-8 md:p-12 hover:bg-white transition-all">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-[#f5f0e8] rounded-sm flex items-center justify-center text-[#8a9a7b] flex-shrink-0">
                  {service.icon}
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                    <h3 className="font-serif text-xl font-medium text-[#2c2c2c]">{service.title}</h3>
                    <span className="text-sm text-[#c4a35a] font-medium">{service.price}</span>
                  </div>
                  <p className="text-sm font-light text-[#9e9488] leading-relaxed">{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-[#9e9488] font-light mb-6">Ready to discuss your event?</p>
          <Link href="/register" className="inline-block bg-[#2c2c2c] text-white px-10 py-4 rounded text-sm font-medium tracking-wide hover:bg-[#1a1a1a] transition-colors">
            Request a Quote
          </Link>
        </div>
      </div>
    </div>
  );
}
