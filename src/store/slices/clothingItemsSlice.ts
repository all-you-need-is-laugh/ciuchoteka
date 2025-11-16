import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ClothingItem } from '../../types';
import { generateId } from '../../utils/storage';

interface ClothingItemsState {
  items: ClothingItem[];
}

const initialState: ClothingItemsState = {
  items: [],
};

const clothingItemsSlice = createSlice({
  name: 'clothingItems',
  initialState,
  reducers: {
    addClothingItem: (state, action: PayloadAction<Omit<ClothingItem, 'id' | 'dateAdded'>>) => {
      const newItem: ClothingItem = {
        ...action.payload,
        id: generateId(),
        dateAdded: new Date().toISOString(),
      };
      state.items.push(newItem);
    },
    updateClothingItem: (state, action: PayloadAction<{ id: string; updates: Partial<ClothingItem> }>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload.updates };
      }
    },
    deleteClothingItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    setClothingItems: (state, action: PayloadAction<ClothingItem[]>) => {
      state.items = action.payload;
    },
  },
});

export const {
  addClothingItem,
  updateClothingItem,
  deleteClothingItem,
  setClothingItems,
} = clothingItemsSlice.actions;

export default clothingItemsSlice.reducer;
