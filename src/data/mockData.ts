import { Product, PreOrderRecord, Tournament, TournamentRegistration } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-gta6',
    title: 'Grand Theft Auto VI - Special Edition',
    category: 'Games',
    platform: 'PS5',
    price: 89.99,
    originalPrice: 99.99,
    rating: 4.9,
    reviewCount: 3820,
    inStock: true,
    isPreOrder: true,
    releaseDate: '2026-11-14',
    badge: 'Pre-Order #1 Hype',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80',
    description: 'Welcome to Leonida and the neon-soaked streets of Vice City. Pre-order now to secure guaranteed Day-1 physical collector steelbook and in-game bonus cash pack.',
    features: [
      'Next-Gen Ray-Tracing at 4K 60FPS',
      'Hyper-detailed open world with revolutionary AI pedestrians',
      'Dual protagonist dynamic storytelling system',
      'Exclusive Physical Steelbook + Vice City holographic map'
    ],
    preOrderBonus: [
      'Vice City Smuggler Muscle Car (In-Game)',
      '$1,500,000 Vice City Online Starter Capital',
      'Exclusive NEXUS Physical Metallic Keyring',
      'Guaranteed Day-1 Midnight Launch Dispatch'
    ],
    specs: {
      'Publisher': 'Rockstar Games',
      'Genre': 'Open World Action',
      'Audio': 'Dolby Atmos 3D',
      'Edition': 'Steelbook Special Edition'
    }
  },
  {
    id: 'prod-mh-wilds',
    title: 'Monster Hunter Wilds - Hunter Guild Edition',
    category: 'Games',
    platform: 'PC',
    price: 69.99,
    rating: 4.8,
    reviewCount: 1420,
    inStock: true,
    isPreOrder: true,
    releaseDate: '2026-10-28',
    badge: 'Beta Key Included',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=80',
    description: 'Hunt fearsome beasts across dynamic ecosystems where seasons and weather dramatically shift monster behaviors.',
    features: [
      'Seamless dynamic weather and predator ecosystem',
      'Dual-weapon mount system on the Seikret mount',
      'Cross-play enabled across all major platforms',
      'Full Steam key + Bonus Guild armor layer'
    ],
    preOrderBonus: [
      'Guild Knight Layered Armor Set',
      'Hope Charm Talisman',
      'Closed Beta VIP Access Pass',
      'Digital Artbook & Orchestral Mini-OST'
    ],
    specs: {
      'Publisher': 'Capcom',
      'Platform': 'Steam / PC',
      'Co-op': 'Up to 4 Players Online',
      'Display': 'Ultrawide 21:9 & 32:9 Supported'
    }
  },
  {
    id: 'prod-rtx-5090',
    title: 'GeForce RTX 5090 Ti OC Edition 32GB',
    category: 'Hardware',
    platform: 'PC',
    price: 1899.99,
    originalPrice: 1999.99,
    rating: 5.0,
    reviewCount: 450,
    inStock: true,
    badge: 'Flagship GPU',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=900&q=80',
    description: 'The pinnacle of neural rendering and raw compute power. 32GB GDDR7 memory, Blackwell architecture, and DLSS 4 frame generation for uncompromising 8K gaming.',
    features: [
      '32GB GDDR7 512-bit High Speed Memory',
      'Quad-slot Vapor Chamber with MagLev Tri-Fans',
      'DLSS 4 Neural Reconstruction & Ray Reconstruction',
      'Dual HDMI 2.1b and Triple DisplayPort 2.1 UHBR20'
    ],
    specs: {
      'Memory': '32 GB GDDR7',
      'Boost Clock': '2,750 MHz',
      'Power Draw': '550W (16-pin 12V-2x6)',
      'Dimensions': '342 x 148 x 72 mm'
    }
  },
  {
    id: 'prod-ps5-pro',
    title: 'PlayStation 5 Pro 2TB Console - DualSense Elite Bundle',
    category: 'Consoles',
    platform: 'PS5',
    price: 699.99,
    rating: 4.9,
    reviewCount: 2890,
    inStock: true,
    badge: 'Staff Pick',
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=900&q=80',
    description: 'Experience PlayStation Spectral Super Resolution (PSSR), advanced ray tracing fidelity, and ultra-smooth 60/120 FPS performance in native 4K.',
    features: [
      'PlayStation Spectral Super Resolution (PSSR) AI Upscaling',
      'Upgraded GPU with 67% more Compute Units',
      'High-Speed 2TB NVMe SSD Installed',
      'Includes DualSense Wireless Controller + Astro Bot Pack'
    ],
    specs: {
      'Storage': '2TB PCIe 4.0 NVMe SSD',
      'Resolution': '4K 120Hz & 8K Support',
      'Weight': '3.1 kg',
      'Audio': 'Tempest 3D AudioTech'
    }
  },
  {
    id: 'prod-apex-pro-kbd',
    title: 'Apex Pro Hall-Effect Magnetic Gaming Keyboard',
    category: 'Peripherals',
    platform: 'PC',
    price: 219.99,
    originalPrice: 249.99,
    rating: 4.8,
    reviewCount: 940,
    inStock: true,
    badge: 'Pro Esports',
    image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=900&q=80',
    description: 'Adjustable magnetic switches with 0.1mm to 4.0mm rapid trigger actuation. Never miss a strafe or counter-peek in Valorant and CS2.',
    features: [
      'OmniPoint 3.0 HyperMagnetic Switches',
      'Rapid Trigger with 0.1mm reset latency',
      'OLED Smart Display for in-game stats & profiles',
      'Aircraft-grade aluminum top plate'
    ],
    specs: {
      'Switch Type': 'Hall Effect Magnetic',
      'Polling Rate': '8,000 Hz True Hyper-Polling',
      'Keycaps': 'Double-shot PBT',
      'Lighting': 'Per-key RGB with PrismSync'
    }
  },
  {
    id: 'prod-artemis-headset',
    title: 'Valkyrie Spatial Wireless ANC Esports Headset',
    category: 'Peripherals',
    platform: 'Multi-Platform',
    price: 179.99,
    originalPrice: 219.99,
    rating: 4.7,
    reviewCount: 630,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80',
    description: 'Low-latency 2.4GHz wireless plus Bluetooth 5.4. Planar magnetic drivers deliver surgically precise enemy footstep tracking and crystal-clear comms.',
    features: [
      '50mm Planar Magnetic Custom Drivers',
      'Broadcast-grade AI Noise-Cancelling boom mic',
      '60-hour marathon battery with fast recharge',
      'Multi-platform USB-C Dongle for PC, PS5, Switch & Mobile'
    ],
    specs: {
      'Frequency Response': '10Hz - 40,000Hz',
      'Connection': '2.4GHz Low Latency + BT 5.4',
      'Battery Life': 'Up to 60 Hours',
      'Weight': '295g Ultra-lightweight'
    }
  },
  {
    id: 'prod-cyberpunk-statue',
    title: 'Cyberpunk Edgerunners: David & Lucy Diorama Statue (Limited #450)',
    category: 'Collectibles',
    platform: 'Multi-Platform',
    price: 249.99,
    rating: 5.0,
    reviewCount: 180,
    inStock: true,
    isPreOrder: true,
    releaseDate: '2026-12-01',
    badge: 'Limited Run of 500',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=900&q=80',
    description: 'Hand-painted premium polystone diorama with integrated LED neon lighting along the Sandevistan trailing effect. Numbered certificate included.',
    features: [
      '1/6 Scale Polystone Diorama (18 inches tall)',
      'USB-C Powered LED Underglow and Neon Cyber-accents',
      'Individually laser-engraved metal authentication plate',
      'Collector art box signed by the studio design lead'
    ],
    preOrderBonus: [
      'Numbered Holographic Certificate of Authenticity',
      'Exclusive Sandevistan Enamel Pin Set',
      'High-Gloss 24x36 Poster Print'
    ]
  },
  {
    id: 'prod-death-stranding-2',
    title: 'Death Stranding 2: On The Beach - Porter Collector Edition',
    category: 'Games',
    platform: 'PS5',
    price: 119.99,
    originalPrice: 129.99,
    rating: 4.9,
    reviewCount: 780,
    inStock: true,
    isPreOrder: true,
    releaseDate: '2026-11-20',
    badge: 'Kojima Productions',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=900&q=80',
    description: 'Join Sam Porter Bridges on a perilous expedition outside the UCA to connect human society once again. Includes full-scale Magellan ship replica figurine.',
    features: [
      'Breathtaking Decima Engine real-time environmental destruction',
      'Star-studded cast starring Norman Reedus and Elle Fanning',
      'Includes physical DHV Magellan Ship Model (8 inches)',
      'Soundtrack vinyl card + in-game custom exoskeleton chassis'
    ],
    preOrderBonus: [
      'Sam Bridges High-Vis Gold Exoskeleton',
      'Chiral Gold Fragile Boots',
      'Pre-load ready 48 hours before official launch',
      'Official NEXUS midnight pick-up VIP voucher'
    ]
  }
];

export const INITIAL_PREORDERS: PreOrderRecord[] = [
  {
    orderId: 'NX-PRE-8842',
    customerName: 'Alex Mercer',
    email: 'alex.mercer@gmail.com',
    orderDate: '2026-09-12',
    estimatedDeliveryDate: '2026-11-14',
    releaseDate: '2026-11-14',
    gameTitle: 'Grand Theft Auto VI - Special Edition',
    edition: 'Physical Steelbook Collector Edition',
    platform: 'PS5',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80',
    price: 89.99,
    status: 'bonus_unlocked',
    batchTier: 'Tier 1 (Guaranteed Day-1 Launch Dispatch)',
    shippingAddress: '742 Evergreen Terrace, Suite 4B, Springfield, OR',
    carrier: 'FedEx Gaming Express',
    trackingNumber: 'FDX-7749-0129-NX',
    isPickupMidnightLaunch: false,
    bonusCode: 'GTA6-NEXUS-VCE88-DAY1',
    bonusClaimed: true
  },
  {
    orderId: 'NX-PRE-4190',
    customerName: 'Marcus Vance',
    email: 'marcus.vance@techcorp.io',
    orderDate: '2026-09-20',
    estimatedDeliveryDate: '2026-10-28',
    releaseDate: '2026-10-28',
    gameTitle: 'Monster Hunter Wilds - Hunter Guild Edition',
    edition: 'Digital Deluxe Guild Edition',
    platform: 'PC',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=80',
    price: 69.99,
    status: 'preparing_shipment',
    batchTier: 'Batch 1 - Digital Steam Key Pre-Load',
    shippingAddress: 'Digital Steam Key Delivery to marcus.vance@techcorp.io',
    carrier: 'Instant Digital Key Dispatch',
    trackingNumber: 'DIGI-STM-9921',
    isPickupMidnightLaunch: false,
    bonusCode: 'MHW-BETA-VIP-77012',
    bonusClaimed: false
  },
  {
    orderId: 'NX-PRE-9025',
    customerName: 'Elena Rostova',
    email: 'elena.gaming@gmail.com',
    orderDate: '2026-10-01',
    estimatedDeliveryDate: '2026-11-20',
    releaseDate: '2026-11-20',
    gameTitle: 'Death Stranding 2: On The Beach - Porter Collector Edition',
    edition: 'Collector Replica Box Set',
    platform: 'PS5',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=900&q=80',
    price: 119.99,
    status: 'allocated',
    batchTier: 'Tier 1 Priority Allocation',
    shippingAddress: 'In-Store Midnight Launch: NEXUS Flagship Arena (Dallas)',
    pickupStore: 'NEXUS Dallas Esports MegaStore, 400 Tech Blvd',
    isPickupMidnightLaunch: true,
    bonusCode: 'DS2-BEACH-VIP-5541',
    bonusClaimed: false
  }
];

export const INITIAL_TOURNAMENTS: Tournament[] = [
  {
    id: 'tourn-val-champions',
    title: 'Valorant Nexus Champions Cup 2026',
    game: 'Valorant',
    gameBanner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    format: '5v5 Team',
    prizePool: '$15,000 USD',
    entryFee: 'Free (Sponsored by NEXUS & Razer)',
    startDate: '2026-10-18',
    locationType: 'LAN Arena (Dallas Hub)',
    registeredCount: 28,
    maxParticipants: 32,
    status: 'Filling Fast',
    featured: true,
    rulesSummary: [
      'Standard Competitive 5v5 Bomb Defusal, Best-of-3 format',
      'Map Pool: Ascent, Bind, Haven, Sunset, Lotus, Abyss',
      'All players must have minimum Rank Ascendant 1 on Riot servers',
      'Physical check-in at Arena 10:00 AM CST or Online Discord Check-in'
    ],
    schedule: [
      { time: '10:00 AM CST', phase: 'Check-in & Hardware Warm-up' },
      { time: '11:30 AM CST', phase: 'Group Stage Round of 32 (Bo1)' },
      { time: '03:00 PM CST', phase: 'Quarterfinals & Semifinals (Bo3)' },
      { time: '07:30 PM CST', phase: 'Grand Finals Live Broadcast (Bo5)' }
    ],
    prizes: [
      { rank: '1st Place', reward: '$8,500 + 5x Custom Champion Trophy + NEXUS Hardware Pack' },
      { rank: '2nd Place', reward: '$4,000 + Custom Medals' },
      { rank: '3rd - 4th', reward: '$1,250 each + $150 Store Vouchers' }
    ]
  },
  {
    id: 'tourn-tekken8-ironfist',
    title: 'Tekken 8: King of the Iron Fist Arena',
    game: 'Tekken 8',
    gameBanner: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80',
    format: '1v1 Solo',
    prizePool: '$6,000 USD',
    entryFee: '$10 Entry (Includes $10 Store Credit)',
    startDate: '2026-10-25',
    locationType: 'LAN Arena (LA Stadium)',
    registeredCount: 46,
    maxParticipants: 64,
    status: 'Open',
    featured: true,
    rulesSummary: [
      'Double Elimination Bracket, 1v1 Matches',
      'Standard 60s rounds, 3 rounds to win a game',
      'BYOC (Bring Your Own Controller / Fightstick / Leverless permitted)',
      'Stage selection: Random for Game 1, Loser pick thereafter'
    ],
    schedule: [
      { time: '01:00 PM PST', phase: 'Pools Waves A & B' },
      { time: '04:00 PM PST', phase: 'Top 16 Winners & Losers' },
      { time: '06:30 PM PST', phase: 'Top 8 Mainstage Final Showcase' }
    ],
    prizes: [
      { rank: '1st Place', reward: '$3,500 + Golden Heihachi Bust + Flight to EVO' },
      { rank: '2nd Place', reward: '$1,500' },
      { rank: '3rd Place', reward: '$700' },
      { rank: '4th Place', reward: '$300' }
    ]
  },
  {
    id: 'tourn-cs2-major',
    title: 'Counter-Strike 2 Fall LAN Showdown',
    game: 'Counter-Strike 2',
    gameBanner: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&w=1200&q=80',
    format: '5v5 Team',
    prizePool: '$20,000 USD',
    entryFee: 'Free (Sponsored by Intel & Nvidia)',
    startDate: '2026-11-08',
    locationType: 'LAN Arena (Dallas Hub)',
    registeredCount: 16,
    maxParticipants: 16,
    status: 'Closed',
    rulesSummary: [
      'MR12 regulation overtime with $10,000 start cash',
      'Active Duty map pool with knife round for side choice',
      'Strict anti-cheat kernel protocol verification at stage PC stations',
      'Live stream on Twitch and YouTube Gaming'
    ],
    schedule: [
      { time: '09:00 AM CST', phase: 'System Inspection & Config Load' },
      { time: '10:30 AM CST', phase: 'Quarterfinals' },
      { time: '03:30 PM CST', phase: 'Semifinals' },
      { time: '07:00 PM CST', phase: 'Grand Finals Bo3' }
    ],
    prizes: [
      { rank: '1st Place', reward: '$12,000 + 5x RTX 5090 Ti GPUs' },
      { rank: '2nd Place', reward: '$5,000' },
      { rank: '3rd Place', reward: '$3,000' }
    ]
  },
  {
    id: 'tourn-apex-trio',
    title: 'Apex Legends Apex Predator Battle Royale',
    game: 'Apex Legends',
    gameBanner: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=1200&q=80',
    format: '3v3 Trio',
    prizePool: '$10,000 USD',
    entryFee: 'Free Online Open',
    startDate: '2026-11-15',
    locationType: 'Online Global Server',
    registeredCount: 18,
    maxParticipants: 20,
    status: 'Filling Fast',
    rulesSummary: [
      '6 Custom Lobby Match Point format (50 points threshold + Match Win)',
      'Kill point: 1 point per frag. Placement points 1st: 12pts, 2nd: 9pts...',
      'Platform: Crossplay enabled (PC / PS5 / Xbox)',
      'Players must stream with 90s delay'
    ],
    schedule: [
      { time: '12:00 PM EST', phase: 'Lobby Code distribution in Official Discord' },
      { time: '01:00 PM EST', phase: 'Matches 1 to 3 (World\'s Edge)' },
      { time: '03:30 PM EST', phase: 'Matches 4 to 6 (Storm Point) & Match Point Finish' }
    ],
    prizes: [
      { rank: '1st Place', reward: '$6,000 + Apex Predator In-Game Badges' },
      { rank: '2nd Place', reward: '$2,500' },
      { rank: '3rd Place', reward: '$1,500' }
    ]
  },
  {
    id: 'tourn-rocket-league',
    title: 'Rocket League Supersonic Aerial Invitational',
    game: 'Rocket League',
    gameBanner: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=1200&q=80',
    format: '3v3 Trio',
    prizePool: '$4,000 USD',
    entryFee: 'Free Entry',
    startDate: '2026-11-22',
    locationType: 'Online Global Server',
    registeredCount: 12,
    maxParticipants: 16,
    status: 'Open',
    rulesSummary: [
      'Standard 3v3 Soccar, 5-minute games + OT',
      'Double Elimination bracket (Bo5 Upper, Bo7 Grand Final)',
      'DFH Stadium, Utopia Coliseum, Champions Field rotation',
      'Official casters streaming matches on NEXUS Twitch'
    ],
    schedule: [
      { time: '02:00 PM EST', phase: 'Round 1 & 2' },
      { time: '05:00 PM EST', phase: 'Semifinals' },
      { time: '07:00 PM EST', phase: 'Grand Finals Bo7' }
    ],
    prizes: [
      { rank: '1st Place', reward: '$2,500 + Custom Aerial Trophies' },
      { rank: '2nd Place', reward: '$1,000' },
      { rank: '3rd Place', reward: '$500' }
    ]
  }
];

export const INITIAL_REGISTRATIONS: TournamentRegistration[] = [
  {
    ticketId: 'TKT-VAL-8821',
    tournamentId: 'tourn-val-champions',
    tournamentTitle: 'Valorant Nexus Champions Cup 2026',
    game: 'Valorant',
    registeredAt: '2026-10-02',
    captainName: 'Jordan "ViperX" Ross',
    gamerTag: 'ViperX#NA1',
    email: 'jordan.ross@gmail.com',
    discordTag: 'ViperX_val#0442',
    teamName: 'Phantom Syndicate',
    teammates: ['Ghost#992', 'SovaGod#NA1', 'AstraDream#123', 'BreachMain#888'],
    platform: 'PC',
    assignedSeat: 'LAN Station Alpha-04 (Dallas Hub)',
    bracketSlot: 'Seed #4 (Group B)',
    checkedIn: true
  },
  {
    ticketId: 'TKT-TK8-4109',
    tournamentId: 'tourn-tekken8-ironfist',
    tournamentTitle: 'Tekken 8: King of the Iron Fist Arena',
    game: 'Tekken 8',
    registeredAt: '2026-10-03',
    captainName: 'Jin Kazama Fanatic',
    gamerTag: 'ElectricWind#TK8',
    email: 'jin.player@yahoo.com',
    discordTag: 'ElectricGodFist#0001',
    platform: 'PS5 (Leverless Controller)',
    assignedSeat: 'Fighting Pit Pod C-12',
    bracketSlot: 'Pool A - Round 1',
    checkedIn: false
  },
  {
    ticketId: 'TKT-APX-7714',
    tournamentId: 'tourn-apex-trio',
    tournamentTitle: 'Apex Legends Apex Predator Battle Royale',
    game: 'Apex Legends',
    registeredAt: '2026-10-04',
    captainName: 'Sarah Jenkins',
    gamerTag: 'HorizonAero#TTV',
    email: 'sarah.apex@outlook.com',
    discordTag: 'AeroHorizon#9090',
    teamName: 'Vortex Gravity',
    teammates: ['PathfinderZ#99', 'GibbyShield#77'],
    platform: 'PC',
    assignedSeat: 'Online Lobby Channel 07',
    bracketSlot: 'Lobby 1 - Team 14',
    checkedIn: true
  }
];
