import React, { useState } from 'react';
import { CheckCircle, XCircle, Clock, Navigation, Search, Filter } from 'lucide-react';
import { DEMO_RIDES } from '../data/demo';

type Tab = 'all' | 'upcoming' | 'active' | 'completed' | 'cancelled';

const STATUS_CONFIG = {
  completed: { color: 'text-green-400', bg: 'bg-green-400/10 border-green-400/20', icon: <CheckCircle size={13} /> },
  cancelled: { color: 'text-red-400',   bg: 'bg-red-400/10 border-red-400/20',     icon: <XCircle size={13} /> },
  upcoming:  { color: 'text-cyan',      bg: 'bg-cyan/10 border-cyan/20',            icon: <Clock size={13} /> },
  active:    { color: 'text-blue',      bg: 'bg-blue/10 border-blue/20',            icon: <Navigation size={13} /> },
};

const RIDE_ICONS: Record<string, string> = { bike: '🏍️', auto: '🛺', car: '🚗' };

export default function MyRidesPage() {
  const [tab, setTab] = useState<Tab>('all');
  const [search, setSearch] = useState('');

  const filtered = DEMO_RIDES.filter((r) => {
    const matchTab = tab === 'all' || r.status === tab;
    const matchSearch =
      !search ||
      r.pickup.toLowerCase().includes(search.toLowerCase()) ||
      r.destination.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const TABS: { key: Tab; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'upcoming', label: 'Upcoming' },
    { key: 'active', label: 'Active' },
    { key: 'completed', label: 'Completed' },
    { key: 'cancelled', label: 'Cancelled' },
  ];

  return (
    <div className="min-h-screen bg-gradient-dark pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="text-cyan text-xs font-semibold uppercase tracking-widest mb-2 block">RIDZZ</span>
          <h1 className="text-3xl font-extrabold text-white">My Rides</h1>
          <p className="text-white/45 mt-1">Your full ride history and upcoming trips.</p>
        </div>

        {/* Search */}
        <div className="relative mb-5">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by pickup or destination…"
            className="input-field pl-9"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 border ${
                tab === t.key
                  ? 'bg-blue text-white border-blue'
                  : 'border-white/15 text-white/50 hover:text-white hover:border-white/30'
              }`}
            >
              {t.label}
              {t.key !== 'all' && (
                <span className="ml-1.5 text-xs opacity-60">
                  ({DEMO_RIDES.filter((r) => r.status === t.key).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Rides list */}
        {filtered.length === 0 ? (
          <div className="glass rounded-2xl border-glow p-12 text-center">
            <p className="text-4xl mb-3">🛺</p>
            <p className="text-white/50 font-medium">No rides found.</p>
            <p className="text-white/30 text-sm mt-1">Try a different filter or search term.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filtered.map((ride) => {
              const cfg = STATUS_CONFIG[ride.status as keyof typeof STATUS_CONFIG];
              return (
                <div key={ride.id} className="glass rounded-2xl border-glow p-6 card-hover">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      <span className="text-3xl shrink-0">{RIDE_ICONS[ride.rideType]}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-2">
                          <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full border text-xs font-semibold ${cfg.bg} ${cfg.color}`}>
                            {cfg.icon} {ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}
                          </span>
                          <span className="text-white/30 text-xs">{ride.date} · {ride.time}</span>
                          <span className="text-white/30 text-xs font-mono">#{ride.id}</span>
                        </div>
                        <div className="flex items-start gap-2 mb-1">
                          <div className="w-2 h-2 rounded-full bg-cyan mt-1.5 shrink-0" />
                          <p className="text-white/75 text-sm">{ride.pickup}</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue mt-1.5 shrink-0" />
                          <p className="text-white/75 text-sm">{ride.destination}</p>
                        </div>
                        {ride.driver && (
                          <p className="text-white/35 text-xs mt-2">Driver: {ride.driver}</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      {ride.fare > 0 ? (
                        <>
                          <p className="text-white font-extrabold text-xl">₹{ride.fare}</p>
                          <p className="text-white/30 text-xs">{ride.distance} · {ride.duration}</p>
                        </>
                      ) : (
                        <p className="text-white/30 text-sm">Not charged</p>
                      )}
                      {ride.driverRating && (
                        <p className="text-yellow-400 text-xs mt-1">★ {ride.driverRating} driver</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
