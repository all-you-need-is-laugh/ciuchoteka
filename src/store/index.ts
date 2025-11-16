import { configureStore, Middleware } from '@reduxjs/toolkit';
import { AppData } from '../types';
import { getStorageUsage, loadFromStorage, saveToStorage } from '../utils/storage';
import appReducer, { clearAllData as clearAllDataAction, loadAppData, setStorageUsage } from './slices/appSlice';
import clothingItemsReducer, { deleteClothingItem, setClothingItems } from './slices/clothingItemsSlice';
import outfitsReducer, { removeItemFromOutfits, setOutfits } from './slices/outfitsSlice';

// Middleware to persist state to localStorage
const persistMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  
  // Skip saving during initial load
  if (loadAppData.match(action)) {
    return result;
  }

  // Get current state after action
  const state = store.getState();
  
  // Save to localStorage
  const appData: AppData = {
    clothingItems: state.clothingItems.items,
    outfits: state.outfits.items,
    version: '1.0.0',
  };
  
  saveToStorage(appData);
  
  // Update storage usage
  const storageUsage = getStorageUsage();
  store.dispatch(setStorageUsage(storageUsage));
  
  return result;
};

// Middleware to handle deleteClothingItem and remove from outfits
const deleteItemMiddleware: Middleware = (store) => (next) => (action) => {
  if (deleteClothingItem.match(action)) {
    const itemId = action.payload;
    // First dispatch the delete action
    const result = next(action);
    // Then remove from all outfits
    store.dispatch(removeItemFromOutfits(itemId));
    return result;
  }
  return next(action);
};

// Middleware to handle clearAllData
const clearDataMiddleware: Middleware = (store) => (next) => (action) => {
  if (clearAllDataAction.match(action)) {
    // Clear localStorage
    localStorage.removeItem('ciuchoteka-data');
    // Reset all slices
    store.dispatch(setClothingItems([]));
    store.dispatch(setOutfits([]));
    store.dispatch(setStorageUsage(0));
    return next(action);
  }
  return next(action);
};

// Middleware to handle loadAppData
const loadDataMiddleware: Middleware = (store) => (next) => (action) => {
  if (loadAppData.match(action)) {
    const data = action.payload;
    store.dispatch(setClothingItems(data.clothingItems));
    store.dispatch(setOutfits(data.outfits));
    const storageUsage = getStorageUsage();
    store.dispatch(setStorageUsage(storageUsage));
    return next(action);
  }
  return next(action);
};

export const store = configureStore({
  reducer: {
    app: appReducer,
    clothingItems: clothingItemsReducer,
    outfits: outfitsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [loadAppData.type],
      },
    }).concat(
      loadDataMiddleware,
      deleteItemMiddleware,
      clearDataMiddleware,
      persistMiddleware
    ),
});

// Initialize store with data from localStorage
const initialData = loadFromStorage();
store.dispatch(loadAppData(initialData));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
