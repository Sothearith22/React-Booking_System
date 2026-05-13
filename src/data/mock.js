
export const MOCK_USERS = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@stayease.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    status: 'active'
  },
  {
    id: 2,
    name: 'John Doe',
    email: 'rithrith8442@gmail.com',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    status: 'active'
  }
];

export const MOCK_ROOMS = [
  {
    id: 1,
    room_number: '101',
    room_type: 'Grand Royal Suite',
    location: 'Paris, France',
    price_per_night: 320,
    rating: 4.9,
    floor: 4,
    status: 'available',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800',
    amenities: ['wifi', 'pool', 'breakfast'],
    tag: 'Best Seller'
  },
  {
    id: 2,
    room_number: '204',
    room_type: 'Ocean View Villa',
    location: 'Maldives',
    price_per_night: 550,
    rating: 4.8,
    floor: 2,
    status: 'booked',
    image: 'https://images.unsplash.com/photo-1544124499-58912cbddaad?auto=format&fit=crop&q=80&w=800',
    amenities: ['wifi', 'pool', 'beach'],
    tag: 'Featured'
  },
  {
    id: 3,
    room_number: '405',
    room_type: 'Alpine Mountain Lodge',
    location: 'Swiss Alps',
    price_per_night: 280,
    rating: 4.7,
    floor: 4,
    status: 'maintenance',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800',
    amenities: ['wifi', 'fireplace', 'spa'],
    tag: 'Eco Friendly'
  },
  {
    id: 4,
    room_number: '102',
    room_type: 'Grand Royal Suite',
    location: 'Paris, France',
    price_per_night: 320,
    rating: 4.9,
    floor: 1,
    status: 'available',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800',
    amenities: ['wifi', 'pool', 'breakfast'],
    tag: ''
  },
  {
    id: 5,
    room_number: '205',
    room_type: 'Ocean View Villa',
    location: 'Maldives',
    price_per_night: 550,
    rating: 4.8,
    floor: 2,
    status: 'available',
    image: 'https://images.unsplash.com/photo-1544124499-58912cbddaad?auto=format&fit=crop&q=80&w=800',
    amenities: ['wifi', 'pool', 'beach'],
    tag: ''
  },
  {
    id: 6,
    room_number: '404',
    room_type: 'Modern City Penthouse',
    location: 'Tokyo, Japan',
    price_per_night: 420,
    rating: 4.9,
    floor: 12,
    status: 'available',
    image: 'https://images.unsplash.com/photo-1512918766674-ed62b9a79ad6?auto=format&fit=crop&q=80&w=800',
    amenities: ['wifi', 'gym', 'smart-home'],
    tag: 'New'
  },
  {
    id: 7,
    room_number: '510',
    room_type: 'Modern City Penthouse',
    location: 'Tokyo, Japan',
    price_per_night: 420,
    rating: 4.9,
    floor: 5,
    status: 'booked',
    image: 'https://images.unsplash.com/photo-1512918766674-ed62b9a79ad6?auto=format&fit=crop&q=80&w=800',
    amenities: ['wifi', 'gym', 'smart-home'],
    tag: ''
  }
];

export const MOCK_BOOKINGS = [
  {
    id: 'LS-49210-23',
    hotel_name: 'The Azure Riviera Resort',
    location: 'Nice, French Riviera',
    check_in: 'Oct 12, 2023',
    check_out: 'Oct 15, 2023',
    room_type: 'Ocean Suite',
    status: 'completed',
    price: 1250,
    nights: 3,
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'LS-88124-23',
    hotel_name: 'Majestic Alps Lodge',
    location: 'Zermatt, Switzerland',
    check_in: 'Dec 20, 2023',
    check_out: 'Dec 23, 2023',
    room_type: 'Mountain Cabin',
    status: 'cancelled',
    price: 840,
    nights: 3,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'LS-31055-23',
    hotel_name: 'Lumina City Towers',
    location: 'Tokyo, Japan',
    check_in: 'Aug 05, 2023',
    check_out: 'Aug 10, 2023',
    room_type: 'Executive King',
    status: 'completed',
    price: 2100,
    nights: 5,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'LS-10250-24',
    hotel_name: 'Grand Royal Suite',
    location: 'Paris, France',
    check_in: 'Apr 28, 2026',
    check_out: 'May 02, 2026',
    room_type: 'Grand Royal Suite',
    status: 'confirmed',
    price: 1280,
    nights: 4,
    image: 'https://images.unsplash.com/photo-1551882547-ff43c61bf640?auto=format&fit=crop&q=80&w=800'
  }
];

export const MOCK_PRODUCTS = [
  {
    id: 'p1',
    name: 'Still Water (Voss 800ml)',
    description: 'Artesian water from Southern Norway.',
    price: 12.00,
    category: 'Snacks & Drinks',
    image: 'https://images.unsplash.com/photo-1563203369-26f2e4a5ccf7?auto=format&fit=crop&q=80&w=400',
    tag: 'BEST SELLER'
  },
  {
    id: 'p2',
    name: 'Le Labo Santal 33 Soap',
    description: 'Handmade soap with signature spicy scent.',
    price: 18.00,
    category: 'Toiletries',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=400',
    tag: 'PREMIUM'
  },
  {
    id: 'p3',
    name: 'Extra Goose Down Pillow',
    description: 'Ultra-soft 800 fill power, Egyptian cotton cover.',
    price: 0.00,
    category: 'Bedding',
    image: 'https://images.unsplash.com/photo-1584132915807-fd1f5fbc078f?auto=format&fit=crop&q=80&w=400',
    tag: ''
  },
  {
    id: 'p4',
    name: 'Double Espresso Shot',
    description: 'Single-origin beans, roasted locally.',
    price: 6.00,
    category: 'Snacks & Drinks',
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&q=80&w=400',
    tag: ''
  },
  {
    id: 'p5',
    name: 'Silk Trim Slippers',
    description: 'One size fits all, quilted cotton interior.',
    price: 25.00,
    category: 'Amenities',
    image: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&q=80&w=400',
    tag: ''
  },
  {
    id: 'p6',
    name: 'The Midnight Hamper',
    description: 'Curated selection of dark chocolates and almonds.',
    price: 45.00,
    category: 'Snacks & Drinks',
    image: 'https://images.unsplash.com/photo-1549462980-6a013a29df7b?auto=format&fit=crop&q=80&w=400',
    tag: ''
  },
  {
    id: 'p7',
    name: 'Aromatic Yoga Session',
    description: '60-minute private session in your suite.',
    price: 85.00,
    category: 'Wellness',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=400',
    tag: 'RELAX'
  },
  {
    id: 'p8',
    name: 'Full Turndown Service',
    description: 'Fresh linens, lavender mist, and chocolate.',
    price: 0.00,
    category: 'Housekeeping',
    image: 'https://images.unsplash.com/photo-1540518614846-7ede5638ec50?auto=format&fit=crop&q=80&w=400',
    tag: 'COMPLIMENTARY'
  },
  {
    id: 'p9',
    name: 'Airport VIP Transfer',
    description: 'Mercedes S-Class with professional chauffeur.',
    price: 150.00,
    category: 'Concierge',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=400',
    tag: 'LUXURY'
  }
];


