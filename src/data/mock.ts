export interface Hub {
  id: string;
  name: string;
}

export const hubs: Hub[] = [
  { id: "sjo", name: "SJO – Juan Santamaría Airport" },
  { id: "lir", name: "LIR – Daniel Oduber Airport" },
  { id: "sanjose", name: "San José Centro" },
  { id: "fortuna", name: "La Fortuna / Arenal" },
  { id: "monteverde", name: "Monteverde" },
  { id: "manuelantonio", name: "Manuel Antonio / Quepos" },
  { id: "santateresa", name: "Santa Teresa" },
  { id: "tamarindo", name: "Tamarindo" },
  { id: "puertoviejo", name: "Puerto Viejo" },
  { id: "limon", name: "Limón" },
];

export const hubName = (id: string) => hubs.find((h) => h.id === id)?.name ?? id;

export interface PopularRoute {
  from: string;
  to: string;
  avgUsd: number;
  hours: string;
  image: string;
}

export const popularRoutes: PopularRoute[] = [
  { from: "sjo", to: "fortuna", avgUsd: 145, hours: "3h 15m", image: "https://images.unsplash.com/photo-1518259102261-b40117eabbc9?w=800&q=70" },
  { from: "sjo", to: "manuelantonio", avgUsd: 160, hours: "3h 00m", image: "https://images.unsplash.com/photo-1552465011-b4e9d5e0c1f7?w=800&q=70" },
  { from: "lir", to: "tamarindo", avgUsd: 95, hours: "1h 20m", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=70" },
  { from: "sjo", to: "santateresa", avgUsd: 285, hours: "5h 00m", image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&q=70" },
  { from: "fortuna", to: "monteverde", avgUsd: 130, hours: "3h 30m", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=70" },
  { from: "sjo", to: "puertoviejo", avgUsd: 210, hours: "4h 30m", image: "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?w=800&q=70" },
];

export interface Vehicle {
  id: string;
  label: string;
  seats: number;
  amenities: string[];
}

export interface Driver {
  id: string;
  name: string;
  company: string;
  photo: string;
  rating: number;
  trips: number;
  verified: boolean;
  whatsapp: string;
  vehicles: Vehicle[];
}

export const drivers: Driver[] = [
  {
    id: "d1",
    name: "Carlos Mendoza",
    company: "Aventuras del Norte",
    photo: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=200&q=70",
    rating: 4.9,
    trips: 124,
    verified: true,
    whatsapp: "50661500559",
    vehicles: [
      { id: "v1", label: "2023 Toyota HiAce Van", seats: 8, amenities: ["AC", "WiFi", "Bilingual driver"] },
      { id: "v2", label: "2021 Hyundai H1", seats: 6, amenities: ["AC", "Child seat available"] },
    ],
  },
  {
    id: "d2",
    name: "Marisol Vargas",
    company: "Pacífico Shuttle",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=70",
    rating: 4.8,
    trips: 312,
    verified: true,
    whatsapp: "50661500559",
    vehicles: [
      { id: "v3", label: "2022 Mercedes Sprinter", seats: 14, amenities: ["AC", "WiFi", "Cooler with ice"] },
    ],
  },
  {
    id: "d3",
    name: "Jorge Alvarado",
    company: "Tico Surf Transfers",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=70",
    rating: 4.7,
    trips: 88,
    verified: true,
    whatsapp: "50661500559",
    vehicles: [
      { id: "v4", label: "2020 Toyota Hilux 4x4", seats: 5, amenities: ["Surfboard racks", "AC"] },
    ],
  },
  {
    id: "d4",
    name: "Andrea Solís",
    company: "Arenal Green Rides",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=70",
    rating: 5.0,
    trips: 61,
    verified: true,
    whatsapp: "50661500559",
    vehicles: [
      { id: "v5", label: "2024 Kia Carnival Hybrid", seats: 7, amenities: ["AC", "WiFi", "Bottled water"] },
    ],
  },
  {
    id: "d5",
    name: "Randall Quesada",
    company: "Caribe Express",
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=70",
    rating: 4.6,
    trips: 203,
    verified: false,
    whatsapp: "50661500559",
    vehicles: [
      { id: "v6", label: "2019 Nissan Urvan", seats: 12, amenities: ["AC", "Bike rack"] },
    ],
  },
];

const perkPool = [
  ["Cooler with ice", "Bilingual driver"],
  ["Surfboard racks available", "Free stop at Tárcoles bridge"],
  ["Child seats included", "Bottled water"],
  ["WiFi on board", "Flexible airport wait time"],
  ["Coffee stop included", "Luggage trailer"],
];

export interface Bid {
  id: string;
  driverId: string;
  vehicleId: string;
  priceUsd: number;
  perks: string[];
  notes?: string;
  createdAt: number;
}

export const generateBid = (basePrice: number, index: number): Bid => {
  const driver = drivers[(index + Math.floor(Math.random() * drivers.length)) % drivers.length];
  const swing = 1 - index * 0.06 - Math.random() * 0.08;
  return {
    id: `bid-${Date.now()}-${index}`,
    driverId: driver.id,
    vehicleId: driver.vehicles[0].id,
    priceUsd: Math.max(45, Math.round((basePrice * swing) / 5) * 5),
    perks: perkPool[index % perkPool.length],
    createdAt: Date.now(),
  };
};

export const estimateBase = (from: string, to: string) => {
  const match = popularRoutes.find(
    (r) => (r.from === from && r.to === to) || (r.from === to && r.to === from),
  );
  return match ? match.avgUsd + 25 : 175;
};

export interface DriverRequest {
  id: string;
  from: string;
  to: string;
  date: string;
  time: string;
  pax: number;
  bags: number;
  budgetUsd?: number;
  lowestBidUsd?: number;
}

export const openRequests: DriverRequest[] = [
  { id: "r1", from: "sjo", to: "monteverde", date: "2026-09-18", time: "09:30", pax: 4, bags: 5, budgetUsd: 180, lowestBidUsd: 175 },
  { id: "r2", from: "lir", to: "santateresa", date: "2026-09-19", time: "14:00", pax: 2, bags: 3, lowestBidUsd: 240 },
  { id: "r3", from: "manuelantonio", to: "sjo", date: "2026-09-20", time: "06:00", pax: 6, bags: 8, budgetUsd: 150 },
  { id: "r4", from: "fortuna", to: "tamarindo", date: "2026-09-22", time: "11:15", pax: 3, bags: 4, lowestBidUsd: 205 },
];

export interface DriverRide {
  id: string;
  from: string;
  to: string;
  date: string;
  pax: number;
  fareUsd: number;
  status: "pending" | "confirmed" | "completed";
}

export const driverRides: DriverRide[] = [
  { id: "a1", from: "sjo", to: "fortuna", date: "2026-09-16", pax: 4, fareUsd: 140, status: "confirmed" },
  { id: "a2", from: "fortuna", to: "monteverde", date: "2026-09-17", pax: 2, fareUsd: 125, status: "pending" },
  { id: "a3", from: "sjo", to: "manuelantonio", date: "2026-09-10", pax: 6, fareUsd: 165, status: "completed" },
  { id: "a4", from: "lir", to: "tamarindo", date: "2026-09-08", pax: 3, fareUsd: 90, status: "completed" },
];
