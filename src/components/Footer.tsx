import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Globe, MessageCircle, Share2, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy-light border-t border-white/5 pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center">
                <Zap size={16} className="text-white" fill="white" />
              </div>
              <span className="text-xl font-bold text-white">CLOUD<span className="text-gradient">X</span></span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-5">
              CLOUDX is the platform powering <strong className="text-white/70">RIDZZ</strong> — a smarter, safer, and more transparent ride-booking experience built for modern cities.
            </p>
            <div className="flex gap-3">
              {[Globe, MessageCircle, Share2].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-blue/40 hover:bg-blue/10 transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">RIDZZ</h4>
            <ul className="flex flex-col gap-3">
              {['Book a Ride', 'How It Works', 'Destination Guard', 'Ride Options', 'Safety Features'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/45 hover:text-white text-sm transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Company</h4>
            <ul className="flex flex-col gap-3">
              {['About CLOUDX', 'Careers', 'Press', 'Blog', 'Partners'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/45 hover:text-white text-sm transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Contact</h4>
            <ul className="flex flex-col gap-3">
              <li className="flex items-center gap-2 text-white/45 text-sm">
                <Mail size={14} className="text-blue/70" />
                support@cloudx.in
              </li>
              <li className="flex items-center gap-2 text-white/45 text-sm">
                <Phone size={14} className="text-cyan/70" />
                +91 1800 XXX XXXX
              </li>
            </ul>
            <div className="mt-5">
              <h5 className="text-white/60 text-xs font-medium mb-2 uppercase tracking-wider">Legal</h5>
              <ul className="flex flex-col gap-2">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-white/40 hover:text-white text-xs transition-colors duration-200">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs">
            © 2026 CLOUDX Technologies Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse-glow inline-block"></span>
            <span className="text-white/30 text-xs">RIDZZ — Your City. Your Ride. Your Way.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
