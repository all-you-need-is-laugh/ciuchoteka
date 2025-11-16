// Clothing item categories
export type ClothingCategory = 'outerwear' | 'bottom' | 'shoes' | 'accessories' | 'other';

// Clothing item interface
export interface ClothingItem {
  id: string;
  name: string;
  category: ClothingCategory;
  type: string;
  cost?: number;
  photo: string; // base64 encoded JPEG
  dateAdded: string; // ISO 8601 format
}

// Outfit interface
export interface Outfit {
  id: string;
  photo: string; // base64 encoded JPEG
  date: string; // ISO 8601 format
  clothingItemIds: string[];
}

// App data structure
export interface AppData {
  clothingItems: ClothingItem[];
  outfits: Outfit[];
  version: string;
}

// Statistics interfaces
export interface ClothingItemStats {
  item: ClothingItem;
  timesWorn: number;
  costPerWear: number | null;
  lastWornDate: string | null;
}

export interface GeneralStats {
  totalItems: number;
  totalCost: number;
  mostWornItems: ClothingItemStats[];
  leastWornItems: ClothingItemStats[];
}
