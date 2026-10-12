import React from 'react';
import { Shield, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';

interface Props {
  pickup: string;
  destination: string;
  confirmedDestination?: string;
  onConfirm?: () => void;
  onCorrect?: () => void;
}

export default function DestinationGuard({ pickup, destination, confirmedDestination, onConfirm, onCorrect }: Props) {
  const hasMismatch =
    confirmedDestination &&
    confirmedDestination.trim().toLowerCase() !== destination.trim().toLowerCase();

  return (
    <div className={`rounded-2xl border p-5 transition-all duration-300 ${
      hasMismatch
        ? 'border-amber-400/40 bg-amber-400/5'
        : 'border-cyan/30 bg-cyan/5'
    }`}>
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-4">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
          hasMismatch ? 'bg-amber-400/15' : 'bg-cyan/15'
        }`}>
          <Shield size={18} className={hasMismatch ? 'text-amber-400' : 'text-cyan'} />
        </div>
        <div>
          <h3 className="text-white font-bold text-sm">Destination Guard</h3>
          <p className="text-white/45 text-xs">RIDZZ Smart Destination Verification</p>
        </div>
        {hasMismatch ? (
          <AlertTriangle size={16} className="ml-auto text-amber-400" />
        ) : (
          <CheckCircle size={16} className="ml-auto text-cyan" />
        )}
      </div>

      {/* Route */}
      <div className="flex flex-col gap-2 mb-4">
        <div className="flex items-start gap-2.5">
          <div className="mt-1 w-2 h-2 rounded-full bg-cyan shrink-0" />
          <div>
            <p className="text-white/40 text-xs">Your Pickup</p>
            <p className="text-white text-sm font-medium">{pickup || '—'}</p>
          </div>
        </div>
        <div className="ml-[3px] w-0.5 h-5 bg-white/10 ml-1" />
        <div className="flex items-start gap-2.5">
          <div className="mt-1 w-2 h-2 rounded-full bg-blue shrink-0" />
          <div>
            <p className="text-white/40 text-xs">Your Destination</p>
            <p className="text-white text-sm font-medium">{destination || '—'}</p>
          </div>
        </div>
        {confirmedDestination && (
          <>
            <div className="ml-[3px] w-0.5 h-5 bg-white/10 ml-1" />
            <div className="flex items-start gap-2.5">
              <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${hasMismatch ? 'bg-amber-400' : 'bg-green-400'}`} />
              <div>
                <p className="text-white/40 text-xs">Driver's Confirmed Destination</p>
                <p className={`text-sm font-medium ${hasMismatch ? 'text-amber-300' : 'text-green-300'}`}>
                  {confirmedDestination}
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Mismatch warning */}
      {hasMismatch && (
        <div className="bg-amber-400/10 rounded-xl p-3 mb-4 border border-amber-400/20">
          <p className="text-amber-300 text-xs font-medium flex items-center gap-1.5">
            <AlertTriangle size={13} />
            Destination mismatch detected! Please verify before starting the trip.
          </p>
        </div>
      )}

      {/* Actions */}
      {(onConfirm || onCorrect) && (
        <div className="flex gap-2">
          {hasMismatch && onCorrect && (
            <button onClick={onCorrect} className="btn-secondary flex-1 !py-2 !text-sm justify-center">
              Correct Destination
            </button>
          )}
          {onConfirm && (
            <button onClick={onConfirm} className={`flex-1 !py-2 !text-sm justify-center flex items-center gap-1.5 ${hasMismatch ? 'btn-secondary' : 'btn-cyan'}`}>
              {hasMismatch ? 'Confirm Anyway' : 'Confirm & Start'}
              <ArrowRight size={14} />
            </button>
          )}
        </div>
      )}

      {!onConfirm && !onCorrect && (
        <p className="text-white/30 text-xs text-center mt-2">
          Full verification available when backend services are configured.
        </p>
      )}
    </div>
  );
}
