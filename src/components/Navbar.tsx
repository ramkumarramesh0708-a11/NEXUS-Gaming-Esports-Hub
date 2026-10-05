import React from 'react';
import { Gamepad2, ShoppingBag, ShieldCheck, Trophy, Sparkles, Volume2, VolumeX, Search } from 'lucide-react';
import { CartItem } from '../types';

interface NavbarProps {
  activeTab: 'shop' | 'preorders' | 'tournaments';
  setActiveTab: (tab: 'shop' | 'preorders' | 'tournaments') => void;
  cartItems: CartItem[];
  setIsCartOpen: (open: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  preOrdersCount: number;
  tournamentsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cartItems,
  setIsCartOpen,
  soundEnabled,
  setSoundEnabled,
  searchQuery,
  setSearchQuery,
  preOrdersCount,
  tournamentsCount
}) => {
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-cyan-500/20">
      {/* Top micro ticker */}
      <div className="bg-gradient-to-r from-cyan-950/60 via-slate-900 to-purple-950/60 text-xs py-1.5 px-4 text-slate-300 border-b border-white/5 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 text-cyan-400 font-mono font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            ARENA LAN SERVERS: ONLINE
          </span>
          <span className="hidden md:inline text-slate-500">|</span>
          <span className="hidden md:inline text-slate-400">
            Guaranteed Day-1 Midnight Launch Dispatch on all Pre-Orders
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <button
            onClick={() => setSoundEnabled(prev => !prev)}
            className="flex items-center gap-1 text-slate-400 hover:text-cyan-300 transition-colors"
            title={soundEnabled ? "Disable UI Sound Effects" : "Enable UI Sound Effects"}
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline font-mono">SFX ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-slate-500" />
                <span className="hidden sm:inline font-mono">SFX OFF</span>
              </>
            )}
          </button>
          <span className="text-slate-500">|</span>
          <span className="text-purple-400 font-medium hidden sm:inline">Use code NEXUS20 for 20% off</span>
        </div>
      </div>

      {/* Main navigation row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('shop')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 p-[1.5px] shadow-[0_0_20px_rgba(6,182,212,0.4)] group-hover:shadow-[0_0_30px_rgba(6,182,212,0.7)] transition-all">
            <div className="w-full h-full bg-slate-950 rounded-[7px] flex items-center justify-center">
              <Gamepad2 className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-black tracking-wider text-white font-['Orbitron'] bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-cyan-400">
                NEXUS
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono tracking-wider">GAMING & ESPORTS ARENA</p>
          </div>
        </div>

        {/* Center Nav tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('shop')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              activeTab === 'shop'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.35)]'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Gamepad2 className="w-4 h-4" />
            Store Catalog
          </button>

          <button
            onClick={() => setActiveTab('preorders')}
            className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              activeTab === 'preorders'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.35)]'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            Pre-Order Tracker
            {preOrdersCount > 0 && (
              <span className="text-[11px] font-bold bg-cyan-500/30 text-cyan-200 border border-cyan-400/30 px-1.5 py-0.2 rounded-full">
                {preOrdersCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('tournaments')}
            className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              activeTab === 'tournaments'
                ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.35)]'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Trophy className="w-4 h-4 text-yellow-400" />
            Tournament Hub
            <span className="text-[10px] font-bold bg-purple-500/30 text-purple-200 border border-purple-400/30 px-1.5 py-0.2 rounded-full">
              {tournamentsCount} Live
            </span>
          </button>
        </nav>

        {/* Right Section: Search & Cart Button */}
        <div className="flex items-center gap-3">
          {/* Quick Search */}
          <div className="relative hidden lg:block w-48 xl:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search gear & games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-900/90 border border-slate-800 focus:border-cyan-500 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all font-mono"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-300"
              >
                ✕
              </button>
            )}
          </div>

          {/* Quick Track trigger */}
          <button
            onClick={() => setActiveTab('preorders')}
            className="hidden sm:flex items-center gap-1.5 text-xs text-cyan-400 bg-cyan-950/40 hover:bg-cyan-900/40 border border-cyan-500/30 px-3 py-2 rounded-lg transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Track Order</span>
          </button>

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white px-3.5 py-2 rounded-lg border border-slate-700/80 hover:border-cyan-500/50 shadow-sm transition-all group"
          >
            <ShoppingBag className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline text-xs font-semibold">Cart</span>
            {totalCartCount > 0 ? (
              <span className="w-5 h-5 rounded-full bg-cyan-500 text-black text-xs font-bold flex items-center justify-center animate-bounce">
                {totalCartCount}
              </span>
            ) : (
              <span className="w-2 h-2 rounded-full bg-slate-600"></span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav Tabs Bar */}
      <div className="flex md:hidden border-t border-slate-800/80 bg-slate-950 px-2 py-2 gap-1 justify-around">
        <button
          onClick={() => setActiveTab('shop')}
          className={`flex-1 py-1.5 px-2 rounded text-xs font-medium flex items-center justify-center gap-1.5 ${
            activeTab === 'shop' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400'
          }`}
        >
          <Gamepad2 className="w-3.5 h-3.5" />
          Store
        </button>
        <button
          onClick={() => setActiveTab('preorders')}
          className={`flex-1 py-1.5 px-2 rounded text-xs font-medium flex items-center justify-center gap-1.5 ${
            activeTab === 'preorders' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          Pre-Orders ({preOrdersCount})
        </button>
        <button
          onClick={() => setActiveTab('tournaments')}
          className={`flex-1 py-1.5 px-2 rounded text-xs font-medium flex items-center justify-center gap-1.5 ${
            activeTab === 'tournaments' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' : 'text-slate-400'
          }`}
        >
          <Trophy className="w-3.5 h-3.5 text-yellow-400" />
          Tournaments
        </button>
      </div>
    </header>
  );
};
