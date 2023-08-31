import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { userApi } from 'api/userApi';
import { logger } from 'redux-logger';
//import userSlice from './userSlice';
import uiSlice from './uiSlice';
import appSlice from './appSlice';
//import dataSlice from './dataSlice';

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    //user: userSlice.reducer,
    ui: uiSlice.reducer,
    app: appSlice.reducer,
    //data: dataSlice.reducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(userApi.middleware).concat(logger);
  },
});

export const dispatch = store.dispatch;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type DefaultThunkAPIConfig = {
  state: RootState;
};
