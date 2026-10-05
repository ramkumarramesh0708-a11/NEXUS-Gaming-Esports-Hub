/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { Storefront } from './components/Storefront';
import { PreOrderTracker } from './components/PreOrderTracker';
import { TournamentHub } from './components/TournamentHub';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_PREORDERS, 
  INITIAL_TOURNAMENTS, 
  INITIAL_REGISTRATIONS 
} from './data/mockData';
import { Product, CartItem, PreOrderRecord, Tournament, TournamentRegistration } from './types';
import { playCyberBeep } from './utils/helpers';
import { Check, ShoppingBag, ShieldCheck, Trophy } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'shop' | 'preorders' | 'tournaments'>('shop');
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Quick notification toast
  const [toastMessage, setToastMessage] = useState<{ text: string; icon?: 'cart' | 'order' | 'trophy' } | null>(null);

  // Sound effects toggle
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('nexus_sound');
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem('nexus_sound', JSON.stringify(soundEnabled));
  }, [soundEnabled]);

  // Cart state persisted
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('nexus_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('nexus_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Pre-orders state persisted
  const [preOrders, setPreOrders] = useState<PreOrderRecord[]>(() => {
    try {
      const saved = localStorage.getItem('nexus_preorders');
      return saved ? JSON.parse(saved) : INITIAL_PREORDERS;
    } catch {
      return INITIAL_PREORDERS;
    }
  });

  useEffect(() => {
    localStorage.setItem('nexus_preorders', JSON.stringify(preOrders));
  }, [preOrders]);

  // Tournaments state persisted
  const [tournaments, setTournaments] = useState<Tournament[]>(() => {
    try {
      const saved = localStorage.getItem('nexus_tournaments');
      return saved ? JSON.parse(saved) : INITIAL_TOURNAMENTS;
    } catch {
      return INITIAL_TOURNAMENTS;
    }
  });

  useEffect(() => {
    localStorage.setItem('nexus_tournaments', JSON.stringify(tournaments));
  }, [tournaments]);

  // Tournament Registrations state persisted
  const [registrations, setRegistrations] = useState<TournamentRegistration[]>(() => {
    try {
      const saved = localStorage.getItem('nexus_registrations');
      return saved ? JSON.parse(saved) : INITIAL_REGISTRATIONS;
    } catch {
      return INITIAL_REGISTRATIONS;
    }
  });

  useEffect(() => {
    localStorage.setItem('nexus_registrations', JSON.stringify(registrations));
  }, [registrations]);

  // Quick helper toast
  const triggerToast = (text: string, icon: 'cart' | 'order' | 'trophy' = 'cart') => {
    setToastMessage({ text, icon });
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Cart Actions
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });

    triggerToast(
      product.isPreOrder 
        ? `Pre-ordered: ${product.title}` 
        : `Added to cart: ${product.title}`, 
      'cart'
    );
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Pre-Order Actions
  const handleAddNewPreOrder = (newPreOrder: PreOrderRecord) => {
    setPreOrders(prev => [newPreOrder, ...prev]);
    triggerToast(`Pre-Order Confirmed: ${newPreOrder.orderId}`, 'order');
  };

  const handleUpdatePreOrder = (updated: PreOrderRecord) => {
    setPreOrders(prev =>
      prev.map(order => order.orderId === updated.orderId ? updated : order)
    );
  };

  // Tournament Actions
  const handleAddRegistration = (newRegistration: TournamentRegistration) => {
    setRegistrations(prev => [newRegistration, ...prev]);

    // Update tournament participants count
    setTournaments(prev =>
      prev.map(t =>
        t.id === newRegistration.tournamentId
          ? { ...t, registeredCount: Math.min(t.maxParticipants, t.registeredCount + 1) }
          : t
      )
    );

    triggerToast(`Registered for ${newRegistration.tournamentTitle}!`, 'trophy');
  };

  const handleUpdateRegistration = (updated: TournamentRegistration) => {
    setRegistrations(prev =>
      prev.map(r => r.ticketId === updated.ticketId ? updated : r)
    );
  };

  // Navigation helpers
  const handleTabChange = (tab: 'shop' | 'preorders' | 'tournaments') => {
    if (soundEnabled) playCyberBeep(620, 0.05);
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDirectPreOrderProduct = (prod: Product) => {
    handleAddToCart(prod, 1);
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Main Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        cartItems={cartItems}
        setIsCartOpen={setIsCartOpen}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        preOrdersCount={preOrders.length}
        tournamentsCount={tournaments.length}
      />

      {/* Main Body Content based on Tab */}
      <main className="flex-1">
        {activeTab === 'shop' && (
          <>
            <HeroBanner
              onShopClick={() => {
                const el = document.getElementById('catalog-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onPreOrdersClick={() => handleTabChange('preorders')}
              onTournamentsClick={() => handleTabChange('tournaments')}
            />

            <div id="catalog-section">
              <Storefront
                products={products}
                onAddToCart={handleAddToCart}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                soundEnabled={soundEnabled}
                onNavigateToPreOrders={() => handleTabChange('preorders')}
                onNavigateToTournaments={() => handleTabChange('tournaments')}
              />
            </div>
          </>
        )}

        {activeTab === 'preorders' && (
          <PreOrderTracker
            preOrders={preOrders}
            onUpdatePreOrder={handleUpdatePreOrder}
            onExploreProducts={() => handleTabChange('shop')}
            onPreOrderProduct={handleDirectPreOrderProduct}
            upcomingProducts={products.filter(p => p.isPreOrder)}
            soundEnabled={soundEnabled}
          />
        )}

        {activeTab === 'tournaments' && (
          <TournamentHub
            tournaments={tournaments}
            registrations={registrations}
            onAddRegistration={handleAddRegistration}
            onUpdateRegistration={handleUpdateRegistration}
            soundEnabled={soundEnabled}
          />
        )}
      </main>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onAddNewPreOrder={handleAddNewPreOrder}
        onNavigateToPreOrders={(orderId) => {
          handleTabChange('preorders');
        }}
        soundEnabled={soundEnabled}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-slate-900 border border-cyan-500/40 shadow-[0_0_30px_rgba(6,182,212,0.3)] flex items-center gap-3 animate-in slide-in-from-bottom-5">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
            {toastMessage.icon === 'trophy' ? (
              <Trophy className="w-4 h-4 text-yellow-400" />
            ) : toastMessage.icon === 'order' ? (
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            ) : (
              <ShoppingBag className="w-4 h-4 text-cyan-400" />
            )}
          </div>
          <span className="text-xs font-mono font-medium text-white">{toastMessage.text}</span>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
