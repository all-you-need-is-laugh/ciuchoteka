import { ClothingItem, ClothingItemStats, Outfit } from '../types';

/**
 * Calculates how many times a clothing item has been worn
 * @param itemId - The ID of the clothing item
 * @param outfits - Array of all outfits
 * @returns Number of times the item has been worn
 */
export const getTimesWorn = (itemId: string, outfits: Outfit[]): number => {
  return outfits.filter(outfit => outfit.clothingItemIds.includes(itemId)).length;
};

/**
 * Finds the last date when a clothing item was worn
 * @param itemId - The ID of the clothing item
 * @param outfits - Array of all outfits
 * @returns ISO 8601 date string or null if never worn
 */
export const getLastWornDate = (itemId: string, outfits: Outfit[]): string | null => {
  const outfitsWithItem = outfits
    .filter(outfit => outfit.clothingItemIds.includes(itemId))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return outfitsWithItem.length > 0 ? outfitsWithItem[0].date : null;
};

/**
 * Calculates statistics for a single clothing item
 * @param item - The clothing item
 * @param outfits - Array of all outfits
 * @returns Statistics for the item
 */
export const getItemStats = (item: ClothingItem, outfits: Outfit[]): ClothingItemStats => {
  const timesWorn = getTimesWorn(item.id, outfits);
  const costPerWear = item.cost && timesWorn > 0 ? item.cost / timesWorn : null;
  const lastWornDate = getLastWornDate(item.id, outfits);

  return {
    item,
    timesWorn,
    costPerWear,
    lastWornDate,
  };
};

/**
 * Calculates statistics for all clothing items
 * @param items - Array of all clothing items
 * @param outfits - Array of all outfits
 * @returns Array of statistics for all items
 */
export const getAllItemsStats = (
  items: ClothingItem[],
  outfits: Outfit[]
): ClothingItemStats[] => {
  return items.map(item => getItemStats(item, outfits));
};

/**
 * Gets the most worn items (top N)
 * @param items - Array of all clothing items
 * @param outfits - Array of all outfits
 * @param limit - Number of items to return (default: 5)
 * @returns Array of most worn items with stats
 */
export const getMostWornItems = (
  items: ClothingItem[],
  outfits: Outfit[],
  limit: number = 5
): ClothingItemStats[] => {
  const allStats = getAllItemsStats(items, outfits);
  return allStats
    .sort((a, b) => b.timesWorn - a.timesWorn)
    .slice(0, limit);
};

/**
 * Gets the least worn items (bottom N)
 * @param items - Array of all clothing items
 * @param outfits - Array of all outfits
 * @param limit - Number of items to return (default: 5)
 * @returns Array of least worn items with stats
 */
export const getLeastWornItems = (
  items: ClothingItem[],
  outfits: Outfit[],
  limit: number = 5
): ClothingItemStats[] => {
  const allStats = getAllItemsStats(items, outfits);
  return allStats
    .sort((a, b) => a.timesWorn - b.timesWorn)
    .slice(0, limit);
};

/**
 * Calculates total wardrobe cost
 * @param items - Array of all clothing items
 * @returns Total cost of all items with defined cost
 */
export const getTotalCost = (items: ClothingItem[]): number => {
  return items.reduce((sum, item) => sum + (item.cost || 0), 0);
};
