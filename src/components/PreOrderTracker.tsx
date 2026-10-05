import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Copy, 
  Check, 
  Clock, 
  Truck, 
  Package, 
  Gift, 
  MapPin, 
  Calendar, 
  AlertCircle, 
  Sparkles, 
  Store, 
  Flame,
  Key,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { PreOrderRecord, PreOrderStatus, Product } from '../types';
import { calculateTimeRemaining, playCyberBeep } from '../utils/helpers';

interface PreOrderTrackerProps {
  preOrders: PreOrderRecord[];
  onUpdatePreOrder: (updated: PreOrderRecord) => void;
  onExploreProducts: () => void;
  onPreOrderProduct: (product: Product) => void;
  upcomingProducts: Product[];
  soundEnabled: boolean;
}

export const PreOrderTracker: React.FC<PreOrderTrackerProps> = ({
  preOrders,
  onUpdatePreOrder,
  onExploreProducts,
  onPreOrderProduct,
  upcomingProducts,
  soundEnabled
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState<string>(preOrders[0]?.orderId || '');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [showAddressEditor, setShowAddressEditor] = useState(false);
  const [newAddress, setNewAddress] = useState('');
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  // Filtered pre-orders based on search
  const filteredOrders = preOrders.filter(order => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      order.orderId.toLowerCase().includes(q) ||
      order.customerName.toLowerCase().includes(q) ||
      order.email.toLowerCase().includes(q) ||
      order.gameTitle.toLowerCase().includes(q)
    );
  });

  const activeOrder = preOrders.find(o => o.orderId === selectedOrderId) || filteredOrders[0] || preOrders[0];

  const handleCopyBonus = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedKey(code);
    if (soundEnabled) playCyberBeep(900, 0.08);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleTogglePickup = (order: PreOrderRecord) => {
    const updated: PreOrderRecord = {
      ...order,
      isPickupMidnightLaunch: !order.isPickupMidnightLaunch,
      shippingAddress: !order.isPickupMidnightLaunch 
        ? 'NEXUS Dallas Esports MegaStore, 400 Tech Blvd' 
        : '742 Evergreen Terrace, Suite 4B, Springfield, OR',
      pickupStore: !order.isPickupMidnightLaunch ? 'NEXUS Flagship Dallas Hub' : undefined
    };
    onUpdatePreOrder(updated);
    setActionMessage(
      !order.isPickupMidnightLaunch 
        ? 'Switched to In-Store Midnight Launch VIP Pickup!' 
        : 'Switched to Express Courier Home Delivery!'
    );
    setTimeout(() => setActionMessage(null), 3000);
  };

  const handleSaveAddress = () => {
    if (!activeOrder || !newAddress.trim()) return;
    const updated = { ...activeOrder, shippingAddress: newAddress.trim() };
    onUpdatePreOrder(updated);
    setShowAddressEditor(false);
    setActionMessage('Shipping address updated successfully!');
    setTimeout(() => setActionMessage(null), 3000);
  };

  // Status mapping
  const stages: { status: PreOrderStatus; label: string; desc: string }[] = [
    { status: 'confirmed', label: 'Order Confirmed', desc: 'Payment verified & order recorded' },
    { status: 'allocated', label: 'Stock Allocated', desc: 'Batch Tier 1 guaranteed Day-1' },
    { status: 'bonus_unlocked', label: 'Bonus Keys Ready', desc: 'Closed beta & DLC codes ready' },
    { status: 'preparing_shipment', label: 'Warehouse Pre-pack', desc: 'Collector box security sealed' },
    { status: 'dispatched', label: 'Carrier Dispatched', desc: 'In transit via FedEx Express' },
    { status: 'delivered', label: 'Delivered / Picked Up', desc: 'Ready for midnight launch' },
  ];

  const getStatusIndex = (status: PreOrderStatus) => {
    const idx = stages.findIndex(s => s.status === status);
    return idx === -1 ? 0 : idx;
  };

  const currentStageIdx = activeOrder ? getStatusIndex(activeOrder.status) : 0;
  const timeRemaining = activeOrder ? calculateTimeRemaining(activeOrder.releaseDate) : null;

  return (
    <div className="py-8 md:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyan-500/20 pb-6">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs mb-1 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>NEXUS DISPATCH & BATCH ALLOCATION SYSTEM</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white font-['Orbitron'] tracking-tight">
            PRE-ORDER COMMAND CENTER
          </h1>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">
            Track your upcoming game editions, guaranteed Day-1 launch dispatch, batch queue priority, and claim your early-access beta codes.
          </p>
        </div>

        {/* Quick action notification */}
        {actionMessage && (
          <div className="px-4 py-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-mono flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{actionMessage}</span>
          </div>
        )}
      </div>

      {/* Search & Quick Lookup Bar */}
      <div className="bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-5 shadow-xl space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-cyan-400" />
            <input
              type="text"
              placeholder="Search by Order Code (e.g. NX-PRE-8842) or Customer Email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-xl text-sm text-white placeholder-slate-500 font-mono focus:outline-none focus:ring-1 focus:ring-cyan-500/40"
            />
          </div>

          {/* Quick Demo Test Buttons */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs text-slate-500 font-mono hidden sm:inline">Try Demo IDs:</span>
            {preOrders.slice(0, 3).map((order) => (
              <button
                key={order.orderId}
                onClick={() => {
                  setSelectedOrderId(order.orderId);
                  setSearchQuery('');
                }}
                className={`px-3 py-2 rounded-lg text-xs font-mono font-medium transition-all ${
                  selectedOrderId === order.orderId
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_10px_rgba(6,182,212,0.5)]'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                }`}
              >
                {order.orderId}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Order Details & Pipeline Showcase */}
      {activeOrder ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Order Pipeline & Key Status */}
          <div className="lg:col-span-8 space-y-6">
            {/* Active Order Card */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b border-slate-800">
                <div className="flex gap-4 items-center">
                  <img
                    src={activeOrder.image}
                    alt={activeOrder.gameTitle}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover border border-cyan-500/30 shadow-md"
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                        {activeOrder.orderId}
                      </span>
                      <span className="text-xs font-mono text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-500/30">
                        {activeOrder.platform}
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-white font-['Orbitron']">
                      {activeOrder.gameTitle}
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">{activeOrder.edition}</p>

                    <div className="mt-2 text-xs text-slate-400 font-mono">
                      Recipient: <span className="text-white font-medium">{activeOrder.customerName}</span> • Ordered: {activeOrder.orderDate}
                    </div>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <div className="text-2xl font-black text-cyan-400 font-mono">
                    ${activeOrder.price.toFixed(2)}
                  </div>
                  <div className="text-xs text-emerald-400 font-mono mt-1 flex items-center sm:justify-end gap-1">
                    <Check className="w-3.5 h-3.5" /> Price Match Protected
                  </div>
                </div>
              </div>

              {/* Countdown Ticker to Global Launch */}
              {timeRemaining && (
                <div className="mt-6 p-4 rounded-xl bg-slate-950/80 border border-cyan-500/30">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-3 font-mono">
                    <span className="flex items-center gap-1.5 text-cyan-300 font-bold">
                      <Clock className="w-4 h-4 text-cyan-400" />
                      GLOBAL LAUNCH COUNTDOWN
                    </span>
                    <span className="text-slate-400">Release Date: {activeOrder.releaseDate}</span>
                  </div>

                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                      <span className="block text-2xl font-black text-white font-mono">{timeRemaining.days}</span>
                      <span className="text-[10px] uppercase text-slate-400 font-mono">Days</span>
                    </div>
                    <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                      <span className="block text-2xl font-black text-white font-mono">{timeRemaining.hours}</span>
                      <span className="text-[10px] uppercase text-slate-400 font-mono">Hours</span>
                    </div>
                    <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                      <span className="block text-2xl font-black text-white font-mono">{timeRemaining.minutes}</span>
                      <span className="text-[10px] uppercase text-slate-400 font-mono">Mins</span>
                    </div>
                    <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                      <span className="block text-2xl font-black text-cyan-400 font-mono">{timeRemaining.seconds}</span>
                      <span className="text-[10px] uppercase text-cyan-400/80 font-mono">Secs</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Interactive Multi-Stage Progress Tracker */}
              <div className="mt-8 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                    Live Dispatch & Fulfillment Pipeline
                  </h3>
                  <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                    {activeOrder.batchTier}
                  </span>
                </div>

                <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
                  {stages.map((stage, sIdx) => {
                    const isCompleted = sIdx <= currentStageIdx;
                    const isCurrent = sIdx === currentStageIdx;

                    return (
                      <div key={stage.status} className="relative flex items-start gap-4">
                        {/* Status Icon Indicator */}
                        <div
                          className={`absolute -left-6 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                            isCompleted
                              ? 'bg-cyan-500 text-slate-950 shadow-[0_0_12px_rgba(6,182,212,0.8)]'
                              : 'bg-slate-900 border border-slate-700 text-slate-500'
                          } ${isCurrent ? 'ring-4 ring-cyan-500/20 animate-pulse' : ''}`}
                        >
                          {isCompleted ? <Check className="w-3 h-3 stroke-[3]" /> : sIdx + 1}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className={`text-sm font-bold font-mono ${isCompleted ? 'text-white' : 'text-slate-500'}`}>
                              {stage.label}
                            </span>
                            {isCurrent && (
                              <span className="text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-1.5 py-0.2 rounded uppercase">
                                Active State
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-400 mt-0.5">{stage.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Pre-Order Bonus Codes & Beta Key Unlock Box */}
            <div className="bg-gradient-to-br from-slate-900 to-cyan-950/30 border border-cyan-500/40 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Gift className="w-5 h-5 text-yellow-400" />
                  <h3 className="text-base font-bold text-white font-['Orbitron']">
                    Pre-Order Digital Bonus Keys
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40">
                  Ready to Redeem
                </span>
              </div>

              <p className="text-xs text-slate-300">
                Your pre-order entitles you to instant closed-beta testing access and Day-1 DLC unlock voucher codes.
              </p>

              {activeOrder.bonusCode ? (
                <div className="flex items-center justify-between bg-slate-950 border border-cyan-500/30 rounded-xl p-3">
                  <div className="flex items-center gap-2">
                    <Key className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm font-mono font-bold text-cyan-300 tracking-wider">
                      {activeOrder.bonusCode}
                    </span>
                  </div>

                  <button
                    onClick={() => handleCopyBonus(activeOrder.bonusCode!)}
                    className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-200 text-xs font-mono font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    {copiedKey === activeOrder.bonusCode ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Key</span>
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="text-xs text-slate-400 bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                  Beta code will unlock automatically 48 hours before official server open.
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Delivery Mode, Address & In-Store Pickup */}
          <div className="lg:col-span-4 space-y-6">
            {/* Delivery Switcher Card */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
              <h3 className="text-sm font-bold text-white font-['Orbitron'] flex items-center gap-2">
                <Truck className="w-4 h-4 text-cyan-400" />
                Delivery & Fulfillment Mode
              </h3>

              {/* Mode Toggle Button */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">Current Method:</span>
                  <span className="text-xs font-mono font-bold text-cyan-300">
                    {activeOrder.isPickupMidnightLaunch ? 'Midnight Store Pickup' : 'Express Courier'}
                  </span>
                </div>

                <button
                  onClick={() => handleTogglePickup(activeOrder)}
                  className="w-full py-2.5 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-cyan-500/40 text-xs text-cyan-300 font-mono font-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  {activeOrder.isPickupMidnightLaunch ? (
                    <>
                      <Truck className="w-3.5 h-3.5" /> Switch to Courier Home Delivery
                    </>
                  ) : (
                    <>
                      <Store className="w-3.5 h-3.5 text-yellow-400" /> Switch to Midnight Launch Pickup
                    </>
                  )}
                </button>
              </div>

              {/* Address / Store details */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>Destination:</span>
                  {!showAddressEditor && (
                    <button
                      onClick={() => {
                        setNewAddress(activeOrder.shippingAddress);
                        setShowAddressEditor(true);
                      }}
                      className="text-cyan-400 hover:underline"
                    >
                      Edit
                    </button>
                  )}
                </div>

                {showAddressEditor ? (
                  <div className="space-y-2">
                    <textarea
                      value={newAddress}
                      onChange={(e) => setNewAddress(e.target.value)}
                      rows={2}
                      className="w-full p-2 bg-slate-950 border border-cyan-500 rounded-lg text-xs text-white font-mono focus:outline-none"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveAddress}
                        className="flex-1 py-1.5 rounded bg-cyan-500 text-slate-950 text-xs font-mono font-bold"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setShowAddressEditor(false)}
                        className="py-1.5 px-3 rounded bg-slate-800 text-slate-400 text-xs font-mono"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{activeOrder.shippingAddress}</span>
                  </div>
                )}
              </div>

              {/* Courier info */}
              {activeOrder.trackingNumber && (
                <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1 text-xs">
                  <div className="text-slate-400 font-mono text-[11px]">Carrier Assigned:</div>
                  <div className="text-white font-mono font-medium flex items-center justify-between">
                    <span>{activeOrder.carrier}</span>
                    <span className="text-cyan-400 font-mono text-[11px]">{activeOrder.trackingNumber}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Launch Guarantee Box */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold">
                <Sparkles className="w-4 h-4" />
                <span>NEXUS DAY-1 PROMISE</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                If your physical edition fails to arrive by official midnight launch, NEXUS provides an instant digital backup key for 100% free so you never wait to play.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-12 text-center bg-slate-900/50 rounded-2xl border border-slate-800">
          <AlertCircle className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
          <p className="text-white font-mono">No pre-orders found matching "{searchQuery}"</p>
          <button
            onClick={() => setSearchQuery('')}
            className="mt-3 px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 text-xs font-mono font-bold"
          >
            Clear Search
          </button>
        </div>
      )}

      {/* Recommended Upcoming Pre-Orders to add */}
      <div className="pt-8 border-t border-slate-800 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-mono text-cyan-400 flex items-center gap-1.5 uppercase">
              <Flame className="w-3.5 h-3.5" /> Upcoming Release Lineup
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-['Orbitron']">
              Pre-Order Next Major Releases
            </h3>
          </div>
          <button
            onClick={onExploreProducts}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-mono font-semibold flex items-center gap-1"
          >
            Full Storefront <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {upcomingProducts.slice(0, 3).map((prod) => (
            <div
              key={prod.id}
              className="bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 rounded-xl p-4 transition-all flex flex-col justify-between"
            >
              <div className="flex gap-3">
                <img
                  src={prod.image}
                  alt={prod.title}
                  className="w-16 h-16 rounded-lg object-cover border border-slate-700"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300">
                    {prod.platform}
                  </span>
                  <h4 className="text-sm font-bold text-white truncate font-['Orbitron'] mt-1">
                    {prod.title}
                  </h4>
                  <p className="text-xs text-cyan-400 font-mono mt-0.5">
                    Launch: {prod.releaseDate ? new Date(prod.releaseDate).toLocaleDateString() : 'TBA'}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-base font-black text-white font-mono">${prod.price.toFixed(2)}</span>
                <button
                  onClick={() => onPreOrderProduct(prod)}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  Pre-Order Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
