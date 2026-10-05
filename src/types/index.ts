export type Platform = 'PC' | 'PS5' | 'Xbox Series X' | 'Nintendo Switch' | 'Multi-Platform';

export type ProductCategory = 
  | 'Games' 
  | 'Consoles' 
  | 'Hardware' 
  | 'Peripherals' 
  | 'Collectibles';

export interface Product {
  id: string;
  title: string;
  category: ProductCategory;
  platform: Platform;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  isPreOrder?: boolean;
  releaseDate?: string;
  image: string;
  description: string;
  features: string[];
  specs?: Record<string, string>;
  preOrderBonus?: string[];
  badge?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedEdition?: string;
}

export type PreOrderStatus = 
  | 'confirmed'
  | 'allocated'
  | 'bonus_unlocked'
  | 'preparing_shipment'
  | 'dispatched'
  | 'delivered';

export interface PreOrderRecord {
  orderId: string;
  customerName: string;
  email: string;
  orderDate: string;
  estimatedDeliveryDate: string;
  releaseDate: string;
  gameTitle: string;
  edition: string;
  platform: Platform;
  image: string;
  price: number;
  status: PreOrderStatus;
  carrier?: string;
  trackingNumber?: string;
  batchTier: string;
  shippingAddress: string;
  pickupStore?: string;
  isPickupMidnightLaunch?: boolean;
  bonusCode?: string;
  bonusClaimed?: boolean;
}

export interface Tournament {
  id: string;
  title: string;
  game: string;
  gameBanner: string;
  format: '1v1 Solo' | '3v3 Trio' | '5v5 Team' | '2v2 Duo';
  prizePool: string;
  entryFee: string;
  startDate: string;
  locationType: 'LAN Arena (Dallas Hub)' | 'LAN Arena (LA Stadium)' | 'Online Global Server';
  registeredCount: number;
  maxParticipants: number;
  status: 'Open' | 'Filling Fast' | 'Closed' | 'Live Now';
  rulesSummary: string[];
  schedule: { time: string; phase: string }[];
  prizes: { rank: string; reward: string }[];
  featured?: boolean;
}

export interface TournamentRegistration {
  ticketId: string;
  tournamentId: string;
  tournamentTitle: string;
  game: string;
  registeredAt: string;
  captainName: string;
  gamerTag: string;
  email: string;
  discordTag: string;
  teamName?: string;
  teammates?: string[];
  platform: string;
  assignedSeat?: string;
  bracketSlot?: string;
  checkedIn: boolean;
}
