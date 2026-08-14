'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUser, useAuth } from '@clerk/nextjs';
import { Plus, Calendar, MapPin, Users, ArrowRight, LogOut } from 'lucide-react';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const { signOut, getToken } = useAuth();
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded || !user) return;

    const fetchEvents = async () => {
      try {
        const token = await getToken();
        const res = await axios.get(`${API_URL}/api/events`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEvents(res.data.events);
      } catch (err) {
        console.error('Failed to fetch events', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [isLoaded, user, getToken]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#8a9a7b] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <header className="bg-white border-b border-[#e8e4dc]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-serif text-xl font-semibold text-[#2c2c2c]">Gather & Feast</Link>
          <div className="flex items-center gap-6">
            <span className="text-sm text-[#9e9488]">Hello, {user?.firstName || 'Guest'}</span>
            <button onClick={() => signOut({ redirectUrl: '/' })} className="text-sm text-[#9e9488] hover:text-[#2c2c2c] flex items-center gap-1.5 transition-colors">
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-10">
          <h1 className="font-serif text-3xl font-normal text-[#2c2c2c]">My Events</h1>
          <Link href="/events/new" className="bg-[#2c2c2c] text-white px-5 py-2.5 rounded text-sm font-medium hover:bg-[#1a1a1a] transition-colors flex items-center gap-2">
            <Plus size={16} /> New Event
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-[#8a9a7b] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : events.length === 0 ? (
          <div className="bg-white border border-[#e8e4dc] rounded-sm p-16 text-center">
            <Calendar className="w-12 h-12 text-[#e8e4dc] mx-auto mb-4" />
            <h3 className="font-serif text-lg text-[#2c2c2c] mb-2">No events yet</h3>
            <p className="text-[#9e9488] text-sm mb-6">Create your first event to get started.</p>
            <Link href="/events/new" className="text-[#2c2c2c] text-sm font-medium hover:underline inline-flex items-center gap-1">
              Create an event <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {events.map((event) => (
              <div key={event.id} className="bg-white border border-[#e8e4dc] rounded-sm p-6 hover:shadow-sm transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-serif text-lg font-medium text-[#2c2c2c] mb-1">{event.title}</h3>
                    <p className="text-sm text-[#9e9488] mb-2">{event.eventType.replace('_', ' ')}</p>
                    <div className="flex items-center gap-4 text-xs text-[#9e9488]">
                      <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(event.eventDate).toLocaleDateString()}</span>
                      <span className="flex items-center gap-1"><MapPin size={12} /> {event.location}</span>
                      <span className="flex items-center gap-1"><Users size={12} /> {event.guestCount} guests</span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-[#e8e4dc]" />
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
