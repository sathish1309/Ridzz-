import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MapPin, Navigation, Loader, CheckCircle, ArrowRight, Clock, Users, ShieldCheck, Sparkles } from 'lucide-react';
import BookingCard from '../components/BookingCard';
import DestinationGuard from '../components/DestinationGuard';
import { RIDE_TYPES, DEMO_DRIVERS, POPULAR_LOCATIONS } from '../data/demo';
import { useAuth } from '../context/AuthContext';

type BookingStep = 'form' | 'options' | 'confirm' | 'success';

function calcFare(type: typeof RIDE_TYPES[0], km: number) {
  return Math.round(type.basePrice + type.pricePerKm * km);
}

export default function BookRidePage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [pickup, setPickup] = useState(state?.pickup || '');
  const [destination, setDestination] = useState(state?.destination || '');
  const [rideType, setRideType] = useState(state?.rideType || RIDE_TYPES[1].id);
  const [step, setStep] = useState<BookingStep>(
    state?.pickup && state?.destination ? 'options' : 'form'
  );
  const [confirming, setConfirming] = useState(false);
  const [rideId] = useState(() => 'RZ-' + Math.floor(Math.random() * 900000 + 100000));

  useEffect(() => {
    if (state?.pickup && state?.destination) {
      setPickup(state.pickup);
      setDestination(state.destination);
      if (state.rideType) setRideType(state.rideType);
      setStep('options');
    }
  }, [state]);

  const selectedType = RIDE_TYPES.find((r) => r.id === rideType) || RIDE_TYPES[1];
  const demoKm = 7.2;
  const fare = calcFare(selectedType, demoKm);
  const driver = DEMO_DRIVERS.find((d) => d.type === rideType) || DEMO_DRIVERS[0];

  const handleRouteSelected = (data: { pickup: string; destination: string; rideType: string }) => {
    setPickup(data.pickup);
    setDestination(data.destination);
    setRideType(data.rideType);
    setStep('options');
  };

  const handleConfirm = async () => {
    setConfirming(true);
    await new Promise((r) => setTimeout(r, 1400));
    setConfirming(false);
    setStep('success');
  };

  return (
    <div className="min-h-screen bg-gradient-dark pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan/10 border border-cyan/25 text-cyan text-xs font-semibold mb-3">
            <Sparkles size={12} /> RIDZZ Ride Booking Engine
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Book a Ride</h1>
          <p className="text-white/45 mt-1">
            {step === 'form' && 'Select your pickup and destination to find available rides.'}
            {step === 'options' && 'Compare categories, check upfront pricing, and pick your ride.'}
            {step === 'confirm' && 'Verify route details with RIDZZ Destination Guard before match.'}
            {step === 'success' && 'Ride matched successfully! Driver is on the way.'}
          </p>
        </div>

        {/* Step indicators */}
        <div className="flex items-center gap-2 mb-8">
          {(['form', 'options', 'confirm', 'success'] as BookingStep[]).map((s, i) => (
            <React.Fragment key={s}>
              <button
                type="button"
                onClick={() => {
                  if (s === 'form') setStep('form');
                  if (s === 'options' && pickup && destination) setStep('options');
                }}
                className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-all ${
                  step === s
                    ? 'bg-blue text-white shadow-md'
                    : ['form', 'options', 'confirm', 'success'].indexOf(step) > i
                    ? 'bg-cyan/20 text-cyan cursor-pointer'
                    : 'bg-white/5 text-white/30'
                }`}
              >
                {['form', 'options', 'confirm', 'success'].indexOf(step) > i && <CheckCircle size={12} />}
                {['1. Route & Dest', '2. Ride Options', '3. Guard & Confirm', '4. Matched'][i]}
              </button>
              {i < 3 && (
                <div
                  className={`h-px flex-1 ${
                    ['form', 'options', 'confirm', 'success'].indexOf(step) > i ? 'bg-cyan/40' : 'bg-white/10'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* STEP 1: ROUTE SELECTION */}
        {step === 'form' && (
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7">
              <BookingCard
                compact={false}
                initialPickup={pickup}
                initialDestination={destination}
                initialRideType={rideType}
                onSearchSubmit={handleRouteSelected}
              />
            </div>

            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="glass rounded-2xl border-glow p-6">
                <h3 className="text-white font-bold text-base mb-3 flex items-center gap-2">
                  <ShieldCheck size={18} className="text-cyan" />
                  Popular Hubs &amp; Destinations
                </h3>
                <p className="text-white/45 text-xs mb-4">
                  Tap any popular spot below to immediately set it as your destination:
                </p>
                <div className="flex flex-col gap-2">
                  {POPULAR_LOCATIONS.map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => {
                        setDestination(loc);
                        if (!pickup) setPickup('Koramangala 5th Block, Bengaluru');
                      }}
                      className="text-left p-2.5 rounded-xl bg-white/5 hover:bg-blue/20 hover:border-blue/40 border border-white/5 transition-all text-xs text-white/80 flex items-center justify-between group"
                    >
                      <span className="flex items-center gap-2">
                        <MapPin size={13} className="text-cyan group-hover:scale-110 transition-transform" />
                        <span className="truncate">{loc}</span>
                      </span>
                      <span className="text-blue text-[11px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                        Select →
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: RIDE OPTIONS & FARES */}
        {step === 'options' && (
          <div className="grid lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3 flex flex-col gap-5">
              {/* Route summary */}
              <div className="glass rounded-2xl border-glow p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-bold text-sm uppercase tracking-wider">Confirmed Route</h3>
                  <button
                    onClick={() => setStep('form')}
                    className="text-cyan hover:text-cyan-300 text-xs font-semibold"
                  >
                    Change Route
                  </button>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-cyan shrink-0" />
                    <div>
                      <p className="text-white/35 text-xs">Pickup Location</p>
                      <p className="text-white text-sm font-semibold">{pickup || 'Bengaluru Center'}</p>
                    </div>
                  </div>
                  <div className="ml-1 w-px h-4 bg-white/15" />
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue shrink-0" />
                    <div>
                      <p className="text-white/35 text-xs">Destination Location</p>
                      <p className="text-white text-sm font-semibold">{destination}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ride types selection */}
              <div className="glass rounded-2xl border-glow p-5">
                <h3 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Select Ride Category</h3>
                <div className="flex flex-col gap-3">
                  {RIDE_TYPES.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setRideType(type.id)}
                      className={`flex items-center gap-4 p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                        rideType === type.id
                          ? 'border-blue bg-blue/15 shadow-[0_0_20px_rgba(40,120,255,0.2)]'
                          : 'border-white/10 hover:border-white/25 hover:bg-white/5'
                      }`}
                    >
                      <span className="text-3xl">{type.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-bold">{type.name}</span>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                              type.tagColor === 'cyan'
                                ? 'bg-cyan/15 text-cyan'
                                : type.tagColor === 'blue'
                                ? 'bg-blue/15 text-blue'
                                : 'bg-yellow-400/15 text-yellow-400'
                            }`}
                          >
                            {type.tag}
                          </span>
                        </div>
                        <p className="text-white/40 text-xs mt-0.5">{type.description}</p>
                        <div className="flex items-center gap-3 mt-1.5 text-xs text-white/45">
                          <span className="flex items-center gap-1">
                            <Clock size={11} className="text-cyan" /> {type.eta}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users size={11} className="text-blue" /> {type.capacity} rider
                            {type.capacity > 1 ? 's' : ''}
                          </span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-white font-extrabold text-xl">₹{calcFare(type, demoKm)}</p>
                        <p className="text-white/30 text-[11px]">estimated fare</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Price breakdown & Guard preview */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <DestinationGuard
                pickup={pickup}
                destination={destination}
                confirmedDestination={destination}
              />

              <div className="glass rounded-2xl border-glow p-5">
                <h3 className="text-white font-bold text-sm mb-3">Fare Breakdown</h3>
                <div className="flex flex-col gap-2.5 text-sm">
                  {[
                    { label: 'Base Fare', value: `₹${selectedType.basePrice}` },
                    {
                      label: `Distance (${demoKm} km × ₹${selectedType.pricePerKm})`,
                      value: `₹${Math.round(selectedType.pricePerKm * demoKm)}`,
                    },
                    { label: 'Platform & Tech Fee', value: '₹5' },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between">
                      <span className="text-white/45 text-xs">{row.label}</span>
                      <span className="text-white font-medium text-xs">{row.value}</span>
                    </div>
                  ))}
                  <div className="border-t border-white/10 pt-2.5 mt-1 flex justify-between font-bold text-base">
                    <span className="text-white">Estimated Total</span>
                    <span className="text-cyan">₹{fare + 5}</span>
                  </div>
                </div>
                <p className="text-white/30 text-[11px] mt-2 leading-relaxed">
                  Clear upfront demo estimate. Live fare tracking activated once ride begins.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setStep('confirm')}
                className="btn-primary w-full justify-center !py-3.5 text-base cursor-pointer"
              >
                Review &amp; Book {selectedType.name} <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: DESTINATION GUARD & CONFIRM */}
        {step === 'confirm' && (
          <div className="grid lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="flex flex-col gap-4">
              <div className="glass rounded-2xl border-glow p-6">
                <h3 className="text-white font-bold mb-4 text-base">Final Trip Summary</h3>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-3xl">{selectedType.icon}</span>
                    <div className="flex-1">
                      <p className="text-white font-bold">{selectedType.name} Ride</p>
                      <p className="text-white/40 text-xs">{selectedType.description}</p>
                    </div>
                    <span className="text-cyan font-bold text-sm">{selectedType.eta} pickup</span>
                  </div>

                  {driver && (
                    <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10">
                      <div className="w-10 h-10 rounded-full bg-gradient-brand flex items-center justify-center text-sm font-bold text-white shrink-0">
                        {driver.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold text-sm">{driver.name}</p>
                        <p className="text-white/40 text-xs truncate">
                          {driver.vehicle} • {driver.vehicleNo}
                        </p>
                      </div>
                      <span className="text-yellow-400 text-xs font-bold">★ {driver.rating}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-blue/10 border border-blue/20 rounded-xl p-3">
                      <p className="text-white/40 text-xs">Total Fare</p>
                      <p className="text-white font-bold text-xl">₹{fare + 5}</p>
                      <p className="text-white/25 text-[10px]">demo upfront fare</p>
                    </div>
                    <div className="bg-cyan/8 border border-cyan/20 rounded-xl p-3">
                      <p className="text-white/40 text-xs">Est. Arrival</p>
                      <p className="text-cyan font-bold text-xl">{selectedType.eta}</p>
                      <p className="text-cyan/50 text-[10px]">fastest nearby driver</p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleConfirm}
                disabled={confirming}
                className="btn-cyan w-full justify-center !py-4 text-base cursor-pointer shadow-lg"
              >
                {confirming ? (
                  <>
                    <Loader size={18} className="animate-spin" /> Matching with Driver…
                  </>
                ) : (
                  <>
                    <CheckCircle size={18} /> Confirm &amp; Dispatch Ride
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setStep('options')}
                className="btn-secondary w-full justify-center !py-2.5 text-sm cursor-pointer"
              >
                ← Back to Ride Options
              </button>
            </div>

            <DestinationGuard
              pickup={pickup}
              destination={destination}
              confirmedDestination={destination}
              onConfirm={handleConfirm}
              onCorrect={() => setStep('form')}
            />
          </div>
        )}

        {/* STEP 4: SUCCESS / RIDE MATCHED */}
        {step === 'success' && (
          <div className="max-w-xl mx-auto text-center">
            <div className="glass rounded-3xl border-glow p-8 md:p-10 shadow-2xl">
              <div className="w-20 h-20 rounded-full bg-cyan/15 border border-cyan/30 flex items-center justify-center mx-auto mb-5 glow-cyan">
                <CheckCircle size={38} className="text-cyan" />
              </div>
              <h2 className="text-3xl font-extrabold text-white mb-2">Ride Confirmed!</h2>
              <p className="text-white/50 text-sm mb-6">
                Your driver is currently on their way to pick you up. Destination Guard is active.
              </p>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6 text-left flex flex-col gap-3">
                <div className="flex justify-between text-sm pb-2 border-b border-white/5">
                  <span className="text-white/40 text-xs">Booking ID</span>
                  <span className="text-cyan font-mono font-bold text-xs">{rideId}</span>
                </div>
                <div className="flex justify-between text-sm pb-2 border-b border-white/5">
                  <span className="text-white/40 text-xs">Ride Type</span>
                  <span className="text-white font-semibold text-xs">
                    {selectedType.icon} {selectedType.name}
                  </span>
                </div>
                <div className="flex justify-between text-sm pb-2 border-b border-white/5">
                  <span className="text-white/40 text-xs">Pickup</span>
                  <span className="text-white text-right text-xs max-w-[65%] truncate">{pickup}</span>
                </div>
                <div className="flex justify-between text-sm pb-2 border-b border-white/5">
                  <span className="text-white/40 text-xs">Destination</span>
                  <span className="text-white text-right text-xs max-w-[65%] truncate font-medium text-cyan">
                    {destination}
                  </span>
                </div>
                <div className="flex justify-between text-sm pt-1">
                  <span className="text-white/40 text-xs">Driver Assigned</span>
                  <span className="text-white font-medium text-xs">
                    {driver.name} ({driver.vehicle})
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/40 text-xs">Fare (Demo)</span>
                  <span className="text-cyan font-bold text-sm">₹{fare + 5}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="btn-primary flex-1 justify-center !py-3.5 cursor-pointer"
                >
                  View My Rides <ArrowRight size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPickup('');
                    setDestination('');
                    setStep('form');
                  }}
                  className="btn-secondary flex-1 justify-center !py-3.5 cursor-pointer text-sm"
                >
                  Book Another Ride
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
