import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface IUISliceState {
  theme: 'dark' | 'light' | 'system';
  isContactListModalOpen: boolean;
  isAddContactModalOpen: boolean;
}

const initialState: IUISliceState = {
  theme: 'system',
  isContactListModalOpen: false,
  isAddContactModalOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<IUISliceState['theme']>) {
      state.theme = action.payload;
    },
    showContactListModal(state, action: PayloadAction<void>) {
      state.isContactListModalOpen = true;
    },
    hideContactListModal(state, action: PayloadAction<void>) {
      state.isContactListModalOpen = false;
    },
    showAddContactModal(state) {
      state.isAddContactModalOpen = true;
    },
    hideAddContactModal(state) {
      state.isAddContactModalOpen = false;
    },
  },
});

export default uiSlice;

export const {
  setTheme,
  showContactListModal,
  hideContactListModal,
  showAddContactModal,
  hideAddContactModal,
} = uiSlice.actions;
