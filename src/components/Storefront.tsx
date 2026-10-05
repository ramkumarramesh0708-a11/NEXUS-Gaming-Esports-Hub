import React, { useState } from 'react';
import { 
  Filter, 
  Sparkles, 
  Gamepad2, 
  SlidersHorizontal, 
  Zap, 
  Check, 
  Search,
  Layers
} from 'lucide-react';
import { Product, ProductCategory, Platform } from '../types';
import { ProductCard } from './ProductCard';
import { ProductModal } from './ProductModal';
import { playCyberBeep } from '../utils/helpers';

interface StorefrontProps {
  products: Product[];
  onAddToCart: (product: Product, quantity?: number) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  soundEnabled: boolean;
  onNavigateToPreOrders: () => void;
  onNavigateToTournaments: () => void;
}

export const Storefront: React.FC<StorefrontProps> = ({
  products,
  onAddToCart,
  searchQuery,
  setSearchQuery,
  soundEnabled,
  onNavigateToPreOrders,
  onNavigateToTournaments
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('All');
  const [onlyPreOrders, setOnlyPreOrders] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);

  const categories = ['All', 'Games', 'Consoles', 'Hardware', 'Peripherals', 'Collectibles'];
  const platforms = ['All', 'PC', 'PS5', 'Xbox Series X', 'Nintendo Switch', 'Multi-Platform'];

  // Filtering
  const filteredProducts = products.filter(product => {
    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchTitle = product.title.toLowerCase().includes(q);
      const matchCategory = product.category.toLowerCase().includes(q);
      const matchPlatform = product.platform.toLowerCase().includes(q);
      const matchDesc = product.description.toLowerCase().includes(q);
      if (!matchTitle && !matchCategory && !matchPlatform && !matchDesc) return false;
    }

    // Category filter
    if (selectedCategory !== 'All' && product.category !== selectedCategory) {
      return false;
    }

    // Platform filter
    if (selectedPlatform !== 'All' && product.platform !== selectedPlatform && product.platform !== 'Multi-Platform') {
      return false;
    }

    // Pre-orders only filter
    if (onlyPreOrders && !product.isPreOrder) {
      return false;
    }

    return true;
  });

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // featured default
  });

  const preOrderCount = products.filter(p => p.isPreOrder).length;

  return (
    <div className="py-8 md:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Category Pills & Filters Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
        {/* Category selector row */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  if (soundEnabled) playCyberBeep(520, 0.04);
                  setSelectedCategory(cat);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                    : 'bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Quick Pre-order Toggle Pill */}
          <button
            onClick={() => {
              if (soundEnabled) playCyberBeep(600, 0.04);
              setOnlyPreOrders(!onlyPreOrders);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
              onlyPreOrders
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                : 'bg-slate-800/80 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30'
            }`}
          >
            <Zap className={`w-3.5 h-3.5 ${onlyPreOrders ? 'fill-slate-950' : 'text-cyan-400'}`} />
            <span>Only Pre-Orders ({preOrderCount})</span>
          </button>
        </div>

        {/* Platform & Sort Bar */}
        <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 overflow-x-auto">
            <span className="text-slate-500 uppercase tracking-wider shrink-0 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-slate-400" /> Platform:
            </span>
            {platforms.map((plat) => (
              <button
                key={plat}
                onClick={() => {
                  if (soundEnabled) playCyberBeep(480, 0.04);
                  setSelectedPlatform(plat);
                }}
                className={`px-2.5 py-1 rounded-lg transition-colors whitespace-nowrap ${
                  selectedPlatform === plat
                    ? 'bg-slate-800 text-cyan-300 border border-cyan-500/40 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {plat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-slate-500 uppercase tracking-wider">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-slate-300 text-xs focus:outline-none focus:border-cyan-400 font-mono"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active filters notice if any */}
      {(searchQuery || selectedCategory !== 'All' || selectedPlatform !== 'All' || onlyPreOrders) && (
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
          <div className="flex items-center gap-2 flex-wrap">
            <span>Filtering by:</span>
            {selectedCategory !== 'All' && (
              <span className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300">Category: {selectedCategory}</span>
            )}
            {selectedPlatform !== 'All' && (
              <span className="px-2 py-0.5 rounded bg-slate-800 text-purple-300">Platform: {selectedPlatform}</span>
            )}
            {onlyPreOrders && (
              <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">Pre-Orders Only</span>
            )}
            {searchQuery && (
              <span className="px-2 py-0.5 rounded bg-slate-800 text-white">Search: "{searchQuery}"</span>
            )}
          </div>

          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedPlatform('All');
              setOnlyPreOrders(false);
              setSearchQuery('');
            }}
            className="text-cyan-400 hover:text-cyan-300 underline font-mono text-[11px]"
          >
            Reset All
          </button>
        </div>
      )}

      {/* Products Grid */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={(p) => onAddToCart(p, 1)}
              onViewDetails={(p) => setActiveModalProduct(p)}
              soundEnabled={soundEnabled}
            />
          ))}
        </div>
      ) : (
        <div className="p-16 text-center bg-slate-900/40 rounded-2xl border border-slate-800 space-y-4">
          <Gamepad2 className="w-12 h-12 text-slate-700 mx-auto" />
          <h3 className="text-lg font-bold text-white font-['Orbitron']">
            No Gear or Titles Found
          </h3>
          <p className="text-slate-400 text-xs font-mono max-w-sm mx-auto">
            Try adjusting your search criteria or resetting filters to browse our full inventory.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedPlatform('All');
              setOnlyPreOrders(false);
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-mono text-xs font-bold shadow-md cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Quick Access Pre-Order & Tournament Promotion Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
        <div 
          onClick={onNavigateToPreOrders}
          className="p-6 rounded-2xl bg-gradient-to-br from-cyan-950/60 via-slate-900 to-slate-950 border border-cyan-500/30 hover:border-cyan-400 transition-all cursor-pointer group shadow-xl"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
              Pre-Order Command Center
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 group-hover:scale-125 transition-transform"></span>
          </div>
          <h4 className="text-lg font-bold text-white font-['Orbitron'] group-hover:text-cyan-300 transition-colors">
            Track Guaranteed Day-1 Dispatches →
          </h4>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Monitor countdown to release dates, check batch allocation priority tiers, and redeem your digital closed beta voucher codes.
          </p>
        </div>

        <div 
          onClick={onNavigateToTournaments}
          className="p-6 rounded-2xl bg-gradient-to-br from-purple-950/60 via-slate-900 to-slate-950 border border-purple-500/30 hover:border-purple-400 transition-all cursor-pointer group shadow-xl"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-purple-400 font-bold uppercase tracking-wider">
              Esports Arena Circuit
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-purple-400 group-hover:scale-125 transition-transform"></span>
          </div>
          <h4 className="text-lg font-bold text-white font-['Orbitron'] group-hover:text-purple-300 transition-colors">
            Enter Live Tournaments & Check In →
          </h4>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Compete in $55,000+ prize pools across Valorant, Tekken 8, Apex Legends, and claim your verified LAN stage pass.
          </p>
        </div>
      </div>

      {/* Product Spec & Bonus Modal */}
      <ProductModal
        product={activeModalProduct}
        onClose={() => setActiveModalProduct(null)}
        onAddToCart={(p, qty) => onAddToCart(p, qty)}
        soundEnabled={soundEnabled}
      />
    </div>
  );
};
