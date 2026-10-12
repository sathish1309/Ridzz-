import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Mail, Lock, Phone, User, Eye, EyeOff, Loader, Zap, ArrowRight, CheckCircle } from 'lucide-react';
import { useAuth, UserRole } from '../context/AuthContext';

type Mode = 'signin' | 'register';

export default function SignInPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, register } = useAuth();

  const [mode, setMode] = useState<Mode>('signin');
  const [role, setRole] = useState<UserRole>('customer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const from = (location.state as { from?: string })?.from || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    if (mode === 'signin') {
      const result = await signIn(email, password, role);
      if (result.success) {
        navigate(role === 'driver' ? '/driver-dashboard' : role === 'admin' ? '/admin-dashboard' : from, { replace: true });
      } else {
        setError(result.error || 'Sign in failed.');
      }
    } else {
      const result = await register(name, email, password, phone, role);
      if (result.success) {
        navigate(role === 'driver' ? '/driver-dashboard' : '/dashboard', { replace: true });
      } else {
        setError(result.error || 'Registration failed.');
      }
    }
    setLoading(false);
  };

  const ROLES: { value: UserRole; label: string; desc: string; icon: string }[] = [
    { value: 'customer', label: 'Rider', desc: 'Book rides', icon: '🧑‍💼' },
    { value: 'driver', label: 'Driver', desc: 'Accept rides', icon: '🏍️' },
    { value: 'admin', label: 'Admin', desc: 'Manage platform', icon: '🛡️' },
  ];

  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center pt-20 pb-12 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-xl bg-gradient-brand flex items-center justify-center">
              <Zap size={18} className="text-white" fill="white" />
            </div>
            <span className="text-2xl font-bold text-white">CLOUD<span className="text-gradient">X</span></span>
          </Link>
          <h1 className="text-2xl font-extrabold text-white">
            {mode === 'signin' ? 'Welcome Back' : 'Join RIDZZ'}
          </h1>
          <p className="text-white/45 text-sm mt-1">
            {mode === 'signin' ? 'Sign in to your RIDZZ account.' : 'Create your account to get started.'}
          </p>
        </div>

        <div className="glass rounded-2xl border-glow p-7">
          {/* Mode toggle */}
          <div className="flex gap-1 p-1 rounded-xl bg-white/5 mb-6">
            {(['signin', 'register'] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setError(''); }}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  mode === m ? 'bg-blue text-white shadow' : 'text-white/45 hover:text-white'
                }`}
              >
                {m === 'signin' ? 'Sign In' : 'Register'}
              </button>
            ))}
          </div>

          {/* Role selector */}
          <div className="mb-5">
            <label className="block text-xs font-semibold text-white/55 uppercase tracking-wider mb-2">
              I am a
            </label>
            <div className="grid grid-cols-3 gap-2">
              {ROLES.map((r) => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => setRole(r.value)}
                  className={`flex flex-col items-center gap-1 py-3 rounded-xl border text-center transition-all duration-200 ${
                    role === r.value
                      ? 'border-blue bg-blue/10'
                      : 'border-white/10 hover:border-white/25'
                  }`}
                >
                  <span className="text-xl">{r.icon}</span>
                  <span className={`text-xs font-bold ${role === r.value ? 'text-white' : 'text-white/55'}`}>{r.label}</span>
                  <span className="text-white/30 text-[10px]">{r.desc}</span>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-semibold text-white/55 uppercase tracking-wider mb-1.5">Full Name</label>
                <div className="relative">
                  <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                  <input
                    type="text" value={name} onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name" className="input-field pl-9"
                    autoComplete="name"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-white/55 uppercase tracking-wider mb-1.5">Email</label>
              <div className="relative">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com" className="input-field pl-9"
                  autoComplete="email"
                />
              </div>
            </div>

            {mode === 'register' && (
              <div>
                <label className="block text-xs font-semibold text-white/55 uppercase tracking-wider mb-1.5">Phone</label>
                <div className="relative">
                  <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                  <input
                    type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 XXXXX XXXXX" className="input-field pl-9"
                    autoComplete="tel"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-white/55 uppercase tracking-wider mb-1.5">Password</label>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type={showPw ? 'text' : 'password'} value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" className="input-field pl-9 pr-9"
                  autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors">
                  {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/25 rounded-xl p-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center !py-3.5 mt-1">
              {loading
                ? <><Loader size={16} className="animate-spin" /> {mode === 'signin' ? 'Signing In…' : 'Creating Account…'}</>
                : <>{mode === 'signin' ? 'Sign In' : 'Create Account'} <ArrowRight size={16} /></>
              }
            </button>
          </form>

          <div className="mt-4 p-3 rounded-xl bg-blue/8 border border-blue/20">
            <p className="text-white/50 text-xs text-center">
              <strong className="text-blue">Demo mode:</strong> Any email &amp; password combination will work. Role is set by the selector above.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
