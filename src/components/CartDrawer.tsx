import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag, Check, Truck, Sparkles, CreditCard } from 'lucide-react';
import { CartItem, PreOrderRecord } from '../types';
import { fireConfetti, playCyberBeep } from '../utils/helpers';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onAddNewPreOrder: (preOrder: PreOrderRecord) => void;
  onNavigateToPreOrders: (orderId?: string) => void;
  soundEnabled: boolean;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onAddNewPreOrder,
  onNavigateToPreOrders,
  soundEnabled
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  // Checkout modal state
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [customerName, setCustomerName] = useState('Alex Mercer');
  const [email, setEmail] = useState('alex.mercer@gmail.com');
  const [shippingAddress, setShippingAddress] = useState('742 Evergreen Terrace, Suite 4B, Springfield, OR');
  const [deliveryType, setDeliveryType] = useState<'courier' | 'midnight_pickup'>('courier');
  const [orderSuccessId, setOrderSuccessId] = useState<string | null>(null);

  if (!isOpen) return null;

  const rawSubtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = (rawSubtotal * discountPercent) / 100;
  const subtotal = rawSubtotal - discountAmount;
  const shippingFee = subtotal > 75 || subtotal === 0 ? 0 : 9.99;
  const grandTotal = subtotal + shippingFee;

  const freeShippingThreshold = 75;
  const shippingProgress = Math.min(100, Math.round((rawSubtotal / freeShippingThreshold) * 100));

  const hasPreOrderItems = cartItems.some(i => i.product.isPreOrder);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'NEXUS20') {
      setDiscountPercent(20);
      setCouponApplied(true);
      setCouponError('');
      if (soundEnabled) playCyberBeep(850, 0.1);
    } else {
      setCouponError('Invalid code. Try "NEXUS20" for 20% off!');
    }
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrderId = `NX-PRE-${Math.floor(1000 + Math.random() * 9000)}`;

    // Create pre-order records for any pre-order items in cart
    const preOrderItems = cartItems.filter(i => i.product.isPreOrder);
    
    if (preOrderItems.length > 0) {
      preOrderItems.forEach(item => {
        const newRecord: PreOrderRecord = {
          orderId: newOrderId,
          customerName: customerName.trim(),
          email: email.trim(),
          orderDate: new Date().toISOString().split('T')[0],
          estimatedDeliveryDate: item.product.releaseDate || '2026-11-20',
          releaseDate: item.product.releaseDate || '2026-11-20',
          gameTitle: item.product.title,
          edition: 'Guaranteed Day-1 Special Edition',
          platform: item.product.platform,
          image: item.product.image,
          price: item.product.price,
          status: 'confirmed',
          batchTier: 'Tier 1 (Guaranteed Day-1 Launch Dispatch)',
          shippingAddress: deliveryType === 'midnight_pickup' 
            ? 'NEXUS Flagship Dallas Hub (Midnight Launch Desk)' 
            : shippingAddress.trim(),
          pickupStore: deliveryType === 'midnight_pickup' ? 'NEXUS Dallas Esports MegaStore' : undefined,
          isPickupMidnightLaunch: deliveryType === 'midnight_pickup',
          bonusCode: `KEY-${item.product.id.substring(5, 9).toUpperCase()}-${Math.floor(10000 + Math.random() * 90000)}`,
          bonusClaimed: false
        };
        onAddNewPreOrder(newRecord);
      });
    }

    fireConfetti();
    if (soundEnabled) playCyberBeep(900, 0.2);
    setOrderSuccessId(newOrderId);
    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-cyan-500/30 flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-bold text-white font-['Orbitron']">
                YOUR GEAR CART
              </h2>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                {cartItems.reduce((acc, i) => acc + i.quantity, 0)}
              </span>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Free Shipping Progress bar */}
          <div className="px-6 py-2.5 bg-slate-950/60 border-b border-slate-800 text-xs font-mono">
            <div className="flex justify-between text-slate-300 mb-1">
              <span>{shippingProgress >= 100 ? '🎉 Free Day-1 Shipping Unlocked!' : `Add $${Math.max(0, freeShippingThreshold - rawSubtotal).toFixed(2)} for Free Shipping`}</span>
              <span className="text-cyan-400 font-bold">{shippingProgress}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full transition-all duration-300"
                style={{ width: `${shippingProgress}%` }}
              ></div>
            </div>
          </div>

          {/* Success Screen after Order Placement */}
          {orderSuccessId ? (
            <div className="p-8 flex-1 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.5)]">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <h3 className="text-xl font-bold text-white font-['Orbitron']">
                ORDER SECURED!
              </h3>

              <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/30 w-full space-y-1">
                <span className="text-xs text-slate-400 font-mono">Your Tracking / Pre-Order ID:</span>
                <span className="block text-lg font-black text-cyan-300 font-mono tracking-wider">
                  {orderSuccessId}
                </span>
              </div>

              <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                Confirmation sent to {email}. You can monitor batch allocation, pre-load countdown, and courier dispatch in the tracker.
              </p>

              <button
                onClick={() => {
                  onClose();
                  onNavigateToPreOrders(orderSuccessId);
                }}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs font-mono tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Track Pre-Order Status Now</span>
              </button>
            </div>
          ) : isCheckingOut ? (
            /* Checkout Simulation Form */
            <div className="p-6 flex-1 overflow-y-auto space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-sm font-bold text-white font-['Orbitron'] flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-cyan-400" />
                  Express Checkout
                </h3>
                <button
                  onClick={() => setIsCheckingOut(false)}
                  className="text-xs text-cyan-400 hover:underline font-mono"
                >
                  ← Edit Cart
                </button>
              </div>

              <form onSubmit={handleCompleteOrder} className="space-y-3.5 text-xs font-mono">
                <div>
                  <label className="block text-slate-400 uppercase mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 uppercase mb-1">Email (For Pre-load Keys)</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 uppercase mb-1">Fulfillment Mode</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setDeliveryType('courier')}
                      className={`p-2 rounded-lg border text-left flex flex-col justify-between ${
                        deliveryType === 'courier'
                          ? 'border-cyan-400 bg-cyan-950/40 text-white'
                          : 'border-slate-800 bg-slate-950 text-slate-400'
                      }`}
                    >
                      <span className="font-bold">Express Courier</span>
                      <span className="text-[10px] text-slate-400">Day-1 Home Drop</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeliveryType('midnight_pickup')}
                      className={`p-2 rounded-lg border text-left flex flex-col justify-between ${
                        deliveryType === 'midnight_pickup'
                          ? 'border-cyan-400 bg-cyan-950/40 text-white'
                          : 'border-slate-800 bg-slate-950 text-slate-400'
                      }`}
                    >
                      <span className="font-bold">Midnight Launch</span>
                      <span className="text-[10px] text-slate-400">Dallas Arena Desk</span>
                    </button>
                  </div>
                </div>

                {deliveryType === 'courier' && (
                  <div>
                    <label className="block text-slate-400 uppercase mb-1">Delivery Address</label>
                    <textarea
                      required
                      rows={2}
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                      className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                )}

                <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1">
                  <div className="flex justify-between text-slate-400">
                    <span>Payment Method:</span>
                    <span className="text-white">Simulated Visa 4242 • Instant Lock</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Order Total:</span>
                    <span className="text-cyan-400 font-bold text-sm">${grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs font-mono tracking-wider shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Confirm Order (${grandTotal.toFixed(2)})</span>
                </button>
              </form>
            </div>
          ) : (
            /* Items List */
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-3">
                  <ShoppingBag className="w-12 h-12 text-slate-700" />
                  <p className="text-slate-400 font-mono text-sm">Your cart is empty.</p>
                  <button
                    onClick={onClose}
                    className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 font-mono text-xs"
                  >
                    Explore Catalog
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div
                      key={item.product.id}
                      className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl flex gap-3 items-center"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        className="w-16 h-16 rounded-lg object-cover border border-slate-700 shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                            {item.product.platform}
                          </span>
                          {item.product.isPreOrder && (
                            <span className="text-[9px] font-mono font-bold text-amber-300 uppercase">
                              Pre-Order
                            </span>
                          )}
                        </div>

                        <h4 className="text-xs font-bold text-white truncate font-['Orbitron'] mt-0.5">
                          {item.product.title}
                        </h4>

                        <div className="text-xs font-mono text-cyan-400 font-bold mt-1">
                          ${item.product.price.toFixed(2)}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex flex-col items-end gap-2">
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-slate-500 hover:text-red-400 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                        <div className="flex items-center bg-slate-900 border border-slate-800 rounded px-1.5 py-0.5 text-xs font-mono">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                            className="px-1 text-slate-400 hover:text-white"
                          >
                            -
                          </button>
                          <span className="px-1.5 text-white font-bold">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                            className="px-1 text-slate-400 hover:text-white"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Cart Footer Summary */}
          {!orderSuccessId && !isCheckingOut && cartItems.length > 0 && (
            <div className="p-6 bg-slate-950 border-t border-slate-800 space-y-4">
              {/* Promo Code Input */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Promo Code (NEXUS20)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 bg-slate-900 border border-slate-800 focus:border-cyan-400 rounded-lg text-xs font-mono text-white placeholder-slate-500 focus:outline-none uppercase"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-mono text-cyan-300 rounded-lg border border-slate-700"
                >
                  Apply
                </button>
              </form>

              {couponApplied && (
                <div className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> 20% Discount Applied!
                </div>
              )}

              {couponError && (
                <div className="text-[11px] font-mono text-red-400">
                  {couponError}
                </div>
              )}

              {/* Subtotal calculations */}
              <div className="space-y-1.5 text-xs font-mono text-slate-400">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="text-white">${rawSubtotal.toFixed(2)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount (20%):</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span className="text-white">{shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}</span>
                </div>

                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-slate-800">
                  <span>Grand Total:</span>
                  <span className="text-cyan-400 font-mono text-base">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Trigger */}
              <button
                onClick={() => setIsCheckingOut(true)}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs font-mono tracking-wider shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <span>{hasPreOrderItems ? 'Lock In Pre-Orders & Checkout' : 'Proceed to Checkout'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-[11px] text-center text-slate-500 font-mono">
                🔒 256-Bit SSL Encrypted • Zero Cancellation Fees
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
