import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Zap, Shield, MapPin, Navigation, Star,
  CheckCircle, Clock, Users, Award, ChevronRight
} from 'lucide-react';
import BookingCard from '../components/BookingCard';
import HeroMap from '../components/HeroMap';
import DestinationGuard from '../components/DestinationGuard';
import { RIDE_TYPES } from '../data/demo';

const FEATURES = [
  {
    icon: <MapPin size={22} className="text-cyan" />,
    title: 'Smart Ride Booking',
    desc: 'Enter your pickup and destination with ease. Our intelligent interface guides you through every step.',
    color: 'cyan',
  },
  {
    icon: <Zap size={22} className="text-blue" />,
    title: 'Transparent Fare Estimates',
    desc: 'See an estimated fare before confirming. No surprises — just clear, upfront pricing.',
    color: 'blue',
  },
  {
    icon: <Users size={22} className="text-purple-400" />,
    title: 'Driver Matching',
    desc: 'Connect with verified nearby drivers when backend services are configured and active.',
    color: 'purple',
  },
  {
    icon: <Shield size={22} className="text-green-400" />,
    title: 'Destination Verification',
    desc: 'Confirm the selected destination before starting the ride with our Destination Guard feature.',
    color: 'green',
  },
];

const HOW_IT_WORKS = [
  { step: '01', title: 'Enter Route', desc: 'Type your pickup location and destination into the booking form.' },
  { step: '02', title: 'Choose Your Ride', desc: 'View available ride options — Bike, Auto, or Car — with estimated fares.' },
  { step: '03', title: 'Confirm Booking', desc: 'Review your trip details and match with a nearby driver.' },
  { step: '04', title: 'Ride & Verify', desc: 'Destination Guard confirms your endpoint. Enjoy a safe, transparent ride.' },
];

const SAFETY_FEATURES = [
  { icon: <CheckCircle size={18} />, text: 'Verified driver profile placeholders' },
  { icon: <MapPin size={18} />, text: 'Trip details and destination confirmation' },
  { icon: <Clock size={18} />, text: 'Ride status updates during trips' },
  { icon: <Shield size={18} />, text: 'Support and issue reporting panel' },
  { icon: <Zap size={18} />, text: 'Emergency assistance UI (integration-ready)' },
];

export default function HomePage() {
  return (
    <div className="bg-gradient-dark min-h-screen">
      {/* ── HERO ── */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
        {/* Ambient glow blobs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full blur-[120px] opacity-15 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #2878FF, transparent)' }} />
        <div className="absolute top-40 right-1/4 w-80 h-80 rounded-full blur-[100px] opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #28D7F2, transparent)' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan/30 bg-cyan/8 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse-glow" />
                <span className="text-cyan text-xs font-semibold tracking-wide uppercase">Introducing RIDZZ</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight mb-6">
                Move <span className="text-gradient">Smarter.</span>
                <br />Ride <span className="text-gradient">Better.</span>
              </h1>

              <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-xl">
                Meet <strong className="text-white">RIDZZ</strong> — your smarter way to book rides, connect with nearby drivers, and reach your destination with confidence.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                <Link to="/book" className="btn-primary !py-3.5 !px-7 text-base">
                  <Zap size={18} /> Book Your Ride
                </Link>
                <Link to="/book" className="btn-secondary !py-3.5 !px-7 text-base">
                  Explore RIDZZ <ArrowRight size={18} />
                </Link>
              </div>

              <p className="text-white/35 text-sm flex items-center gap-2">
                <CheckCircle size={14} className="text-cyan" />
                Designed for convenient, transparent, and reliable everyday travel.
              </p>

              {/* Trust bar */}
              <div className="mt-8 flex flex-wrap gap-6">
                {[
                  { value: '50K+', label: 'Rides Ready' },
                  { value: '4.8★', label: 'Avg Rating' },
                  { value: '3 Cities', label: 'Launch Markets' },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="text-2xl font-bold text-white">{s.value}</p>
                    <p className="text-white/40 text-xs">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Hero visual */}
            <div className="relative flex flex-col gap-4">
              {/* Map card */}
              <div className="glass rounded-2xl border-glow p-4 glow-blue animate-float">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">Live Route Preview</span>
                  <span className="flex items-center gap-1.5 text-cyan text-xs font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse-glow" />
                    Demo Mode
                  </span>
                </div>
                <div className="rounded-xl overflow-hidden bg-navy/80 flex items-center justify-center" style={{ minHeight: 200 }}>
                  <HeroMap />
                </div>

                {/* Driver card */}
                <div className="mt-3 flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/8">
                  <div className="w-10 h-10 rounded-full bg-gradient-brand flex items-center justify-center text-sm font-bold text-white shrink-0">
                    AM
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-semibold">Arjun Mehta</p>
                    <p className="text-white/40 text-xs">Honda Activa • KA 05 MN 2210</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-yellow-400 text-xs font-bold flex items-center gap-0.5 justify-end">
                      <Star size={11} fill="currentColor" /> 4.9
                    </p>
                    <p className="text-cyan text-xs font-semibold mt-0.5">2 min away</p>
                  </div>
                </div>

                {/* Fare + ETA */}
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <div className="bg-blue/10 rounded-xl p-2.5 border border-blue/20">
                    <p className="text-white/40 text-xs">Est. Fare</p>
                    <p className="text-white font-bold text-base">₹85 <span className="text-white/30 text-xs font-normal">demo</span></p>
                  </div>
                  <div className="bg-cyan/8 rounded-xl p-2.5 border border-cyan/20">
                    <p className="text-white/40 text-xs">Arrival</p>
                    <p className="text-cyan font-bold text-base">4–8 min</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUICK BOOKING ── */}
      <section id="book" className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <span className="text-cyan text-xs font-semibold uppercase tracking-widest mb-3 block">Quick Booking</span>
              <h2 className="text-4xl font-extrabold text-white mb-4">Your Next Ride,<br /><span className="text-gradient">In Seconds.</span></h2>
              <p className="text-white/50 text-base leading-relaxed">
                Book a RIDZZ in just a few taps. Enter your pickup and destination, choose your ride type, and see an estimated fare — all before you confirm.
              </p>
            </div>
            <BookingCard />
          </div>
        </div>
      </section>

      {/* ── WHY RIDZZ ── */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-blue text-xs font-semibold uppercase tracking-widest mb-3 block">Why RIDZZ?</span>
            <h2 className="text-4xl font-extrabold text-white mb-4">Built Different. <span className="text-gradient">By Design.</span></h2>
            <p className="text-white/45 max-w-xl mx-auto">
              Every feature in RIDZZ is crafted around clarity, safety, and convenience for real everyday commuters.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map((f) => (
              <div key={f.title} className="glass rounded-2xl border-glow p-6 card-hover">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 bg-white/5 border border-white/10`}>
                  {f.icon}
                </div>
                <h3 className="text-white font-bold text-base mb-2">{f.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-cyan text-xs font-semibold uppercase tracking-widest mb-3 block">Process</span>
            <h2 className="text-4xl font-extrabold text-white mb-4">How <span className="text-gradient">RIDZZ</span> Works</h2>
            <p className="text-white/45 max-w-lg mx-auto">Four simple steps from booking to destination.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 relative">
            {/* Connector line (desktop) */}
            <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-cyan/30 via-blue/30 to-blue/10 z-0" />

            {HOW_IT_WORKS.map((step, i) => (
              <div key={step.step} className="relative z-10">
                <div className="glass rounded-2xl border-glow p-6 card-hover h-full">
                  <div className="w-12 h-12 rounded-xl bg-gradient-brand flex items-center justify-center mb-4 font-extrabold text-white text-lg glow-blue">
                    {step.step}
                  </div>
                  <h3 className="text-white font-bold text-base mb-2">{step.title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DESTINATION GUARD ── */}
      <section id="destination-guard" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan/30 bg-cyan/8 mb-5">
                <Shield size={13} className="text-cyan" />
                <span className="text-cyan text-xs font-semibold tracking-wide uppercase">Signature Feature</span>
              </div>
              <h2 className="text-4xl font-extrabold text-white mb-4">
                RIDZZ <span className="text-gradient">Destination Guard</span>
              </h2>
              <p className="text-white/55 text-base leading-relaxed mb-6">
                Destination confusion is a real problem in ride-hailing. Our <strong className="text-white">Destination Guard</strong> feature clearly displays the confirmed destination to both customer and driver — and alerts you instantly when a mismatch is detected.
              </p>
              <ul className="flex flex-col gap-3 mb-6">
                {[
                  "Customer's selected destination shown clearly",
                  'Confirmed destination shared with driver on connect',
                  'Real-time mismatch detection and warning',
                  'One-tap correction flow before trip starts',
                  'Transparent trip confirmation for both parties',
                ].map((pt) => (
                  <li key={pt} className="flex items-start gap-2.5 text-white/70 text-sm">
                    <CheckCircle size={15} className="text-cyan mt-0.5 shrink-0" />
                    {pt}
                  </li>
                ))}
              </ul>
              <p className="text-white/30 text-xs">
                * Full location comparison is enabled when mapping and backend services are integrated.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <DestinationGuard
                pickup="Koramangala, Bengaluru"
                destination="Indiranagar, Bengaluru"
                confirmedDestination="Indiranagar, Bengaluru"
              />
              <DestinationGuard
                pickup="MG Road, Bengaluru"
                destination="Whitefield, Bengaluru"
                confirmedDestination="Marathahalli, Bengaluru"
                onConfirm={() => {}}
                onCorrect={() => {}}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── RIDE OPTIONS ── */}
      <section id="ride-options" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-blue text-xs font-semibold uppercase tracking-widest mb-3 block">Ride Options</span>
            <h2 className="text-4xl font-extrabold text-white mb-4">Pick Your <span className="text-gradient">Perfect Ride</span></h2>
            <p className="text-white/45 max-w-lg mx-auto">Three categories to suit every journey — quick, comfortable, or premium.</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
            {RIDE_TYPES.map((type) => (
              <div key={type.id} className="glass rounded-2xl border-glow p-6 card-hover text-center">
                <div className="text-5xl mb-4">{type.icon}</div>
                <div className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold mb-3 ${
                  type.tagColor === 'cyan' ? 'bg-cyan/15 text-cyan' :
                  type.tagColor === 'blue' ? 'bg-blue/15 text-blue' :
                  'bg-yellow-400/15 text-yellow-400'
                }`}>
                  {type.tag}
                </div>
                <h3 className="text-white font-extrabold text-xl mb-2">{type.name}</h3>
                <p className="text-white/45 text-sm mb-4">{type.description}</p>
                <div className="flex items-center justify-center gap-3 text-sm">
                  <span className="text-white/40 text-xs">From</span>
                  <span className="text-white font-bold text-lg">₹{type.basePrice}</span>
                  <span className="text-white/25 text-xs">+ ₹{type.pricePerKm}/km</span>
                </div>
                <p className="text-white/30 text-xs mt-1">Demo pricing — live rates vary</p>
                <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-white/50">
                  <Clock size={12} /> {type.eta} • {type.capacity} {type.capacity === 1 ? 'rider' : 'riders'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SAFETY ── */}
      <section id="safety" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Safety list */}
            <div>
              <span className="text-green-400 text-xs font-semibold uppercase tracking-widest mb-3 block">Safety & Trust</span>
              <h2 className="text-4xl font-extrabold text-white mb-4">Ride With <span className="text-gradient">Confidence</span></h2>
              <p className="text-white/50 text-base leading-relaxed mb-8">
                RIDZZ is designed with safety at its core. Every ride is backed by driver verification, destination confirmation, and transparent trip records.
              </p>
              <div className="flex flex-col gap-3">
                {SAFETY_FEATURES.map((f) => (
                  <div key={f.text} className="flex items-center gap-3 p-3.5 rounded-xl bg-white/4 border border-white/8">
                    <span className="text-green-400">{f.icon}</span>
                    <span className="text-white/70 text-sm">{f.text}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-white/25 text-xs">
                Emergency calling, live tracking, and real driver verification require backend services. These UI elements are placeholders for integration-ready features.
              </p>
            </div>

            {/* Driver card mock */}
            <div className="flex flex-col gap-4">
              <div className="glass rounded-2xl border-glow p-6">
                <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Driver Profile</h4>
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-brand flex items-center justify-center text-xl font-bold text-white">
                    AM
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg">Arjun Mehta</p>
                    <p className="text-white/45 text-sm">Honda Activa 6G</p>
                    <div className="flex items-center gap-1 mt-1">
                      {[1,2,3,4,5].map((s) => (
                        <Star key={s} size={12} className="text-yellow-400" fill="currentColor" />
                      ))}
                      <span className="text-white/50 text-xs ml-1">4.9 (1,243 trips)</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Verified', value: '✓ ID & Documents', color: 'text-green-400' },
                    { label: 'Vehicle No.', value: 'KA 05 MN 2210', color: 'text-white' },
                    { label: 'Trips', value: '1,243 completed', color: 'text-white' },
                    { label: 'Status', value: 'Active (Demo)', color: 'text-cyan' },
                  ].map((item) => (
                    <div key={item.label} className="bg-white/4 rounded-xl p-3">
                      <p className="text-white/35 text-xs mb-1">{item.label}</p>
                      <p className={`text-sm font-semibold ${item.color}`}>{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass rounded-2xl border-glow p-5">
                <h4 className="text-white font-bold mb-3 text-sm">Trip Status</h4>
                <div className="flex flex-col gap-2">
                  {['Booking confirmed', 'Driver en route', 'Destination verified', 'Trip in progress'].map((s, i) => (
                    <div key={s} className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${i < 2 ? 'bg-cyan' : 'bg-white/20'}`} />
                      <span className={`text-sm ${i < 2 ? 'text-white' : 'text-white/30'}`}>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="about" className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass rounded-3xl border-glow p-12 glow-blue relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 50% 0%, #2878FF, transparent 70%)' }} />
            <div className="relative z-10">
              <span className="text-cyan text-xs font-semibold uppercase tracking-widest mb-4 block">Get Started</span>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
                Your Next Ride Starts with <span className="text-gradient">RIDZZ.</span>
              </h2>
              <p className="text-white/50 text-lg mb-8">
                A simpler way to plan your everyday journeys.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link to="/register" className="btn-primary !py-3.5 !px-8 text-base">
                  <Zap size={18} /> Get Started
                </Link>
                <Link to="/book" className="btn-cyan !py-3.5 !px-8 text-base">
                  Book a Ride <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
