import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Outfit } from '../../types';
import { generateId } from '../../utils/storage';

interface OutfitsState {
  items: Outfit[];
}

const initialState: OutfitsState = {
  items: [],
};

const outfitsSlice = createSlice({
  name: 'outfits',
  initialState,
  reducers: {
    addOutfit: (state, action: PayloadAction<Omit<Outfit, 'id'>>) => {
      const newOutfit: Outfit = {
        ...action.payload,
        id: generateId(),
      };
      state.items.push(newOutfit);
    },
    updateOutfit: (state, action: PayloadAction<{ id: string; updates: Partial<Outfit> }>) => {
      const index = state.items.findIndex(outfit => outfit.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload.updates };
      }
    },
    deleteOutfit: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(outfit => outfit.id !== action.payload);
    },
    removeItemFromOutfits: (state, action: PayloadAction<string>) => {
      // Remove a clothing item from all outfits
      state.items = state.items.map(outfit => ({
        ...outfit,
        clothingItemIds: outfit.clothingItemIds.filter(itemId => itemId !== action.payload),
      }));
    },
    setOutfits: (state, action: PayloadAction<Outfit[]>) => {
      state.items = action.payload;
    },
  },
});

export const {
  addOutfit,
  updateOutfit,
  deleteOutfit,
  removeItemFromOutfits,
  setOutfits,
} = outfitsSlice.actions;

export default outfitsSlice.reducer;
