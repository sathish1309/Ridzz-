import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Features', href: '/#features' },
  { label: 'Safety', href: '/#safety' },
  { label: 'About', href: '/#about' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, user, role, signOut } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const dashboardHref =
    role === 'driver' ? '/driver-dashboard' :
    role === 'admin' ? '/admin-dashboard' :
    '/dashboard';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-lg shadow-black/30' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center glow-blue">
              <Zap size={18} className="text-white" fill="white" />
            </div>
            <span className="text-xl font-bold text-white tracking-wide">
              CLOUD<span className="text-gradient">X</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className={`nav-link ${location.pathname === l.href ? 'active' : ''}`}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Link to={dashboardHref} className="flex items-center gap-2 nav-link">
                  <div className="w-7 h-7 rounded-full bg-gradient-brand flex items-center justify-center text-xs font-bold text-white">
                    {user?.avatar}
                  </div>
                  <span className="text-sm font-medium text-white/80">{user?.name?.split(' ')[0]}</span>
                </Link>
                <button onClick={signOut} className="btn-secondary !py-2 !px-4 text-sm gap-1.5">
                  <LogOut size={14} />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/signin" className="btn-secondary !py-2 !px-4 text-sm">
                  Sign In
                </Link>
                <Link to="/book" className="btn-primary !py-2 !px-4 text-sm">
                  Book a Ride
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden glass border-t border-white/10 transition-all duration-300 overflow-hidden ${
          open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="nav-link text-base py-1"
            >
              {l.label}
            </a>
          ))}
          <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
            {isAuthenticated ? (
              <>
                <Link to={dashboardHref} onClick={() => setOpen(false)} className="flex items-center gap-2 py-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-brand flex items-center justify-center text-xs font-bold text-white">
                    {user?.avatar}
                  </div>
                  <span className="font-medium">{user?.name}</span>
                </Link>
                <button onClick={() => { signOut(); setOpen(false); }} className="btn-secondary w-full justify-center">
                  <LogOut size={14} /> Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/signin" onClick={() => setOpen(false)} className="btn-secondary w-full justify-center">
                  Sign In
                </Link>
                <Link to="/book" onClick={() => setOpen(false)} className="btn-primary w-full justify-center">
                  Book a Ride
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
