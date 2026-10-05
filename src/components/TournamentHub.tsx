import React, { useState } from 'react';
import { 
  Trophy, 
  Users, 
  MapPin, 
  Calendar, 
  Search, 
  CheckCircle2, 
  Award, 
  Flame, 
  ShieldCheck, 
  Clock, 
  Ticket, 
  ChevronRight, 
  AlertCircle,
  Gamepad,
  Sparkles,
  Info
} from 'lucide-react';
import { Tournament, TournamentRegistration } from '../types';
import { fireConfetti, playCyberBeep } from '../utils/helpers';
import { TicketPassModal } from './TicketPassModal';

interface TournamentHubProps {
  tournaments: Tournament[];
  registrations: TournamentRegistration[];
  onAddRegistration: (registration: TournamentRegistration) => void;
  onUpdateRegistration: (registration: TournamentRegistration) => void;
  soundEnabled: boolean;
}

export const TournamentHub: React.FC<TournamentHubProps> = ({
  tournaments,
  registrations,
  onAddRegistration,
  onUpdateRegistration,
  soundEnabled
}) => {
  const [selectedGameFilter, setSelectedGameFilter] = useState<string>('All');
  const [ticketSearch, setTicketSearch] = useState<string>('');
  
  // Registration modal state
  const [registeringTournament, setRegisteringTournament] = useState<Tournament | null>(null);
  const [captainName, setCaptainName] = useState('');
  const [gamerTag, setGamerTag] = useState('');
  const [discordTag, setDiscordTag] = useState('');
  const [email, setEmail] = useState('');
  const [teamName, setTeamName] = useState('');
  const [teammatesInput, setTeammatesInput] = useState('');
  const [platform, setPlatform] = useState('PC (High Refresh)');
  const [agreeRules, setAgreeRules] = useState(false);
  const [formError, setFormError] = useState('');

  // Active viewing pass
  const [viewingPass, setViewingPass] = useState<TournamentRegistration | null>(null);

  // Expanded rules/schedule tournament ID
  const [viewingRulesId, setViewingRulesId] = useState<string | null>(null);

  // Active roster preview tournament ID
  const [viewingRosterId, setViewingRosterId] = useState<string | null>(null);

  // Unique game categories for filter pills
  const gamesList = ['All', 'Valorant', 'Tekken 8', 'Counter-Strike 2', 'Apex Legends', 'Rocket League'];

  const filteredTournaments = tournaments.filter(t => {
    if (selectedGameFilter !== 'All' && t.game !== selectedGameFilter) return false;
    return true;
  });

  // Ticket / Player Pass Lookup
  const searchedRegistration = registrations.find(r => {
    const q = ticketSearch.toLowerCase().trim();
    if (!q) return false;
    return (
      r.ticketId.toLowerCase().includes(q) ||
      r.gamerTag.toLowerCase().includes(q) ||
      r.email.toLowerCase().includes(q) ||
      (r.teamName && r.teamName.toLowerCase().includes(q))
    );
  });

  const handleOpenRegister = (tournament: Tournament) => {
    if (soundEnabled) playCyberBeep(650, 0.08);
    setRegisteringTournament(tournament);
    setFormError('');
  };

  const handleSubmitRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registeringTournament) return;

    if (!captainName.trim() || !gamerTag.trim() || !discordTag.trim() || !email.trim()) {
      setFormError('Please fill out all mandatory contact & tag fields.');
      return;
    }

    if (!agreeRules) {
      setFormError('You must agree to the tournament official rulebook & fair-play pledge.');
      return;
    }

    const initials = registeringTournament.game.substring(0, 3).toUpperCase();
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const newTicketId = `TKT-${initials}-${randomCode}`;

    const teammatesList = teammatesInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const stations = ['Alpha-07', 'Bravo-12', 'Charlie-03', 'Pod D-09', 'Mainstage Station 4'];
    const randomStation = `${registeringTournament.locationType.includes('LAN') ? 'LAN Station ' : 'Online Lobby '}${stations[Math.floor(Math.random() * stations.length)]}`;

    const newReg: TournamentRegistration = {
      ticketId: newTicketId,
      tournamentId: registeringTournament.id,
      tournamentTitle: registeringTournament.title,
      game: registeringTournament.game,
      registeredAt: new Date().toISOString().split('T')[0],
      captainName: captainName.trim(),
      gamerTag: gamerTag.trim(),
      email: email.trim(),
      discordTag: discordTag.trim(),
      teamName: teamName.trim() || undefined,
      teammates: teammatesList.length > 0 ? teammatesList : undefined,
      platform,
      assignedSeat: randomStation,
      bracketSlot: `Pool ${String.fromCharCode(65 + Math.floor(Math.random() * 4))} - Seed #${Math.floor(1 + Math.random() * 16)}`,
      checkedIn: true
    };

    onAddRegistration(newReg);
    fireConfetti();
    if (soundEnabled) playCyberBeep(950, 0.15);

    // Reset form
    setCaptainName('');
    setGamerTag('');
    setDiscordTag('');
    setEmail('');
    setTeamName('');
    setTeammatesInput('');
    setAgreeRules(false);
    setRegisteringTournament(null);

    // Immediately open digital pass modal
    setViewingPass(newReg);
  };

  const handleCheckInToggle = (ticketId: string) => {
    const reg = registrations.find(r => r.ticketId === ticketId);
    if (!reg) return;
    const updated = { ...reg, checkedIn: !reg.checkedIn };
    onUpdateRegistration(updated);
    if (viewingPass && viewingPass.ticketId === ticketId) {
      setViewingPass(updated);
    }
  };

  return (
    <div className="py-8 md:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-purple-500/20 pb-6">
        <div>
          <div className="flex items-center gap-2 text-purple-400 font-mono text-xs mb-1 uppercase tracking-wider">
            <Trophy className="w-4 h-4 text-yellow-400" />
            <span>NEXUS ESPORTS ARENA & LAN CIRCUIT</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white font-['Orbitron'] tracking-tight">
            TOURNAMENTS & REGISTRATION HUB
          </h1>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">
            Register your squad, reserve LAN stage seats, claim digital player credentials, and track your match brackets across premier competitive circuits.
          </p>
        </div>

        {/* Live Arena Stats Bar */}
        <div className="flex items-center gap-3">
          <div className="bg-slate-900 border border-purple-500/30 p-3 rounded-xl text-center font-mono">
            <div className="text-lg font-black text-yellow-400">$55,000</div>
            <div className="text-[10px] text-slate-400 uppercase">Prize Circuit</div>
          </div>
          <div className="bg-slate-900 border border-purple-500/30 p-3 rounded-xl text-center font-mono">
            <div className="text-lg font-black text-cyan-400">128+</div>
            <div className="text-[10px] text-slate-400 uppercase">Pro Stations</div>
          </div>
        </div>
      </div>

      {/* Ticket Pass Lookup & Check-In Search Section */}
      <div className="bg-gradient-to-r from-purple-950/40 via-slate-900 to-slate-950 border border-purple-500/30 rounded-2xl p-5 shadow-xl space-y-3">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="text-xs font-mono text-purple-300 font-bold uppercase flex items-center gap-1.5">
              <Ticket className="w-4 h-4 text-purple-400" />
              <span>Registered Player Pass & Ticket Lookup</span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Enter your Ticket ID (e.g. <span className="text-purple-300 font-mono">TKT-VAL-8821</span>) or Gamer Tag to view your Arena Credential or Check In.
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-purple-400" />
            <input
              type="text"
              placeholder="Search Ticket ID or Gamer Tag..."
              value={ticketSearch}
              onChange={(e) => setTicketSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700 focus:border-purple-400 rounded-xl text-xs text-white placeholder-slate-500 font-mono focus:outline-none"
            />
          </div>
        </div>

        {/* Instant result banner if found */}
        {searchedRegistration && (
          <div className="mt-3 p-3 bg-purple-950/60 border border-purple-500/50 rounded-xl flex items-center justify-between gap-4 animate-in fade-in">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center font-bold font-mono text-xs text-white">
                PASS
              </div>
              <div>
                <div className="text-xs font-bold text-white font-mono flex items-center gap-2">
                  <span>{searchedRegistration.gamerTag}</span>
                  <span className="text-purple-300">({searchedRegistration.ticketId})</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-900 text-purple-200">
                    {searchedRegistration.game}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  Station: {searchedRegistration.assignedSeat} • Status: {searchedRegistration.checkedIn ? 'Checked-In' : 'Pending'}
                </div>
              </div>
            </div>

            <button
              onClick={() => setViewingPass(searchedRegistration)}
              className="px-3.5 py-1.5 rounded-lg bg-purple-500 hover:bg-purple-400 text-slate-950 font-mono text-xs font-bold transition-all cursor-pointer shadow-md"
            >
              Open Digital Badge
            </button>
          </div>
        )}
      </div>

      {/* Filter Tabs by Game */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {gamesList.map((g) => (
          <button
            key={g}
            onClick={() => {
              if (soundEnabled) playCyberBeep(500, 0.04);
              setSelectedGameFilter(g);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-medium whitespace-nowrap transition-all ${
              selectedGameFilter === g
                ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] font-bold'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800'
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      {/* Tournaments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredTournaments.map((tourn) => {
          const isFull = tourn.registeredCount >= tourn.maxParticipants;
          const fillPercentage = Math.min(100, Math.round((tourn.registeredCount / tourn.maxParticipants) * 100));

          // Get list of registered players for this tournament
          const tournamentRegistrations = registrations.filter(r => r.tournamentId === tourn.id);

          return (
            <div
              key={tourn.id}
              className="bg-slate-900/90 border border-slate-800 hover:border-purple-500/40 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Top Banner & Badges */}
              <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                <img
                  src={tourn.gameBanner}
                  alt={tourn.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded bg-slate-900/80 backdrop-blur-md text-[11px] font-mono text-cyan-300 border border-cyan-500/30">
                    {tourn.game} • {tourn.format}
                  </span>

                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${
                    isFull
                      ? 'bg-red-950/80 text-red-300 border border-red-500/40'
                      : fillPercentage > 75
                      ? 'bg-amber-950/80 text-amber-300 border border-amber-500/40 animate-pulse'
                      : 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40'
                  }`}>
                    {tourn.status}
                  </span>
                </div>

                <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                  <div>
                    <span className="text-[10px] text-purple-300 font-mono uppercase block">Total Prize Pool</span>
                    <span className="text-2xl font-black text-yellow-400 font-mono drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]">
                      {tourn.prizePool}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 font-mono uppercase block">Entry Fee</span>
                    <span className="text-xs font-mono font-bold text-white">{tourn.entryFee}</span>
                  </div>
                </div>
              </div>

              {/* Tournament Details */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-['Orbitron']">
                    {tourn.title}
                  </h3>

                  <div className="grid grid-cols-2 gap-3 text-xs font-mono text-slate-400 mt-3 pt-3 border-t border-slate-800">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span>{new Date(tourn.startDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="truncate">{tourn.locationType}</span>
                    </div>
                  </div>

                  {/* Registered Slots Progress Bar */}
                  <div className="mt-4 p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-400 flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-purple-400" />
                        Slots Allocation:
                      </span>
                      <span className="text-purple-300 font-bold">
                        {tourn.registeredCount} / {tourn.maxParticipants} Registered ({fillPercentage}%)
                      </span>
                    </div>

                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
                        style={{ width: `${fillPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Interactive Accordion triggers: Rules & Registered Roster */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setViewingRulesId(viewingRulesId === tourn.id ? null : tourn.id)}
                      className="flex-1 py-1.5 px-3 rounded-lg bg-slate-950 border border-slate-800 hover:border-purple-500/40 text-xs font-mono text-slate-300 flex items-center justify-center gap-1 transition-colors"
                    >
                      <Info className="w-3.5 h-3.5 text-purple-400" />
                      <span>{viewingRulesId === tourn.id ? 'Hide Rules & Schedule' : 'Rules & Schedule'}</span>
                    </button>

                    <button
                      onClick={() => setViewingRosterId(viewingRosterId === tourn.id ? null : tourn.id)}
                      className="flex-1 py-1.5 px-3 rounded-lg bg-slate-950 border border-slate-800 hover:border-cyan-500/40 text-xs font-mono text-slate-300 flex items-center justify-center gap-1 transition-colors"
                    >
                      <Users className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{viewingRosterId === tourn.id ? 'Hide Roster' : `Registered (${tournamentRegistrations.length})`}</span>
                    </button>
                  </div>

                  {/* Rules Expansion Box */}
                  {viewingRulesId === tourn.id && (
                    <div className="p-4 rounded-xl bg-slate-950 border border-purple-500/30 space-y-3 text-xs animate-in fade-in">
                      <h4 className="font-mono font-bold text-purple-300 uppercase">Official Match Rules</h4>
                      <ul className="space-y-1 text-slate-400 font-mono">
                        {tourn.rulesSummary.map((rule, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-purple-400">•</span>
                            <span>{rule}</span>
                          </li>
                        ))}
                      </ul>

                      <h4 className="font-mono font-bold text-purple-300 uppercase pt-2 border-t border-slate-800">
                        Event Schedule
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 font-mono text-slate-300">
                        {tourn.schedule.map((sch, sIdx) => (
                          <div key={sIdx} className="bg-slate-900 p-1.5 rounded flex items-center justify-between">
                            <span className="text-cyan-400 text-[11px]">{sch.time}</span>
                            <span className="text-[11px] text-slate-300">{sch.phase}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Registered Roster Expansion Box */}
                  {viewingRosterId === tourn.id && (
                    <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/30 space-y-2 text-xs animate-in fade-in">
                      <h4 className="font-mono font-bold text-cyan-300 uppercase flex items-center justify-between">
                        <span>Current Registered Roster</span>
                        <span className="text-[10px] text-slate-400">Live Check-ins</span>
                      </h4>

                      {tournamentRegistrations.length > 0 ? (
                        <div className="space-y-1.5 max-h-40 overflow-y-auto">
                          {tournamentRegistrations.map((reg) => (
                            <div
                              key={reg.ticketId}
                              className="p-2 rounded bg-slate-900/90 border border-slate-800 flex items-center justify-between font-mono"
                            >
                              <div>
                                <span className="font-bold text-white">{reg.gamerTag}</span>
                                {reg.teamName && (
                                  <span className="text-purple-300 text-[11px] ml-1.5">[{reg.teamName}]</span>
                                )}
                                <div className="text-[10px] text-slate-400">Pass: {reg.ticketId}</div>
                              </div>

                              <div className="flex items-center gap-2">
                                <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                                  reg.checkedIn ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'
                                }`}>
                                  {reg.checkedIn ? 'Checked-In' : 'Pending'}
                                </span>
                                <button
                                  onClick={() => setViewingPass(reg)}
                                  className="text-[11px] text-cyan-400 hover:underline"
                                >
                                  Pass →
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-slate-500 font-mono">No roster entries logged yet. Be the first to register!</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Register CTA Button */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
                  <div className="text-xs font-mono text-slate-400">
                    Format: <span className="text-white font-bold">{tourn.format}</span>
                  </div>

                  <button
                    onClick={() => handleOpenRegister(tourn)}
                    disabled={isFull}
                    className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center gap-1.5 shadow-md cursor-pointer ${
                      isFull
                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                        : 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                    }`}
                  >
                    <Trophy className="w-3.5 h-3.5 text-yellow-300" />
                    <span>{isFull ? 'Tournament Full' : 'Register Now'}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Registration Modal Dialog */}
      {registeringTournament && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div 
            className="relative w-full max-w-xl bg-slate-900 border border-purple-500/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 bg-gradient-to-r from-purple-950 via-slate-900 to-slate-950 border-b border-purple-500/30 flex justify-between items-start">
              <div>
                <span className="text-[10px] font-mono uppercase text-purple-300 bg-purple-900/60 px-2 py-0.5 rounded border border-purple-500/30">
                  {registeringTournament.game} • {registeringTournament.format}
                </span>
                <h3 className="text-xl font-bold text-white font-['Orbitron'] mt-1">
                  Register for {registeringTournament.title}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Venue: {registeringTournament.locationType} • Prize Pool: {registeringTournament.prizePool}
                </p>
              </div>

              <button
                onClick={() => setRegisteringTournament(null)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmitRegistration} className="p-6 space-y-4 overflow-y-auto">
              {formError && (
                <div className="p-3 rounded-lg bg-red-950/80 border border-red-500/50 text-red-300 text-xs font-mono flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                    Captain / Player Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jordan Ross"
                    value={captainName}
                    onChange={(e) => setCaptainName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 focus:border-purple-400 rounded-lg text-xs text-white font-mono focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                    Gamer Tag / Riot ID / Steam ID *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ViperX#NA1"
                    value={gamerTag}
                    onChange={(e) => setGamerTag(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 focus:border-purple-400 rounded-lg text-xs text-white font-mono focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                    Discord Username & Tag *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. viperx#0442"
                    value={discordTag}
                    onChange={(e) => setDiscordTag(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 focus:border-purple-400 rounded-lg text-xs text-white font-mono focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                    Contact Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. jordan.ross@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 focus:border-purple-400 rounded-lg text-xs text-white font-mono focus:outline-none"
                  />
                </div>
              </div>

              {/* Team specific fields if not solo */}
              {registeringTournament.format !== '1v1 Solo' && (
                <div className="space-y-3 pt-2 border-t border-slate-800">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                      Clan / Team Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Phantom Syndicate"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 focus:border-purple-400 rounded-lg text-xs text-white font-mono focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                      Teammate In-Game Tags (comma separated)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ghost#992, SovaGod#NA1, AstraDream#123"
                      value={teammatesInput}
                      onChange={(e) => setTeammatesInput(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 focus:border-purple-400 rounded-lg text-xs text-white font-mono focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Platform & Station */}
              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                  Gaming Platform & Input Peripheral
                </label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 focus:border-purple-400 rounded-lg text-xs text-white font-mono focus:outline-none"
                >
                  <option value="PC (360Hz Esports Rig)">PC (360Hz Esports Rig - Provided by NEXUS)</option>
                  <option value="PlayStation 5 Pro">PlayStation 5 Pro</option>
                  <option value="Xbox Series X">Xbox Series X</option>
                  <option value="Fightstick / Leverless Arcade Controller">Fightstick / Leverless Arcade Controller</option>
                </select>
              </div>

              {/* Fair play check */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 text-xs text-slate-300 font-mono cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreeRules}
                    onChange={(e) => setAgreeRules(e.target.checked)}
                    className="mt-0.5 rounded border-slate-700 text-purple-600 focus:ring-purple-500"
                  />
                  <span>
                    I confirm my team will abide by the anti-cheat protocol, be present 30 mins prior to match call, and accept tournament referee rulings.
                  </span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-slate-800 flex gap-3">
                <button
                  type="button"
                  onClick={() => setRegisteringTournament(null)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white text-xs font-mono font-bold shadow-lg shadow-purple-500/30 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Trophy className="w-4 h-4 text-yellow-300" />
                  <span>Confirm Registration & Get Pass</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Digital Arena Pass Modal */}
      {viewingPass && (
        <TicketPassModal
          registration={viewingPass}
          onClose={() => setViewingPass(null)}
          onCheckInToggle={handleCheckInToggle}
        />
      )}
    </div>
  );
};
