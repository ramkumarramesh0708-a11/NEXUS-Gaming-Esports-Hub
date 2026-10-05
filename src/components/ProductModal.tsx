import React, { useEffect, useState } from 'react';
import { X, Star, ShoppingBag, ShieldCheck, Truck, Sparkles, CheckCircle2, Gift, Clock, Flame } from 'lucide-react';
import { Product } from '../types';
import { playCyberBeep } from '../utils/helpers';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  soundEnabled: boolean;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  soundEnabled
}) => {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setQuantity(1);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product, onClose]);

  if (!product) return null;

  const handleAdd = () => {
    if (soundEnabled) playCyberBeep(800, 0.1);
    onAddToCart(product, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-slate-900 border border-cyan-500/40 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-950/80 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Image Preview & Badges */}
            <div className="space-y-3">
              <div className="relative aspect-video md:aspect-square rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                {product.isPreOrder && (
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-cyan-500 text-slate-950 font-bold font-mono text-xs flex items-center gap-1 shadow-lg">
                    <Sparkles className="w-3.5 h-3.5" /> GUARANTEED DAY-1 PRE-ORDER
                  </div>
                )}
              </div>

              {/* Delivery / Guarantee Highlights */}
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <Truck className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>
                    {product.isPreOrder 
                      ? 'Dispatches 24H prior to official midnight unlock' 
                      : 'Same-day express dispatch with tracking'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Official Authorized Distributor Warranty (2 Years)</span>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                    {product.platform}
                  </span>
                  <span className="text-xs text-slate-500 uppercase font-mono tracking-wider">
                    {product.category}
                  </span>
                </div>

                <h2 className="text-xl md:text-2xl font-black text-white font-['Orbitron']">
                  {product.title}
                </h2>

                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star className="w-4 h-4 fill-yellow-400" />
                    <span className="font-bold text-white text-sm font-mono">{product.rating.toFixed(1)}</span>
                  </div>
                  <span className="text-xs text-slate-400">({product.reviewCount} customer reviews)</span>
                </div>
              </div>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 pb-3 border-b border-slate-800">
                <span className="text-3xl font-black text-white font-mono">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-slate-500 line-through font-mono">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                {product.isPreOrder && (
                  <span className="text-xs text-cyan-400 font-mono bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/40">
                    Price Match Guaranteed
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-slate-300 leading-relaxed">
                {product.description}
              </p>

              {/* Key Features */}
              {product.features && product.features.length > 0 && (
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Key Highlights
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {product.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Pre-order Bonus Box */}
              {product.isPreOrder && product.preOrderBonus && (
                <div className="p-3.5 rounded-xl bg-gradient-to-br from-cyan-950/40 to-purple-950/40 border border-cyan-500/30 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-300 font-mono">
                    <Gift className="w-4 h-4 text-yellow-400" />
                    <span>PRE-ORDER EXCLUSIVE LOOT PACK INCLUDED</span>
                  </div>
                  <ul className="space-y-1 text-xs text-slate-300 pl-1">
                    {product.preOrderBonus.map((bonus, bIdx) => (
                      <li key={bIdx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                        <span>{bonus}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technical Specs Table */}
              {product.specs && Object.keys(product.specs).length > 0 && (
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Hardware Specifications
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div key={key} className="bg-slate-950/70 p-2 rounded border border-slate-800">
                        <span className="text-slate-500 block text-[10px]">{key}</span>
                        <span className="text-slate-200 font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions & Quantity */}
              <div className="pt-4 border-t border-slate-800 flex items-center gap-3">
                <div className="flex items-center bg-slate-950 rounded-xl border border-slate-800 p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 flex items-center justify-center font-bold"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-sm font-mono font-bold text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 flex items-center justify-center font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-sm tracking-wide shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>
                    {product.isPreOrder 
                      ? `Pre-Order Now • $${(product.price * quantity).toFixed(2)}` 
                      : `Add to Cart • $${(product.price * quantity).toFixed(2)}`}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
