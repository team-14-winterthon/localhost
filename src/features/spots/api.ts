import type { Spot, Visit } from "./types";

// Mock data for development
const mockSpots: Spot[] = [
  {
    id: "1",
    name: "영도대교",
    lat: 35.0934,
    lng: 129.0371,
    description: "부산광역시의 관광명소",
    image_url: "https://images.unsplash.com/photo-1596443686812-2f45229eeb36",
    address: "부산광역시 영도구 태종로 46",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "흰여울 문화 마을",
    lat: 35.0788,
    lng: 129.0436,
    description: "부산광역시의 관광명소",
    image_url: "https://images.unsplash.com/photo-1628589679133-c8bfbda8d6d6",
    address: "부산광역시 영도구 영선동4가 605-3",
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    name: "영도 조내기 고구마 공원",
    lat: 35.08,
    lng: 129.06,
    description: "부산광역시의 관광명소",
    image_url: "https://images.unsplash.com/photo-1590637175654-20a6566060c5",
    address: "부산광역시 영도구 청학동 산54",
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    name: "비룡",
    lat: 35.12,
    lng: 129.04,
    description: "울산광역시의 특산품",
    image_url: "https://images.unsplash.com/photo-1599021235472-3543d3950c05",
    address: "울산광역시 어딘가",
    created_at: new Date().toISOString(),
  },
];

export const spotsApi = {
  async getAll(): Promise<Spot[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockSpots;
  },

  async getById(id: string): Promise<Spot | null> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockSpots.find((spot) => spot.id === id) || null;
  },

  async create(spot: Omit<Spot, "id" | "created_at">): Promise<Spot> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const newSpot: Spot = {
      ...spot,
      id: String(Date.now()),
      created_at: new Date().toISOString(),
    };
    mockSpots.push(newSpot);
    return newSpot;
  },
};

export const visitsApi = {
  async create(visit: Omit<Visit, "id" | "created_at">): Promise<Visit> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      ...visit,
      id: String(Date.now()),
      created_at: new Date().toISOString(),
    };
  },

  async getByUser(_userId: string): Promise<Visit[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return [];
  },
};
