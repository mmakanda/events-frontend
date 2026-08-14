'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';
import { Menu, X } from 'lucide-react';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isSignedIn } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#faf8f5]/95 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
          <Link href="/" className={`font-serif text-xl font-semibold tracking-tight transition-colors ${scrolled ? 'text-[#2c2c2c]' : 'text-white'}`}>
            Gather & Feast
          </Link>
          
          <div className="hidden md:flex items-center gap-10">
            {['Services', 'Our Story', 'Testimonials', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} 
                className={`text-xs font-medium tracking-[2px] uppercase transition-colors hover:opacity-70 ${scrolled ? 'text-[#2c2c2c]' : 'text-white/85'}`}>
                {item}
              </a>
            ))}
            {isSignedIn ? (
              <Link href="/dashboard" className={`text-xs font-medium tracking-[1.5px] uppercase px-6 py-2.5 rounded transition-all ${scrolled ? 'bg-[#2c2c2c] text-white' : 'bg-white/15 text-white border border-white/30'}`}>
                My Dashboard
              </Link>
            ) : (
              <Link href="/login" className={`text-xs font-medium tracking-[1.5px] uppercase px-6 py-2.5 rounded transition-all ${scrolled ? 'bg-[#2c2c2c] text-white' : 'bg-white/15 text-white border border-white/30'}`}>
                Book a Consultation
              </Link>
            )}
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className={`md:hidden ${scrolled ? 'text-[#2c2c2c]' : 'text-white'}`}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-[#faf8f5] shadow-lg py-6 px-6 flex flex-col gap-4">
            {['Services', 'Our Story', 'Testimonials', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-[#2c2c2c] tracking-wide uppercase py-2">
                {item}
              </a>
            ))}
            {isSignedIn ? (
              <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="text-sm font-medium bg-[#2c2c2c] text-white text-center py-3 rounded">
                My Dashboard
              </Link>
            ) : (
              <Link href="/login" onClick={() => setMobileOpen(false)} className="text-sm font-medium bg-[#2c2c2c] text-white text-center py-3 rounded">
                Book a Consultation
              </Link>
            )}
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden">
        <Image
          src="/hero.jpg"
          alt="Elegant table setting with gold accents and greenery"
          fill
          priority
          quality={100}
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1e2319]/40 via-[#1e2319]/55 to-[#1e2319]/75" />
        
        <div className="relative z-10 max-w-4xl px-6 animate-[fadeUp_1.2s_ease-out]">
          <p className="text-[11px] font-medium tracking-[4px] uppercase text-white/85 mb-8">Catering & Event Planning</p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-[84px] font-normal text-white leading-[1.15] mb-7 drop-shadow-lg">
            Gather <em className="italic">beautifully.</em><br />
            Celebrate <em className="italic">fully.</em>
          </h1>
          <p className="text-base md:text-lg font-light text-white/85 max-w-xl mx-auto leading-relaxed mb-12 tracking-wide">
            Seasonal menus, thoughtful design, and seamless execution for weddings, corporate gatherings, and private celebrations across Southern Africa.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/register" className="bg-[#f5f0e8] text-[#2c2c2c] px-9 py-4 rounded text-sm font-medium tracking-wide hover:bg-white hover:-translate-y-0.5 transition-all shadow-lg">
              Plan your event
            </Link>
            <Link href="/services" className="bg-transparent text-white/90 px-9 py-4 rounded text-sm font-light tracking-wide border border-white/40 hover:bg-white/10 transition-all">
              Explore menus
            </Link>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </div>
      </section>

      {/* Philosophy */}
      <section id="our-story" className="py-36 px-6 bg-[#faf8f5] text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-[11px] font-medium tracking-[4px] uppercase text-[#8a9a7b] mb-6">Our Philosophy</p>
          <h2 className="font-serif text-3xl md:text-5xl font-normal text-[#2c2c2c] leading-tight mb-8">
            Every gathering tells a story.<br />
            We help you tell <em className="italic text-[#6b7d5a]">yours.</em>
          </h2>
          <p className="text-base font-light text-[#9e9488] leading-[1.9] max-w-xl mx-auto">
            From the first consultation to the final toast, we approach each event with intentionality and care. 
            Based in Johannesburg and Harare, we bring world-class catering and event planning to celebrations across Southern Africa.
          </p>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="pb-36 px-6 bg-[#faf8f5]">
        <div className="text-center mb-20">
          <h2 className="font-serif text-3xl md:text-4xl font-normal text-[#2c2c2c]">What We Do</h2>
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-px bg-[#e8e4dc] rounded-sm overflow-hidden">
          {[
            { num: '01', title: 'Wedding Catering', desc: 'From intimate umembeso ceremonies to grand white weddings. Custom menus blending tradition with modern elegance.' },
            { num: '02', title: 'Corporate Events', desc: 'Boardroom lunches in Sandton, product launches in Harare, and annual galas. Professional execution with African soul.' },
            { num: '03', title: 'Private Celebrations', desc: 'Milestone birthdays, lobola feasts, and family reunions. Bespoke menus honouring your heritage and tastes.' },
            { num: '04', title: 'Full Event Planning', desc: 'Venue sourcing across Gauteng and Mashonaland, décor, timeline management, and vendor curation — we handle every detail.' },
          ].map((s) => (
            <div key={s.num} className="bg-[#faf8f5] p-12 md:p-16 hover:bg-white transition-all cursor-pointer group">
              <p className="font-serif text-sm text-[#c4a35a] tracking-[2px] mb-4">{s.num}</p>
              <h3 className="font-serif text-2xl font-medium text-[#2c2c2c] mb-4 group-hover:text-[#6b7d5a] transition-colors">{s.title}</h3>
              <p className="text-sm font-light text-[#9e9488] leading-relaxed max-w-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Image Break */}
      <section 
        className="h-[60vh] min-h-[400px] relative overflow-hidden bg-fixed bg-cover bg-center"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2400&auto=format&fit=crop')` }}
      >
        <div className="absolute inset-0 bg-[#1e2319]/30" />
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-36 px-6 bg-[#f5f0e8]">
        <div className="text-center mb-20">
          <h2 className="font-serif text-3xl md:text-4xl font-normal text-[#2c2c2c]">Kind Words</h2>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { quote: 'Gather & Feast made our traditional wedding in Soweto absolutely magical. The fusion of modern plating with umqombothi and umngqusho had our guests talking for weeks.', name: 'Thandiwe & Sibusiso Nkosi', role: 'Wedding — Soweto, SA' },
            { quote: 'Our company launch in Harare needed to impress international investors. The team delivered a flawless event that balanced Zimbabwean hospitality with world-class standards.', name: 'Dr. Chipo Moyo', role: 'CEO, Nzira Holdings — Harare, ZW' },
            { quote: 'For my father\'s 70th birthday in Pretoria, they created a menu that honoured his Shona roots while feeling completely fresh. Every dish told a story of home.', name: 'Tendai Mutasa', role: 'Private Client — Pretoria, SA' },
          ].map((t, i) => (
            <div key={i} className="bg-white p-10 md:p-12 rounded-sm">
              <p className="font-serif text-5xl text-[#c4a35a] leading-none mb-4 opacity-60">&ldquo;</p>
              <p className="text-[15px] font-light text-[#2c2c2c] leading-[1.9] mb-8 italic">{t.quote}</p>
              <div className="border-t border-[#e8e4dc] pt-6">
                <p className="font-serif text-base font-semibold text-[#2c2c2c]">{t.name}</p>
                <p className="text-xs text-[#9e9488] tracking-[1px] uppercase mt-1">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-36 px-6 bg-[#2c2c2c] text-center">
        <h2 className="font-serif text-4xl md:text-5xl font-normal text-white mb-5">
          Let&apos;s create something <em className="italic text-[#c4a35a]">unforgettable.</em>
        </h2>
        <p className="text-base font-light text-white/60 max-w-lg mx-auto leading-relaxed mb-12">
          Serving Johannesburg, Harare, and beyond. Tell us about your vision and we&apos;ll craft a proposal tailored to your occasion.
        </p>
        <Link href="/register" className="inline-block bg-[#c4a35a] text-[#2c2c2c] px-11 py-5 rounded text-sm font-medium tracking-[1px] uppercase hover:bg-[#d4b76a] hover:-translate-y-0.5 transition-all shadow-xl">
          Start the Conversation
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] text-white/50 py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-16 mb-16">
          <div className="md:col-span-1">
            <Link href="/" className="font-serif text-xl font-semibold text-white block mb-5">Gather & Feast</Link>
            <p className="text-sm font-light leading-relaxed max-w-xs">
              Premium catering and event planning for discerning hosts. Based in Johannesburg and Harare, serving celebrations across Southern Africa.
            </p>
          </div>
          <div>
            <h4 className="text-[11px] font-medium tracking-[2px] uppercase text-white/80 mb-6">Services</h4>
            {['Weddings', 'Corporate', 'Private Dining', 'Event Planning'].map(l => (
              <a key={l} href="#" className="block text-sm font-light text-white/50 hover:text-[#c4a35a] transition-colors mb-3.5">{l}</a>
            ))}
          </div>
          <div>
            <h4 className="text-[11px] font-medium tracking-[2px] uppercase text-white/80 mb-6">Company</h4>
            {['Our Story', 'The Team', 'Careers', 'Press'].map(l => (
              <a key={l} href="#" className="block text-sm font-light text-white/50 hover:text-[#c4a35a] transition-colors mb-3.5">{l}</a>
            ))}
          </div>
          <div>
            <h4 className="text-[11px] font-medium tracking-[2px] uppercase text-white/80 mb-6">Connect</h4>
            {['Instagram', 'Pinterest', 'hello@gatherandfeast.com', '+27 11 555 0142'].map(l => (
              <a key={l} href="#" className="block text-sm font-light text-white/50 hover:text-[#c4a35a] transition-colors mb-3.5">{l}</a>
            ))}
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 text-center text-xs font-light tracking-wide">
          © 2026 Gather & Feast. Crafted with intention. Johannesburg · Harare
        </div>
      </footer>
    </div>
  );
}
