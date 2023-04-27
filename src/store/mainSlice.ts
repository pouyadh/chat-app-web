import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from './store';
import InitialData from 'mock-data/InitialData.json';

interface InitialData {
  profile: OwnProfile;
  chats: Chat[];
  chatFolders: ChatFolder[];
  profiles: PublicProfile[];
  contactIds: DatabaseRecordId[];
}

export interface DataState {
  data: {
    profile: OwnProfile;
    chats: Chat[];
    chatFolders: ChatFolder[];
    profiles: PublicProfile[];
    contactIds: DatabaseRecordId[];
  } | null;
  status: 'idle' | 'loading' | 'failed' | 'initialized';
  selectedFolderId: number | null;
  selectedChatId: number | null;
}

const initialState: DataState = {
  data: null,
  status: 'idle',
  selectedFolderId: null,
  selectedChatId: null,
};

export const fetchInitialData = createAsyncThunk('main/fetchInitialData', async () => {
  return await new Promise<InitialData>((res) => {
    setTimeout(() => {
      res(InitialData as InitialData);
    }, 1000);
  });
});

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setSelectFolderId: (state, action: PayloadAction<FolderId | null>) => {
      state.selectedFolderId = action.payload;
    },
    setSelectedChatId: (state, action: PayloadAction<ChatId | null>) => {
      state.selectedChatId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInitialData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchInitialData.fulfilled, (state, action) => {
        state.status = 'initialized';
        state.data = action.payload;
      })
      .addCase(fetchInitialData.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setSelectFolderId, setSelectedChatId } = mainSlice.actions;

export default mainSlice.reducer;

export const selectChatFolders = (state: RootState) => state.main.data?.chatFolders;
export const selectChats = (state: RootState) => state.main.data?.chats;
export const selectContactIds = (state: RootState) => state.main.data?.contactIds;
export const selectOwnProfile = (state: RootState) => state.main.data?.profile;
export const selectProfiles = (state: RootState) => state.main.data?.profiles;
export const selectDataStatus = (state: RootState) => state.main.status;
export const selectSelectedFolderId = (state: RootState) => state.main.selectedFolderId;
