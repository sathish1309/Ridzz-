import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Navigation, Search, AlertCircle, Loader, LocateFixed, ArrowRight, Sparkles } from 'lucide-react';
import { RIDE_TYPES, POPULAR_LOCATIONS } from '../data/demo';

function calcFare(type: typeof RIDE_TYPES[0], km: number) {
  return Math.round(type.basePrice + type.pricePerKm * km);
}

interface Props {
  compact?: boolean;
  initialPickup?: string;
  initialDestination?: string;
  initialRideType?: string;
  onSearchSubmit?: (data: { pickup: string; destination: string; rideType: string }) => void;
}

export default function BookingCard({
  compact = false,
  initialPickup = '',
  initialDestination = '',
  initialRideType,
  onSearchSubmit,
}: Props) {
  const navigate = useNavigate();
  const [pickup, setPickup] = useState(initialPickup);
  const [destination, setDestination] = useState(initialDestination);
  const [rideType, setRideType] = useState(initialRideType || RIDE_TYPES[1].id);
  const [errors, setErrors] = useState<{ pickup?: string; destination?: string }>({});
  const [loading, setLoading] = useState(false);
  const [locating, setLocating] = useState(false);

  // Autocomplete / suggestion states
  const [showPickupSuggestions, setShowPickupSuggestions] = useState(false);
  const [showDestSuggestions, setShowDestSuggestions] = useState(false);

  const pickupRef = useRef<HTMLDivElement>(null);
  const destRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialPickup) setPickup(initialPickup);
  }, [initialPickup]);

  useEffect(() => {
    if (initialDestination) setDestination(initialDestination);
  }, [initialDestination]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (pickupRef.current && !pickupRef.current.contains(e.target as Node)) {
        setShowPickupSuggestions(false);
      }
      if (destRef.current && !destRef.current.contains(e.target as Node)) {
        setShowDestSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedType = RIDE_TYPES.find((r) => r.id === rideType) || RIDE_TYPES[1];
  const demoKm = 6.5;
  const estimatedFare = calcFare(selectedType, demoKm);

  const filteredPickupSuggestions = POPULAR_LOCATIONS.filter(
    (loc) => !pickup || loc.toLowerCase().includes(pickup.toLowerCase())
  ).slice(0, 4);

  const filteredDestSuggestions = POPULAR_LOCATIONS.filter(
    (loc) => (!destination || loc.toLowerCase().includes(destination.toLowerCase())) && loc !== pickup
  ).slice(0, 4);

  const handleLocate = () => {
    if (!navigator.geolocation) {
      setPickup('MG Road Metro Station, Bengaluru');
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      () => {
        setPickup('Current Location (GPS - Bengaluru)');
        setErrors((prev) => ({ ...prev, pickup: undefined }));
        setLocating(false);
      },
      () => {
        // Fallback gracefully to default city center
        setPickup('MG Road Metro Station, Bengaluru');
        setErrors((prev) => ({ ...prev, pickup: undefined }));
        setLocating(false);
      },
      { timeout: 5000 }
    );
  };

  const validate = () => {
    const errs: typeof errors = {};
    if (!pickup.trim()) errs.pickup = 'Please enter or select a pickup location.';
    if (!destination.trim()) errs.destination = 'Please enter or select a destination.';
    if (pickup.trim() && destination.trim() && pickup.trim().toLowerCase() === destination.trim().toLowerCase()) {
      errs.destination = 'Pickup and destination cannot be the same.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSearch = async () => {
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);

    if (onSearchSubmit) {
      onSearchSubmit({ pickup, destination, rideType });
    } else {
      navigate('/book', { state: { pickup, destination, rideType } });
    }
  };

  return (
    <div className={`glass rounded-2xl border-glow ${compact ? 'p-5' : 'p-6 md:p-8'} relative`}>
      {!compact && (
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-xl font-bold text-white">Book Your Ride</h3>
          <span className="text-xs px-2.5 py-1 rounded-full bg-cyan/15 text-cyan border border-cyan/30 flex items-center gap-1 font-semibold">
            <Sparkles size={12} /> Instant Find
          </span>
        </div>
      )}
      {!compact && (
        <p className="text-white/45 text-sm mb-6">Enter your route or select popular city hubs.</p>
      )}

      <div className="flex flex-col gap-4">
        {/* Pickup Input */}
        <div ref={pickupRef} className="relative">
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider">
              Pickup Location
            </label>
            <button
              type="button"
              onClick={handleLocate}
              disabled={locating}
              className="text-xs text-cyan hover:text-cyan-300 flex items-center gap-1 transition-colors"
            >
              {locating ? <Loader size={12} className="animate-spin" /> : <LocateFixed size={12} />}
              Use current location
            </button>
          </div>
          <div className="relative">
            <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan" />
            <input
              type="text"
              value={pickup}
              onFocus={() => setShowPickupSuggestions(true)}
              onChange={(e) => {
                setPickup(e.target.value);
                setShowPickupSuggestions(true);
                setErrors((p) => ({ ...p, pickup: undefined }));
              }}
              placeholder="Enter pickup point (e.g. Koramangala)..."
              className="input-field pl-9 pr-8"
            />
            {pickup && (
              <button
                type="button"
                onClick={() => setPickup('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>
          {errors.pickup && (
            <p className="flex items-center gap-1.5 text-red-400 text-xs mt-1.5">
              <AlertCircle size={12} /> {errors.pickup}
            </p>
          )}

          {/* Pickup Suggestions Dropdown */}
          {showPickupSuggestions && filteredPickupSuggestions.length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-1.5 bg-[#0a1832] border border-cyan/30 rounded-xl shadow-2xl z-30 overflow-hidden py-1">
              <div className="px-3 py-1.5 text-[11px] font-semibold text-white/40 uppercase tracking-wider border-b border-white/5">
                Suggested Pickup Spots
              </div>
              {filteredPickupSuggestions.map((spot) => (
                <button
                  key={spot}
                  type="button"
                  onClick={() => {
                    setPickup(spot);
                    setShowPickupSuggestions(false);
                    setErrors((p) => ({ ...p, pickup: undefined }));
                  }}
                  className="w-full text-left px-3.5 py-2.5 text-xs text-white/80 hover:bg-blue/20 hover:text-white flex items-center gap-2 transition-colors border-b border-white/5 last:border-b-0"
                >
                  <MapPin size={12} className="text-cyan shrink-0" />
                  <span className="truncate">{spot}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Destination Input */}
        <div ref={destRef} className="relative">
          <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-1.5">
            Destination
          </label>
          <div className="relative">
            <Navigation size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue" />
            <input
              type="text"
              value={destination}
              onFocus={() => setShowDestSuggestions(true)}
              onChange={(e) => {
                setDestination(e.target.value);
                setShowDestSuggestions(true);
                setErrors((p) => ({ ...p, destination: undefined }));
              }}
              placeholder="Where to? (e.g. Indiranagar, Airport)..."
              className="input-field pl-9 pr-8"
            />
            {destination && (
              <button
                type="button"
                onClick={() => setDestination('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>
          {errors.destination && (
            <p className="flex items-center gap-1.5 text-red-400 text-xs mt-1.5">
              <AlertCircle size={12} /> {errors.destination}
            </p>
          )}

          {/* Quick Destination Chips */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {POPULAR_LOCATIONS.slice(0, 3).map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => {
                  setDestination(loc);
                  setShowDestSuggestions(false);
                  setErrors((p) => ({ ...p, destination: undefined }));
                }}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-white/5 hover:bg-blue/15 hover:border-blue/40 border border-white/10 text-white/60 hover:text-cyan transition-all truncate max-w-[200px]"
              >
                + {loc.split(',')[0]}
              </button>
            ))}
          </div>

          {/* Destination Suggestions Dropdown */}
          {showDestSuggestions && filteredDestSuggestions.length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-1.5 bg-[#0a1832] border border-blue/40 rounded-xl shadow-2xl z-30 overflow-hidden py-1">
              <div className="px-3 py-1.5 text-[11px] font-semibold text-white/40 uppercase tracking-wider border-b border-white/5">
                Popular Destinations
              </div>
              {filteredDestSuggestions.map((spot) => (
                <button
                  key={spot}
                  type="button"
                  onClick={() => {
                    setDestination(spot);
                    setShowDestSuggestions(false);
                    setErrors((p) => ({ ...p, destination: undefined }));
                  }}
                  className="w-full text-left px-3.5 py-2.5 text-xs text-white/80 hover:bg-blue/20 hover:text-white flex items-center gap-2 transition-colors border-b border-white/5 last:border-b-0"
                >
                  <Navigation size={12} className="text-blue shrink-0" />
                  <span className="truncate">{spot}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Ride type selector */}
        <div>
          <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-1.5">
            Ride Category
          </label>
          <div className="grid grid-cols-3 gap-2">
            {RIDE_TYPES.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => setRideType(type.id)}
                className={`flex flex-col items-center gap-1 py-3 px-2 rounded-xl border transition-all duration-200 ${
                  rideType === type.id
                    ? 'border-blue bg-blue/10 shadow-[0_0_15px_rgba(40,120,255,0.2)]'
                    : 'border-white/10 hover:border-white/25'
                }`}
              >
                <span className="text-xl">{type.icon}</span>
                <span className={`text-xs font-semibold ${rideType === type.id ? 'text-white' : 'text-white/60'}`}>
                  {type.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Fare estimate */}
        <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-white/5 border border-white/8">
          <div>
            <p className="text-xs text-white/40 mb-0.5">Estimated Fare</p>
            <p className="text-lg font-bold text-white">
              ₹{estimatedFare}
              <span className="text-xs font-normal text-white/40 ml-1">demo value</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-white/40 mb-0.5">ETA</p>
            <p className="text-sm font-semibold text-cyan">{selectedType.eta}</p>
          </div>
        </div>

        {/* CTA */}
        <button
          type="button"
          onClick={handleSearch}
          disabled={loading}
          className="btn-primary w-full justify-center !py-3.5 text-base cursor-pointer hover:shadow-lg"
        >
          {loading ? (
            <>
              <Loader size={16} className="animate-spin" /> Locating Drivers &amp; Rides…
            </>
          ) : (
            <>
              <Search size={16} /> Find &amp; Book Ride <ArrowRight size={16} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
