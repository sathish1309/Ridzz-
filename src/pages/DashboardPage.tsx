import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MapPin, Clock, Star, TrendingUp, ArrowRight, Plus,
  CheckCircle, XCircle, AlertCircle, Navigation
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { DEMO_RIDES, DEMO_USER } from '../data/demo';

const STATUS_CONFIG = {
  completed: { color: 'text-green-400', bg: 'bg-green-400/10 border-green-400/20', icon: <CheckCircle size={13} /> },
  cancelled: { color: 'text-red-400', bg: 'bg-red-400/10 border-red-400/20', icon: <XCircle size={13} /> },
  upcoming:  { color: 'text-cyan', bg: 'bg-cyan/10 border-cyan/20', icon: <Clock size={13} /> },
  active:    { color: 'text-blue', bg: 'bg-blue/10 border-blue/20', icon: <Navigation size={13} /> },
};

const RIDE_ICONS: Record<string, string> = { bike: '🏍️', auto: '🛺', car: '🚗' };

export default function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const u = user || DEMO_USER;

  const recentRides = DEMO_RIDES.slice(0, 3);
  const stats = [
    { label: 'Total Rides', value: '28', icon: <Navigation size={18} className="text-blue" />, color: 'blue' },
    { label: 'Saved Addresses', value: '2', icon: <MapPin size={18} className="text-cyan" />, color: 'cyan' },
    { label: 'Avg Rating Given', value: '4.8★', icon: <Star size={18} className="text-yellow-400" />, color: 'yellow' },
    { label: 'Member Since', value: 'Sep 2026', icon: <Clock size={18} className="text-purple-400" />, color: 'purple' },
  ];

  return (
    <div className="min-h-screen bg-gradient-dark pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-brand flex items-center justify-center text-xl font-bold text-white">
              {u.avatar}
            </div>
            <div>
              <p className="text-white/45 text-sm">Welcome back,</p>
              <h1 className="text-2xl font-extrabold text-white">{u.name}</h1>
            </div>
          </div>
          <button onClick={() => navigate('/book')} className="btn-primary !py-3 !px-6">
            <Plus size={16} /> Book a Ride
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => (
            <div key={s.label} className="glass rounded-2xl border-glow p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white/40 text-xs font-medium">{s.label}</span>
                {s.icon}
              </div>
              <p className="text-2xl font-extrabold text-white">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent rides */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-bold text-lg">Recent Rides</h2>
              <Link to="/my-rides" className="text-blue text-sm font-medium flex items-center gap-1 hover:text-cyan transition-colors">
                View All <ArrowRight size={14} />
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              {recentRides.map((ride) => {
                const cfg = STATUS_CONFIG[ride.status as keyof typeof STATUS_CONFIG];
                return (
                  <div key={ride.id} className="glass rounded-2xl border-glow p-5 card-hover">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <span className="text-2xl shrink-0 mt-0.5">{RIDE_ICONS[ride.rideType]}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full border text-xs font-semibold ${cfg.bg} ${cfg.color}`}>
                              {cfg.icon} {ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}
                            </span>
                            <span className="text-white/30 text-xs">{ride.date} · {ride.time}</span>
                          </div>
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan shrink-0" />
                            <p className="text-white/70 text-sm truncate">{ride.pickup}</p>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue shrink-0" />
                            <p className="text-white/70 text-sm truncate">{ride.destination}</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        {ride.fare > 0 ? (
                          <p className="text-white font-bold">₹{ride.fare}</p>
                        ) : (
                          <p className="text-white/30 text-sm">—</p>
                        )}
                        <p className="text-white/30 text-xs">{ride.distance}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right sidebar */}
          <div className="flex flex-col gap-4">
            {/* Saved addresses */}
            <div className="glass rounded-2xl border-glow p-5">
              <h3 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Saved Places</h3>
              <div className="flex flex-col gap-3">
                {(DEMO_USER.savedAddresses || []).map((addr) => (
                  <button
                    key={addr.label}
                    onClick={() => navigate('/book', { state: { pickup: addr.address } })}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/8 hover:border-white/20 transition-all text-left"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue/15 flex items-center justify-center shrink-0">
                      <MapPin size={14} className="text-blue" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-white text-sm font-semibold">{addr.label}</p>
                      <p className="text-white/40 text-xs truncate">{addr.address}</p>
                    </div>
                  </button>
                ))}
                <button className="flex items-center justify-center gap-2 p-3 rounded-xl border border-dashed border-white/15 text-white/35 hover:text-white/60 hover:border-white/30 transition-all text-sm">
                  <Plus size={14} /> Add Place
                </button>
              </div>
            </div>

            {/* Quick book */}
            <div className="glass rounded-2xl border-glow p-5">
              <h3 className="text-white font-bold text-sm mb-3">Quick Ride</h3>
              <p className="text-white/40 text-xs mb-4">Repeat your last trip in one tap.</p>
              {recentRides[0] && recentRides[0].status === 'completed' && (
                <button
                  onClick={() => navigate('/book', { state: { pickup: recentRides[0].pickup, destination: recentRides[0].destination } })}
                  className="w-full p-3 rounded-xl bg-blue/10 border border-blue/20 hover:bg-blue/15 transition-all text-left"
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan" />
                    <p className="text-white/60 text-xs truncate">{recentRides[0].pickup}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue" />
                    <p className="text-white/60 text-xs truncate">{recentRides[0].destination}</p>
                  </div>
                  <p className="text-blue text-xs font-semibold mt-2 flex items-center gap-1">
                    Repeat this ride <ArrowRight size={11} />
                  </p>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
