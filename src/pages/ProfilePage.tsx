import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Plus, Edit2, Save, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { DEMO_USER } from '../data/demo';

export default function ProfilePage() {
  const { user } = useAuth();
  const u = user || DEMO_USER;
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(u.name);
  const [email, setEmail] = useState(u.email);
  const [phone, setPhone] = useState(u.phone);

  return (
    <div className="min-h-screen bg-gradient-dark pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="text-cyan text-xs font-semibold uppercase tracking-widest mb-2 block">Account</span>
          <h1 className="text-3xl font-extrabold text-white">My Profile</h1>
        </div>

        {/* Avatar card */}
        <div className="glass rounded-2xl border-glow p-7 mb-5">
          <div className="flex items-center gap-5 mb-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-brand flex items-center justify-center text-2xl font-bold text-white">
              {u.avatar}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{name}</h2>
              <p className="text-white/40 text-sm capitalize">{u.role} · Member since {u.joinDate}</p>
              <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-cyan/10 border border-cyan/20 text-cyan text-xs font-semibold">
                Verified Account (Demo)
              </span>
            </div>
            <button
              onClick={() => setEditing(!editing)}
              className="ml-auto btn-secondary !py-2 !px-4 text-sm gap-1.5"
            >
              {editing ? <><X size={14} /> Cancel</> : <><Edit2 size={14} /> Edit</>}
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: <User size={14} />, label: 'Full Name', value: name, setter: setName, field: 'name' },
              { icon: <Mail size={14} />, label: 'Email', value: email, setter: setEmail, field: 'email' },
              { icon: <Phone size={14} />, label: 'Phone', value: phone, setter: setPhone, field: 'phone' },
            ].map((item) => (
              <div key={item.label}>
                <label className="block text-xs font-semibold text-white/45 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  {item.icon} {item.label}
                </label>
                {editing ? (
                  <input
                    className="input-field"
                    value={item.value}
                    onChange={(e) => item.setter(e.target.value)}
                  />
                ) : (
                  <p className="text-white font-medium py-2.5 px-3 rounded-xl bg-white/4 border border-white/8">
                    {item.value}
                  </p>
                )}
              </div>
            ))}
          </div>

          {editing && (
            <button
              onClick={() => setEditing(false)}
              className="mt-5 btn-primary !py-2.5 !px-6 gap-1.5"
            >
              <Save size={14} /> Save Changes
            </button>
          )}
        </div>

        {/* Saved addresses */}
        <div className="glass rounded-2xl border-glow p-6 mb-5">
          <h3 className="text-white font-bold mb-4">Saved Addresses</h3>
          <div className="flex flex-col gap-3">
            {(DEMO_USER.savedAddresses || []).map((addr) => (
              <div key={addr.label} className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/8">
                <div className="w-9 h-9 rounded-lg bg-blue/15 flex items-center justify-center shrink-0">
                  <MapPin size={15} className="text-blue" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-semibold">{addr.label}</p>
                  <p className="text-white/40 text-xs truncate">{addr.address}</p>
                </div>
                <button className="text-white/25 hover:text-white/60 transition-colors">
                  <Edit2 size={13} />
                </button>
              </div>
            ))}
            <button className="flex items-center justify-center gap-2 p-3 rounded-xl border border-dashed border-white/15 text-white/35 hover:text-white/60 hover:border-white/30 transition-all text-sm">
              <Plus size={14} /> Add New Address
            </button>
          </div>
        </div>

        {/* Preferences */}
        <div className="glass rounded-2xl border-glow p-6">
          <h3 className="text-white font-bold mb-4">Preferences</h3>
          <div className="flex flex-col gap-3">
            {[
              { label: 'Ride notifications', desc: 'Get alerts for booking updates', enabled: true },
              { label: 'Promotional offers', desc: 'Receive discount and offer alerts', enabled: false },
              { label: 'Safety alerts', desc: 'Destination Guard notifications', enabled: true },
            ].map((pref) => (
              <div key={pref.label} className="flex items-center justify-between p-4 rounded-xl bg-white/4 border border-white/8">
                <div>
                  <p className="text-white text-sm font-medium">{pref.label}</p>
                  <p className="text-white/35 text-xs">{pref.desc}</p>
                </div>
                <div className={`w-10 h-5 rounded-full relative transition-colors cursor-pointer ${pref.enabled ? 'bg-blue' : 'bg-white/15'}`}>
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${pref.enabled ? 'left-5' : 'left-0.5'}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
