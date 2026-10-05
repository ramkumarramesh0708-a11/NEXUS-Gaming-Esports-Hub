import React from 'react';
import { X, Trophy, CheckCircle, MapPin, Calendar, QrCode, Printer, Shield, User, Users } from 'lucide-react';
import { TournamentRegistration } from '../types';

interface TicketPassModalProps {
  registration: TournamentRegistration | null;
  onClose: () => void;
  onCheckInToggle?: (ticketId: string) => void;
}

export const TicketPassModal: React.FC<TicketPassModalProps> = ({
  registration,
  onClose,
  onCheckInToggle
}) => {
  if (!registration) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-slate-900 border-2 border-purple-500/50 rounded-3xl shadow-[0_0_50px_rgba(168,85,247,0.3)] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-950 p-6 border-b border-purple-500/30 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center border border-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 text-xs font-mono text-purple-300 uppercase tracking-widest">
            <Trophy className="w-4 h-4 text-yellow-400" />
            <span>OFFICIAL ESPORTS ARENA BADGE</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white font-['Orbitron'] mt-1">
            {registration.tournamentTitle}
          </h2>
          <p className="text-xs text-purple-200/70 font-mono mt-0.5">
            Game Title: {registration.game}
          </p>
        </div>

        {/* Pass Core Content */}
        <div className="p-6 space-y-6">
          {/* Ticket ID & Check-in Status */}
          <div className="flex items-center justify-between bg-slate-950 p-3.5 rounded-xl border border-purple-500/30">
            <div>
              <span className="text-[10px] text-slate-400 font-mono uppercase block">Registration Code</span>
              <span className="text-base font-black text-purple-300 font-mono tracking-wider">
                {registration.ticketId}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className={`text-xs font-mono px-3 py-1 rounded-full border flex items-center gap-1.5 ${
                registration.checkedIn 
                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50' 
                  : 'bg-yellow-950/80 text-yellow-300 border-yellow-500/50'
              }`}>
                <span className={`w-2 h-2 rounded-full ${registration.checkedIn ? 'bg-emerald-400' : 'bg-yellow-400 animate-ping'}`}></span>
                {registration.checkedIn ? 'Checked-In' : 'Pending Check-In'}
              </span>

              {onCheckInToggle && (
                <button
                  onClick={() => onCheckInToggle(registration.ticketId)}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-purple-600 text-[11px] font-mono text-white transition-colors cursor-pointer"
                >
                  {registration.checkedIn ? 'Undo' : 'Check In'}
                </button>
              )}
            </div>
          </div>

          {/* Player & Team Details */}
          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-500 block text-[10px] uppercase">Gamer Tag</span>
              <span className="text-white font-bold text-sm">{registration.gamerTag}</span>
              <span className="text-slate-400 block text-[11px]">{registration.captainName}</span>
            </div>

            <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-500 block text-[10px] uppercase">Discord Handle</span>
              <span className="text-purple-300 font-semibold">{registration.discordTag}</span>
              <span className="text-slate-400 block text-[11px]">{registration.platform}</span>
            </div>

            {registration.teamName && (
              <div className="col-span-2 bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-500 block text-[10px] uppercase flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" /> Team Roster: {registration.teamName}
                </span>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-200 text-[10px] border border-purple-500/30">
                    Leader: {registration.gamerTag}
                  </span>
                  {registration.teammates?.map((mate, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 text-[10px] border border-slate-800">
                      {mate}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Station / Pod Assignment */}
            <div className="col-span-2 bg-slate-950/60 p-3 rounded-lg border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Assigned LAN Station / Pod</span>
                <span className="text-cyan-300 font-bold text-xs">{registration.assignedSeat || 'Allocating...'}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-500 block text-[10px] uppercase">Tournament Slot</span>
                <span className="text-slate-200 font-bold text-xs">{registration.bracketSlot || 'Open Bracket'}</span>
              </div>
            </div>
          </div>

          {/* Barcode & Security Hologram simulation */}
          <div className="p-4 rounded-xl bg-slate-950 border border-dashed border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <div className="text-[11px] font-mono text-slate-400">Security Verification Hash</div>
              <div className="text-[9px] font-mono text-slate-500 break-all max-w-[240px]">
                SHA-256: 4a8f90b1e32d9c08a471f28b05e0c5d6
              </div>
              <div className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                <Shield className="w-3 h-3" /> Anti-Cheat Verified Entry
              </div>
            </div>

            <div className="w-16 h-16 bg-white p-1 rounded-lg flex items-center justify-center shrink-0">
              <QrCode className="w-14 h-14 text-slate-950" />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={handlePrint}
              className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs font-semibold flex items-center justify-center gap-2 border border-slate-700 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4 text-cyan-400" />
              <span>Print / Save Pass</span>
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs font-bold transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
