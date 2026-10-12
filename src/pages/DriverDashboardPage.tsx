import React, { useState } from 'react';
import { ToggleLeft, ToggleRight, Clock, Star, TrendingUp, CheckCircle, Navigation, MapPin } from 'lucide-react';
import { DEMO_DRIVER_USER, DEMO_RIDES } from '../data/demo';
import { useAuth } from '../context/AuthContext';

const INCOMING_REQUESTS = [
  {
    id: 'req1',
    customer: 'Ravi S.',
    pickup: 'Koramangala 4th Block',
    destination: 'Indiranagar 100ft Road',
    distance: '5.8 km',
    fare: '₹68',
    rideType: 'bike',
    eta: '3 min',
  },
  {
    id: 'req2',
    customer: 'Meena K.',
    pickup: 'BTM Layout',
    destination: 'Jayanagar 9th Block',
    distance: '4.2 km',
    fare: '₹52',
    rideType: 'bike',
    eta: '5 min',
  },
];

export default function DriverDashboardPage() {
  const { user } = useAuth();
  const d = (user as typeof DEMO_DRIVER_USER) || DEMO_DRIVER_USER;
  const [online, setOnline] = useState(true);
  const [accepted, setAccepted] = useState<string | null>(null);

  const completedRides = DEMO_RIDES.filter((r) => r.status === 'completed');

  return (
    <div className="min-h-screen bg-gradient-dark pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-brand flex items-center justify-center text-xl font-bold text-white">
              {d.avatar}
            </div>
            <div>
              <p className="text-white/45 text-sm">Driver Dashboard</p>
              <h1 className="text-2xl font-extrabold text-white">{d.name}</h1>
              <p className="text-white/35 text-xs">{d.vehicle} · {d.vehicleNo}</p>
            </div>
          </div>

          {/* Online toggle */}
          <button
            onClick={() => setOnline(!online)}
            className={`flex items-center gap-3 px-5 py-3 rounded-2xl border font-bold text-sm transition-all duration-300 ${
              online
                ? 'bg-green-400/10 border-green-400/30 text-green-400'
                : 'bg-white/5 border-white/15 text-white/40'
            }`}
          >
            <span className={`w-3 h-3 rounded-full ${online ? 'bg-green-400 animate-pulse' : 'bg-white/20'}`} />
            {online ? 'Online — Accepting Rides' : 'Offline — Go Online'}
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Today's Earnings", value: `₹${d.todayEarnings || 845}`, sub: 'demo value', icon: <TrendingUp size={18} className="text-green-400" /> },
            { label: "Week Earnings",    value: `₹${d.weekEarnings || 4320}`, sub: 'demo value', icon: <TrendingUp size={18} className="text-blue" /> },
            { label: 'Total Trips',      value: `${d.totalTrips || 1243}`, sub: 'all time', icon: <Navigation size={18} className="text-cyan" /> },
            { label: 'Rating',           value: `${d.rating || 4.9}★`, sub: '1,243 ratings', icon: <Star size={18} className="text-yellow-400" /> },
          ].map((s) => (
            <div key={s.label} className="glass rounded-2xl border-glow p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/40 text-xs">{s.label}</span>
                {s.icon}
              </div>
              <p className="text-2xl font-extrabold text-white">{s.value}</p>
              <p className="text-white/25 text-xs">{s.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Incoming requests */}
          <div className="lg:col-span-2">
            <h2 className="text-white font-bold text-lg mb-4">
              {online ? 'Incoming Ride Requests' : 'Go Online to See Requests'}
            </h2>
            {!online ? (
              <div className="glass rounded-2xl border-glow p-12 text-center">
                <p className="text-4xl mb-3">💤</p>
                <p className="text-white/50 font-medium">You are offline.</p>
                <p className="text-white/30 text-sm mt-1">Toggle online above to start receiving ride requests.</p>
              </div>
            ) : accepted ? (
              <div className="glass rounded-2xl border-glow p-7">
                <div className="flex items-center gap-3 mb-5">
                  <CheckCircle size={28} className="text-cyan" />
                  <div>
                    <h3 className="text-white font-bold text-lg">Ride Accepted!</h3>
                    <p className="text-white/45 text-sm">Head to pickup location.</p>
                  </div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 mb-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-cyan" />
                    <p className="text-white/60 text-sm">{INCOMING_REQUESTS.find(r => r.id === accepted)?.pickup}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue" />
                    <p className="text-white/60 text-sm">{INCOMING_REQUESTS.find(r => r.id === accepted)?.destination}</p>
                  </div>
                </div>
                <button onClick={() => setAccepted(null)} className="btn-secondary w-full justify-center !py-2.5 text-sm">
                  Complete Trip (Demo)
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {INCOMING_REQUESTS.map((req) => (
                  <div key={req.id} className="glass rounded-2xl border-glow p-5">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-white font-bold">{req.customer}</span>
                          <span className="px-2 py-0.5 rounded-full bg-blue/15 text-blue text-xs font-bold">{req.eta} away</span>
                        </div>
                        <div className="flex items-center gap-1.5 mb-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan" />
                          <p className="text-white/55 text-sm">{req.pickup}</p>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue" />
                          <p className="text-white/55 text-sm">{req.destination}</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-white font-extrabold text-xl">{req.fare}</p>
                        <p className="text-white/30 text-xs">{req.distance}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setAccepted(req.id)}
                        className="btn-primary flex-1 justify-center !py-2.5 text-sm"
                      >
                        Accept
                      </button>
                      <button className="btn-secondary !py-2.5 !px-4 text-sm">
                        Decline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Trip history */}
          <div>
            <h2 className="text-white font-bold text-lg mb-4">Recent Trips</h2>
            <div className="flex flex-col gap-3">
              {completedRides.map((r) => (
                <div key={r.id} className="glass rounded-2xl border-glow p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-white/60 text-xs mb-1">{r.date}</p>
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan shrink-0" />
                        <p className="text-white/65 text-xs truncate">{r.pickup}</p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue shrink-0" />
                        <p className="text-white/65 text-xs truncate">{r.destination}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-green-400 font-bold text-sm">₹{r.fare}</p>
                      <p className="text-white/25 text-xs">{r.distance}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
