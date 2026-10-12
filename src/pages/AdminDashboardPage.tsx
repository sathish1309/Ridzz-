import React, { useState } from 'react';
import { DEMO_ADMIN_STATS, DEMO_RIDES, DEMO_DRIVERS } from '../data/demo';
import { Users, Navigation, TrendingUp, Star, BarChart2, Settings, Flag, ChevronRight } from 'lucide-react';

type AdminTab = 'overview' | 'users' | 'drivers' | 'bookings';

const DEMO_USERS = [
  { id: 'u1', name: 'Sathish Kumar', email: 'sathish@example.com', role: 'customer', rides: 28, status: 'active' },
  { id: 'u2', name: 'Meena Sharma', email: 'meena@example.com', role: 'customer', rides: 14, status: 'active' },
  { id: 'u3', name: 'Raj Patel', email: 'raj@example.com', role: 'customer', rides: 5, status: 'inactive' },
];

export default function AdminDashboardPage() {
  const [tab, setTab] = useState<AdminTab>('overview');

  const stats = [
    { label: 'Total Users',    value: DEMO_ADMIN_STATS.totalUsers.toLocaleString(),  icon: <Users size={20} className="text-blue" />,       sub: '+24 this week' },
    { label: 'Total Drivers',  value: DEMO_ADMIN_STATS.totalDrivers.toLocaleString(), icon: <Navigation size={20} className="text-cyan" />,  sub: '+8 this week' },
    { label: 'Total Rides',    value: DEMO_ADMIN_STATS.totalRides.toLocaleString(),  icon: <BarChart2 size={20} className="text-purple-400" />, sub: 'all time' },
    { label: 'Active Rides',   value: DEMO_ADMIN_STATS.activeRides.toString(),        icon: <Flag size={20} className="text-green-400" />,   sub: 'right now (demo)' },
    { label: 'Revenue',        value: `₹${(DEMO_ADMIN_STATS.revenue / 1000).toFixed(1)}K`, icon: <TrendingUp size={20} className="text-yellow-400" />, sub: 'this month (demo)' },
    { label: 'Avg Rating',     value: `${DEMO_ADMIN_STATS.avgRating}★`,              icon: <Star size={20} className="text-orange-400" />,  sub: 'platform avg' },
  ];

  const TABS: { key: AdminTab; label: string }[] = [
    { key: 'overview', label: 'Overview' },
    { key: 'users', label: 'Users' },
    { key: 'drivers', label: 'Drivers' },
    { key: 'bookings', label: 'Bookings' },
  ];

  return (
    <div className="min-h-screen bg-gradient-dark pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-cyan text-xs font-semibold uppercase tracking-widest mb-2 block">Admin</span>
            <h1 className="text-3xl font-extrabold text-white">Admin Dashboard</h1>
            <p className="text-white/40 text-sm mt-1">CLOUDX · RIDZZ Platform Management</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-400/10 border border-red-400/25">
            <span className="w-2 h-2 rounded-full bg-red-400" />
            <span className="text-red-400 text-xs font-semibold">Admin Access Only</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
          {TABS.map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`shrink-0 px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 border ${
                tab === t.key ? 'bg-blue text-white border-blue' : 'border-white/15 text-white/50 hover:text-white hover:border-white/30'
              }`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'overview' && (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {stats.map((s) => (
                <div key={s.label} className="glass rounded-2xl border-glow p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-white/40 text-xs">{s.label}</span>
                    {s.icon}
                  </div>
                  <p className="text-2xl font-extrabold text-white">{s.value}</p>
                  <p className="text-white/25 text-xs mt-1">{s.sub}</p>
                </div>
              ))}
            </div>

            <div className="glass rounded-2xl border-glow p-6">
              <h3 className="text-white font-bold mb-4">Recent Bookings</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-white/40 text-xs uppercase tracking-wider">
                      <th className="py-2 pr-4 text-left">Booking ID</th>
                      <th className="py-2 pr-4 text-left">Route</th>
                      <th className="py-2 pr-4 text-left">Status</th>
                      <th className="py-2 pr-4 text-left">Fare</th>
                      <th className="py-2 text-left">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DEMO_RIDES.map((r) => (
                      <tr key={r.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                        <td className="py-3 pr-4 font-mono text-white/60 text-xs">{r.id}</td>
                        <td className="py-3 pr-4">
                          <p className="text-white/75 truncate max-w-[180px]">{r.pickup} → {r.destination}</p>
                        </td>
                        <td className="py-3 pr-4">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                            r.status === 'completed' ? 'bg-green-400/10 text-green-400' :
                            r.status === 'cancelled' ? 'bg-red-400/10 text-red-400' :
                            r.status === 'upcoming' ? 'bg-cyan/10 text-cyan' : 'bg-blue/10 text-blue'
                          }`}>
                            {r.status}
                          </span>
                        </td>
                        <td className="py-3 pr-4 text-white font-medium">{r.fare > 0 ? `₹${r.fare}` : '—'}</td>
                        <td className="py-3 text-white/40 text-xs">{r.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {tab === 'users' && (
          <div className="glass rounded-2xl border-glow p-6">
            <h3 className="text-white font-bold mb-4">Registered Users</h3>
            <div className="flex flex-col gap-3">
              {DEMO_USERS.map((u) => (
                <div key={u.id} className="flex items-center gap-4 p-4 rounded-xl bg-white/4 border border-white/8">
                  <div className="w-10 h-10 rounded-full bg-gradient-brand flex items-center justify-center text-sm font-bold text-white">
                    {u.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm">{u.name}</p>
                    <p className="text-white/40 text-xs">{u.email}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-white/60 text-xs">{u.rides} rides</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${u.status === 'active' ? 'bg-green-400/10 text-green-400' : 'bg-white/10 text-white/40'}`}>
                      {u.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'drivers' && (
          <div className="glass rounded-2xl border-glow p-6">
            <h3 className="text-white font-bold mb-4">Registered Drivers</h3>
            <div className="flex flex-col gap-3">
              {DEMO_DRIVERS.map((d) => (
                <div key={d.id} className="flex items-center gap-4 p-4 rounded-xl bg-white/4 border border-white/8">
                  <div className="w-10 h-10 rounded-full bg-gradient-brand flex items-center justify-center text-sm font-bold text-white">
                    {d.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm">{d.name}</p>
                    <p className="text-white/40 text-xs">{d.vehicle} · {d.vehicleNo}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-yellow-400 text-xs">★ {d.rating}</p>
                    <p className="text-white/40 text-xs">{d.trips} trips</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${d.online ? 'bg-green-400/10 text-green-400' : 'bg-white/10 text-white/30'}`}>
                      {d.online ? 'Online' : 'Offline'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'bookings' && (
          <div className="glass rounded-2xl border-glow p-6">
            <h3 className="text-white font-bold mb-4">All Bookings</h3>
            <div className="flex flex-col gap-3">
              {DEMO_RIDES.map((r) => (
                <div key={r.id} className="flex items-center gap-4 p-4 rounded-xl bg-white/4 border border-white/8 flex-wrap">
                  <span className="font-mono text-white/50 text-xs shrink-0">{r.id}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-white/75 text-sm truncate">{r.pickup} → {r.destination}</p>
                    <p className="text-white/30 text-xs">{r.date} · {r.rideType}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold shrink-0 ${
                    r.status === 'completed' ? 'bg-green-400/10 text-green-400' :
                    r.status === 'cancelled' ? 'bg-red-400/10 text-red-400' :
                    r.status === 'upcoming' ? 'bg-cyan/10 text-cyan' : 'bg-blue/10 text-blue'
                  }`}>{r.status}</span>
                  <span className="text-white font-bold text-sm shrink-0">{r.fare > 0 ? `₹${r.fare}` : '—'}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
