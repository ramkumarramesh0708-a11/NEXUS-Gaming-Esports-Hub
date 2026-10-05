import React, { useState, useEffect } from 'react';
import { Sparkles, Trophy, ShieldCheck, Flame, ArrowRight, Clock, Zap } from 'lucide-react';
import { calculateTimeRemaining } from '../utils/helpers';

interface HeroBannerProps {
  onShopClick: () => void;
  onPreOrdersClick: () => void;
  onTournamentsClick: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onShopClick,
  onPreOrdersClick,
  onTournamentsClick
}) => {
  // Live launch countdown for GTA VI (2026-11-14)
  const [timeLeft, setTimeLeft] = useState(calculateTimeRemaining('2026-11-14T00:00:00'));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeRemaining('2026-11-14T00:00:00'));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-b border-cyan-500/10 py-12 md:py-16">
      {/* Background cyber grid & glow effects */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:24px_24px]"></div>
      <div className="absolute -top-24 left-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 right-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Headlines & Action CTA */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/40 text-xs font-mono text-cyan-300">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
              <span>FALL 2026 MEGA LAUNCHES & ESPORTS CIRCUIT</span>
            </div>

            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black text-white tracking-tight leading-none font-['Orbitron']">
              NEXT-GEN GEAR. <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400">
                DAY-1 PRE-ORDERS.
              </span> <br />
              ARENA GLORY.
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-xl font-normal leading-relaxed">
              Equip pro-grade gaming rigs, track guaranteed Day-1 release pre-orders with real-time dispatch timelines, and claim your seat in high-stakes LAN & online tournaments.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onShopClick}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm tracking-wide shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.7)] transition-all flex items-center gap-2 group cursor-pointer"
              >
                <span>Browse Store Catalog</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onPreOrdersClick}
                className="px-5 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white font-semibold text-sm border border-cyan-500/40 hover:border-cyan-400 shadow-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Track Pre-Orders</span>
              </button>

              <button
                onClick={onTournamentsClick}
                className="px-5 py-3.5 rounded-xl bg-purple-950/40 hover:bg-purple-900/50 text-purple-200 font-semibold text-sm border border-purple-500/40 hover:border-purple-400 shadow-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <Trophy className="w-4 h-4 text-yellow-400" />
                <span>Register Tournaments</span>
              </button>
            </div>

            {/* Fast Stats Row */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800/80">
              <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                <div className="text-xl sm:text-2xl font-black text-cyan-400 font-mono">$55,000+</div>
                <div className="text-xs text-slate-400">Prize Pools Open</div>
              </div>
              <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                <div className="text-xl sm:text-2xl font-black text-purple-400 font-mono">100% Day-1</div>
                <div className="text-xs text-slate-400">Launch Guarantee</div>
              </div>
              <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">0.1ms</div>
                <div className="text-xs text-slate-400">Ultra Esports Gear</div>
              </div>
            </div>
          </div>

          {/* Right Column: Pre-order Countdown Card Spotlight */}
          <div className="lg:col-span-5">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur-lg opacity-40 group-hover:opacity-75 transition duration-500"></div>

              <div className="relative bg-slate-900/95 border border-cyan-500/30 rounded-2xl p-6 shadow-2xl backdrop-blur-xl">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-400 flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5" /> #1 Anticipated Drop
                    </span>
                  </div>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                    PS5 & PC Day-1
                  </span>
                </div>

                <div className="mt-4 flex gap-4 items-center">
                  <img
                    src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=400&q=80"
                    alt="GTA VI Collector Edition"
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover border border-cyan-500/40 shadow-md"
                  />
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white font-['Orbitron'] leading-snug">
                      Grand Theft Auto VI
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">Special Edition Steelbook + Bonus Cash</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-lg font-black text-cyan-400 font-mono">$89.99</span>
                      <span className="text-xs text-slate-500 line-through">$99.99</span>
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/30">
                        SAVE $10
                      </span>
                    </div>
                  </div>
                </div>

                {/* Countdown Timer Display */}
                <div className="mt-5 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-mono">
                    <span className="flex items-center gap-1.5 text-cyan-300">
                      <Clock className="w-3.5 h-3.5" /> GLOBAL LAUNCH COUNTDOWN
                    </span>
                    <span>NOV 14, 2026</span>
                  </div>

                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                      <span className="block text-xl font-black text-white font-mono">{timeLeft.days}</span>
                      <span className="text-[10px] uppercase text-slate-400 font-mono">Days</span>
                    </div>
                    <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                      <span className="block text-xl font-black text-white font-mono">{timeLeft.hours}</span>
                      <span className="text-[10px] uppercase text-slate-400 font-mono">Hours</span>
                    </div>
                    <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                      <span className="block text-xl font-black text-white font-mono">{timeLeft.minutes}</span>
                      <span className="text-[10px] uppercase text-slate-400 font-mono">Mins</span>
                    </div>
                    <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                      <span className="block text-xl font-black text-cyan-400 font-mono">{timeLeft.seconds}</span>
                      <span className="text-[10px] uppercase text-cyan-400/80 font-mono">Secs</span>
                    </div>
                  </div>
                </div>

                {/* Pre-order perk teaser */}
                <div className="mt-4 flex items-center justify-between text-xs text-slate-300 bg-cyan-950/30 p-2.5 rounded-lg border border-cyan-500/20">
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-yellow-400" />
                    Guaranteed Day-1 Batch Tier 1 Priority
                  </span>
                  <button
                    onClick={onPreOrdersClick}
                    className="text-cyan-400 hover:text-cyan-300 font-bold underline font-mono text-[11px]"
                  >
                    Track Status →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
