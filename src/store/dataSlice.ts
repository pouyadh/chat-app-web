// import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { DBDocId, IChannel, IContent, IGroupChat, IUser, UserPublicProfile } from 'api/types';
// import socket from 'api/socket';
// import { RootState } from './store';

// export interface IDataSliceState {
//   privateChats: Record<DBDocId, IUser['privateChats']>;
//   userProfiles: Record<DBDocId, UserPublicProfile>;
//   contents: Record<DBDocId, IContent>;
//   groupChats: Record<DBDocId, IGroupChat>;
//   channels: Record<DBDocId, IChannel>;
// }

// const initialState: IDataSliceState = {
//   privateChats: {},
//   userProfiles: {},
//   contents: {},
//   groupChats: {},
//   channels: {},
// };

// const dataSlice = createSlice({
//   name: 'data',
//   initialState,
//   reducers: {},
// });

// export default dataSlice;
