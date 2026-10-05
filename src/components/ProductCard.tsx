import React from 'react';
import { Star, ShoppingBag, Eye, Zap, ShieldAlert, Check } from 'lucide-react';
import { Product } from '../types';
import { playCyberBeep } from '../utils/helpers';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  soundEnabled: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onViewDetails,
  soundEnabled
}) => {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (soundEnabled) playCyberBeep(750, 0.08);
    onAddToCart(product);
  };

  const handleCardClick = () => {
    if (soundEnabled) playCyberBeep(520, 0.05);
    onViewDetails(product);
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'PC':
        return 'bg-purple-950/70 text-purple-300 border-purple-500/30';
      case 'PS5':
        return 'bg-blue-950/70 text-blue-300 border-blue-500/30';
      case 'Xbox Series X':
        return 'bg-emerald-950/70 text-emerald-300 border-emerald-500/30';
      case 'Nintendo Switch':
        return 'bg-red-950/70 text-red-300 border-red-500/30';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-[0_0_25px_rgba(6,182,212,0.2)] cursor-pointer"
    >
      {/* Top badges */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-70"></div>

        {/* Top Badges: Category & Pre-order/Flag */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
          <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border backdrop-blur-md ${getPlatformColor(product.platform)}`}>
            {product.platform}
          </span>

          {product.isPreOrder ? (
            <span className="text-[10px] font-bold font-mono uppercase px-2.5 py-0.5 rounded-full bg-cyan-500 text-slate-950 border border-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.6)] flex items-center gap-1">
              <Zap className="w-3 h-3 fill-slate-950" /> Pre-Order
            </span>
          ) : product.badge ? (
            <span className="text-[10px] font-bold font-mono uppercase px-2 py-0.5 rounded bg-purple-500/30 text-purple-200 border border-purple-400/40 backdrop-blur-md">
              {product.badge}
            </span>
          ) : null}
        </div>

        {/* Hover Quick View Trigger */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/40 backdrop-blur-[2px]">
          <span className="px-3.5 py-1.5 rounded-lg bg-slate-900/90 border border-cyan-500/60 text-xs font-mono text-cyan-300 flex items-center gap-1.5 shadow-lg">
            <Eye className="w-3.5 h-3.5" /> View Specs & Bonuses
          </span>
        </div>
      </div>

      {/* Content body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <span className="text-slate-400 uppercase tracking-wider text-[11px] font-mono">{product.category}</span>
            <div className="flex items-center gap-1 text-yellow-400">
              <Star className="w-3.5 h-3.5 fill-yellow-400" />
              <span className="font-bold font-mono text-white text-xs">{product.rating.toFixed(1)}</span>
              <span className="text-slate-500 text-[10px]">({product.reviewCount})</span>
            </div>
          </div>

          <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1 font-['Orbitron']">
            {product.title}
          </h3>

          <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Pre-order Bonus or Spec Pill Preview */}
          {product.isPreOrder && product.releaseDate && (
            <div className="mt-3 py-1.5 px-2.5 rounded bg-cyan-950/40 border border-cyan-500/20 text-[11px] text-cyan-300 flex items-center justify-between font-mono">
              <span>🚀 Launch: {new Date(product.releaseDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              <span className="text-[10px] text-cyan-400 font-bold">Day-1 Batch</span>
            </div>
          )}

          {!product.isPreOrder && product.features && product.features.length > 0 && (
            <div className="mt-2.5 flex items-center gap-1 text-[11px] text-slate-400 truncate">
              <Check className="w-3 h-3 text-cyan-400 shrink-0" />
              <span className="truncate">{product.features[0]}</span>
            </div>
          )}
        </div>

        {/* Price & CTA Action */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black text-white font-mono">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-slate-500 line-through font-mono">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              {product.isPreOrder ? 'Guaranteed Price Lock' : 'Ready to Dispatch'}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm cursor-pointer ${
              product.isPreOrder
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                : 'bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-white border border-slate-700 hover:border-cyan-400'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{product.isPreOrder ? 'Pre-Order' : 'Add'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
