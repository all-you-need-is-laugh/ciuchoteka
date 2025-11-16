import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppData } from '../../types';
import { exportData as exportDataUtil, importData as importDataUtil } from '../../utils/storage';

interface AppState {
  isLoading: boolean;
  storageUsage: number;
}

const initialState: AppState = {
  isLoading: true,
  storageUsage: 0,
};

// Async thunks for data management
export const exportData = createAsyncThunk(
  'app/exportData',
  async (_, { getState }) => {
    const state = getState() as any;
    const data: AppData = {
      clothingItems: state.clothingItems.items,
      outfits: state.outfits.items,
      version: '1.0.0',
    };
    exportDataUtil(data);
  }
);

export const importData = createAsyncThunk(
  'app/importData',
  async (file: File) => {
    const data = await importDataUtil(file);
    return data;
  }
);

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setStorageUsage: (state, action: PayloadAction<number>) => {
      state.storageUsage = action.payload;
    },
    loadAppData: (state, _action: PayloadAction<AppData>) => {
      // This action will be handled by middleware
      state.isLoading = false;
    },
    clearAllData: (_state) => {
      // This action will be handled by middleware
    },
  },
});

export const {
  setLoading,
  setStorageUsage,
  loadAppData,
  clearAllData,
} = appSlice.actions;

export default appSlice.reducer;
