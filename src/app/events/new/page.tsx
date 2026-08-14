'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import axios from 'axios';
import { ArrowLeft, Calendar, MapPin, Users } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const eventTypes = [
  'WEDDING', 'CORPORATE', 'CONFERENCE', 'BIRTHDAY',
  'PRIVATE_FUNCTION', 'PRODUCT_LAUNCH', 'OUTDOOR', 'OTHER'
];

export default function NewEvent() {
  const router = useRouter();
  const { getToken } = useAuth();
  const [form, setForm] = useState({
    title: '',
    eventType: 'WEDDING',
    eventDate: '',
    location: '',
    guestCount: 50,
    description: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const token = await getToken();
      await axios.post(`${API_URL}/api/events`, {
        ...form,
        eventDate: new Date(form.eventDate).toISOString(),
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create event');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-[#9e9488] hover:text-[#2c2c2c] transition-colors mb-10">
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>

        <div className="bg-white border border-[#e8e4dc] rounded-sm p-8 md:p-12">
          <h1 className="font-serif text-3xl font-normal text-[#2c2c2c] mb-8">Create New Event</h1>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-700 text-sm rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-medium tracking-wide uppercase text-[#9e9488] mb-2">Event Title</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-[#e8e4dc] rounded text-[#2c2c2c] focus:outline-none focus:border-[#8a9a7b] transition-colors"
                placeholder="e.g., Nkosi Wedding"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium tracking-wide uppercase text-[#9e9488] mb-2">Event Type</label>
              <select
                value={form.eventType}
                onChange={(e) => setForm({ ...form, eventType: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-[#e8e4dc] rounded text-[#2c2c2c] focus:outline-none focus:border-[#8a9a7b] transition-colors"
              >
                {eventTypes.map(type => (
                  <option key={type} value={type}>{type.replace('_', ' ')}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium tracking-wide uppercase text-[#9e9488] mb-2">Event Date & Time</label>
              <input
                type="datetime-local"
                value={form.eventDate}
                onChange={(e) => setForm({ ...form, eventDate: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-[#e8e4dc] rounded text-[#2c2c2c] focus:outline-none focus:border-[#8a9a7b] transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium tracking-wide uppercase text-[#9e9488] mb-2">Location</label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-[#e8e4dc] rounded text-[#2c2c2c] focus:outline-none focus:border-[#8a9a7b] transition-colors"
                placeholder="Venue address"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium tracking-wide uppercase text-[#9e9488] mb-2">Guest Count</label>
              <input
                type="number"
                value={form.guestCount}
                onChange={(e) => setForm({ ...form, guestCount: parseInt(e.target.value) })}
                className="w-full px-4 py-3 bg-white border border-[#e8e4dc] rounded text-[#2c2c2c] focus:outline-none focus:border-[#8a9a7b] transition-colors"
                min="1"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium tracking-wide uppercase text-[#9e9488] mb-2">Description (optional)</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-[#e8e4dc] rounded text-[#2c2c2c] focus:outline-none focus:border-[#8a9a7b] transition-colors h-24 resize-none"
                placeholder="Any special requests or notes..."
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Link href="/dashboard" className="flex-1 text-center py-3.5 border border-[#e8e4dc] rounded text-sm text-[#2c2c2c] hover:bg-[#faf8f5] transition-colors">
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-[#2c2c2c] text-white py-3.5 rounded text-sm font-medium hover:bg-[#1a1a1a] transition-colors disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Event'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
