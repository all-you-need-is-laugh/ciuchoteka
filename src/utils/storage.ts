import { AppData } from '../types';

const STORAGE_KEY = 'ciuchoteka_data';
const CURRENT_VERSION = '1.0.0';

/**
 * Gets the current localStorage usage percentage
 * @returns Percentage of localStorage used (0-100)
 */
export const getStorageUsage = (): number => {
  try {
    let totalSize = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        totalSize += localStorage[key].length + key.length;
      }
    }
    // Most browsers have ~5MB limit (5242880 bytes)
    const maxSize = 5242880;
    return (totalSize / maxSize) * 100;
  } catch (error) {
    console.error('Error calculating storage usage:', error);
    return 0;
  }
};

/**
 * Gets initial empty app data
 * @returns Initial AppData structure
 */
export const getInitialData = (): AppData => {
  return {
    clothingItems: [],
    outfits: [],
    version: CURRENT_VERSION,
  };
};

/**
 * Loads data from localStorage
 * @returns AppData from storage or initial data if not found
 */
export const loadFromStorage = (): AppData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return getInitialData();
    }
    const data = JSON.parse(stored) as AppData;
    // Future: Add migration logic here based on version
    return data;
  } catch (error) {
    console.error('Error loading from storage:', error);
    return getInitialData();
  }
};

/**
 * Saves data to localStorage
 * @param data - AppData to save
 */
export const saveToStorage = (data: AppData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to storage:', error);
    throw new Error('Failed to save data. Storage might be full.');
  }
};

/**
 * Exports data as JSON file
 * @param data - AppData to export
 */
export const exportData = (data: AppData): void => {
  try {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ciuchoteka-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error exporting data:', error);
    throw new Error('Failed to export data');
  }
};

/**
 * Imports data from JSON file
 * @param file - JSON file to import
 * @returns Promise with parsed AppData
 */
export const importData = (file: File): Promise<AppData> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string) as AppData;
        // Validate data structure
        if (!data.clothingItems || !data.outfits || !data.version) {
          throw new Error('Invalid data format');
        }
        resolve(data);
      } catch (error) {
        reject(new Error('Failed to parse import file'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};

/**
 * Clears all data from localStorage
 */
export const clearAllData = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing data:', error);
    throw new Error('Failed to clear data');
  }
};

/**
 * Generates a unique ID
 * @returns Unique identifier string
 */
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
