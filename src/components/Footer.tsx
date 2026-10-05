import React, { useState } from 'react';
import { Gamepad2, ShieldCheck, Truck, Headphones, Trophy, Check, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs font-mono">
      {/* Trust Badges Row */}
      <div className="border-b border-slate-800/80 py-8 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <div className="font-bold text-white text-xs uppercase">Day-1 Midnight Delivery</div>
              <div className="text-[11px] text-slate-400">Guaranteed launch arrival</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-500/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <div className="font-bold text-white text-xs uppercase">Authorized Partner</div>
              <div className="text-[11px] text-slate-400">100% Genuine with Warranty</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-950/80 border border-yellow-500/30 flex items-center justify-center shrink-0">
              <Trophy className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <div className="font-bold text-white text-xs uppercase">Esports Circuit Ready</div>
              <div className="text-[11px] text-slate-400">Official tournament hosts</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <Headphones className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="font-bold text-white text-xs uppercase">24/7 Gamer Support</div>
              <div className="text-[11px] text-slate-400">Discord & live chat desk</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Brand column */}
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 p-[1px]">
              <div className="w-full h-full bg-slate-950 rounded-[7px] flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <span className="text-xl font-black text-white font-['Orbitron']">NEXUS</span>
          </div>

          <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
            NEXUS Gaming & Esports Hub is the premier global ecosystem connecting hardware enthusiasts, competitive gamers, and collectors with next-generation launches and live arena circuits.
          </p>

          <div className="text-[11px] text-slate-500">
            Headquarters: 400 Tech Blvd, Dallas, TX 75201 • NEXUS LAN Arena
          </div>
        </div>

        {/* Arenas & Hubs */}
        <div className="md:col-span-2 space-y-3">
          <h4 className="font-bold text-white uppercase text-xs tracking-wider">Arenas & Hubs</h4>
          <ul className="space-y-2 text-xs">
            <li><span className="text-slate-300">Dallas Esports Hub</span> <span className="text-cyan-400 text-[10px] block">64-Seat Mainstage</span></li>
            <li><span className="text-slate-300">LA Stadium Pods</span> <span className="text-purple-400 text-[10px] block">Fighting Game Pit</span></li>
            <li><span className="text-slate-300">Tokyo Akihabara Hub</span> <span className="text-emerald-400 text-[10px] block">Hardware Lab</span></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-2 space-y-3">
          <h4 className="font-bold text-white uppercase text-xs tracking-wider">Features</h4>
          <ul className="space-y-2 text-xs">
            <li className="text-slate-300 hover:text-cyan-400 cursor-pointer">Pre-Order Tracking Hub</li>
            <li className="text-slate-300 hover:text-cyan-400 cursor-pointer">Tournament Brackets</li>
            <li className="text-slate-300 hover:text-cyan-400 cursor-pointer">Midnight Launch Desk</li>
            <li className="text-slate-300 hover:text-cyan-400 cursor-pointer">Anti-Cheat Verification</li>
          </ul>
        </div>

        {/* Newsletter Signup with Voucher */}
        <div className="md:col-span-4 space-y-3">
          <h4 className="font-bold text-white uppercase text-xs tracking-wider">VIP Launch Alert Newsletter</h4>
          <p className="text-slate-400 text-xs">
            Get instant ping notifications for surprise hardware drops and $10 off your first pre-order.
          </p>

          {subscribed ? (
            <div className="p-3 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Subscribed! Use code <strong className="font-mono text-white">NEXUS20</strong> at checkout.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                placeholder="Enter gamer email..."
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>Join</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Copyright bottom line */}
      <div className="border-t border-slate-900 py-6 text-center text-slate-600 text-[11px]">
        © 2026 NEXUS Gaming & Esports Arena Inc. All rights reserved. Built for competitive players worldwide.
      </div>
    </footer>
  );
};
