import { useCallback, useEffect, useMemo, useState } from 'react';
import { AppData, ClothingItem, ClothingItemStats, GeneralStats, Outfit } from '../types';
import {
    getItemStats,
    getLeastWornItems,
    getMostWornItems,
    getTotalCost,
} from '../utils/statistics';
import {
    clearAllData,
    exportData,
    generateId,
    getInitialData,
    getStorageUsage,
    importData,
    loadFromStorage,
    saveToStorage,
} from '../utils/storage';

/**
 * Main hook for managing app data
 */
export const useAppData = () => {
  const [data, setData] = useState<AppData>(getInitialData);
  const [isLoading, setIsLoading] = useState(true);

  // Load data on mount
  useEffect(() => {
    const loadedData = loadFromStorage();
    setData(loadedData);
    setIsLoading(false);
  }, []);

  // Save data whenever it changes
  useEffect(() => {
    if (!isLoading) {
      saveToStorage(data);
    }
  }, [data, isLoading]);

  // Check storage usage
  const storageUsage = useMemo(() => getStorageUsage(), [data]);

  // Clothing Items operations
  const addClothingItem = useCallback((item: Omit<ClothingItem, 'id' | 'dateAdded'>) => {
    const newItem: ClothingItem = {
      ...item,
      id: generateId(),
      dateAdded: new Date().toISOString(),
    };
    setData(prev => ({
      ...prev,
      clothingItems: [...prev.clothingItems, newItem],
    }));
    return newItem;
  }, []);

  const updateClothingItem = useCallback((id: string, updates: Partial<ClothingItem>) => {
    setData(prev => ({
      ...prev,
      clothingItems: prev.clothingItems.map(item =>
        item.id === id ? { ...item, ...updates } : item
      ),
    }));
  }, []);

  const deleteClothingItem = useCallback((id: string) => {
    setData(prev => ({
      ...prev,
      clothingItems: prev.clothingItems.filter(item => item.id !== id),
      // Remove item from all outfits
      outfits: prev.outfits.map(outfit => ({
        ...outfit,
        clothingItemIds: outfit.clothingItemIds.filter(itemId => itemId !== id),
      })),
    }));
  }, []);

  // Outfit operations
  const addOutfit = useCallback((outfit: Omit<Outfit, 'id'>) => {
    const newOutfit: Outfit = {
      ...outfit,
      id: generateId(),
    };
    setData(prev => ({
      ...prev,
      outfits: [...prev.outfits, newOutfit],
    }));
    return newOutfit;
  }, []);

  const updateOutfit = useCallback((id: string, updates: Partial<Outfit>) => {
    setData(prev => ({
      ...prev,
      outfits: prev.outfits.map(outfit =>
        outfit.id === id ? { ...outfit, ...updates } : outfit
      ),
    }));
  }, []);

  const deleteOutfit = useCallback((id: string) => {
    setData(prev => ({
      ...prev,
      outfits: prev.outfits.filter(outfit => outfit.id !== id),
    }));
  }, []);

  // Data management operations
  const handleExport = useCallback(() => {
    exportData(data);
  }, [data]);

  const handleImport = useCallback(async (file: File) => {
    try {
      const importedData = await importData(file);
      setData(importedData);
    } catch (error) {
      throw error;
    }
  }, []);

  const handleClearAll = useCallback(() => {
    clearAllData();
    setData(getInitialData());
  }, []);

  return {
    data,
    isLoading,
    storageUsage,
    // Clothing items
    clothingItems: data.clothingItems,
    addClothingItem,
    updateClothingItem,
    deleteClothingItem,
    // Outfits
    outfits: data.outfits,
    addOutfit,
    updateOutfit,
    deleteOutfit,
    // Data management
    exportData: handleExport,
    importData: handleImport,
    clearAllData: handleClearAll,
  };
};

/**
 * Hook for getting statistics for a single clothing item
 */
export const useItemStats = (itemId: string, outfits: Outfit[]): ClothingItemStats | null => {
  return useMemo(() => {
    // This will be used in components where we already have the item
    return null; // Placeholder - will be called with item directly
  }, [itemId, outfits]);
};

/**
 * Hook for calculating general statistics
 */
export const useGeneralStats = (clothingItems: ClothingItem[], outfits: Outfit[]): GeneralStats => {
  return useMemo(() => {
    return {
      totalItems: clothingItems.length,
      totalCost: getTotalCost(clothingItems),
      mostWornItems: getMostWornItems(clothingItems, outfits, 5),
      leastWornItems: getLeastWornItems(clothingItems, outfits, 5),
    };
  }, [clothingItems, outfits]);
};

/**
 * Hook for getting stats for a specific clothing item
 */
export const useClothingItemStats = (
  item: ClothingItem,
  outfits: Outfit[]
): ClothingItemStats => {
  return useMemo(() => {
    return getItemStats(item, outfits);
  }, [item, outfits]);
};
