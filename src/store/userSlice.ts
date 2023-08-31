// import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { IUser, UserPublicProfile } from 'api/types';
// import req from 'api/http';
// import { FirstArgumentOf } from 'utils/types';
// import socket from 'api/socket';

// export type UserSliceState = {
//   data: IUser | null;
//   socket: {
//     status: 'connected' | 'disconnected' | 'connecting';
//   };
//   selectedFolderId: string;
//   usersPublicProfiles: UserPublicProfile[];
// };

// const initialState: UserSliceState = {
//   data: null,
//   socket: {
//     status: 'disconnected',
//   },
//   usersPublicProfiles: [],
//   selectedFolderId: '',
// };
// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     setSocketStatus: (state, action: PayloadAction<UserSliceState['socket']['status']>) => {
//       state.socket.status = action.payload;
//     },
//     clearUser(state, action: PayloadAction<void>) {
//       state.data = null;
//     },
//     setSelectedFolderId(state, action: PayloadAction<string>) {
//       state.selectedFolderId = action.payload;
//     },
//   },
//   extraReducers(builder) {
//     builder
//       .addCase(getUserData.fulfilled, (state, action) => {
//         state.data = action.payload;
//       })
//       .addCase(addContact.fulfilled, (state, action) => {
//         state.data?.contacts.push(action.payload);
//       })
//       .addCase(removeContact.fulfilled, (state, action) => {
//         if (state.data?.contacts) {
//           state.data.contacts = state.data.contacts.filter((c) => c !== action.payload);
//         }
//       });
//   },
// });

// export default userSlice;
// export const { setSocketStatus, clearUser, setSelectedFolderId } = userSlice.actions;

// const userReq = req.server.user;

// export const signup = createAsyncThunk(
//   'user/signup',
//   async (arg: FirstArgumentOf<typeof userReq.signup>, { dispatch }) => {
//     await userReq.signup(arg);
//     await userReq.signin({ username: arg.username, password: arg.password });
//     socket.socket.connect();
//   }
// );

// export const signin = createAsyncThunk(
//   'user/signin',
//   async (arg: FirstArgumentOf<typeof userReq.signin>, { dispatch }) => {
//     await userReq.signin(arg);
//     dispatch(setSocketStatus('connecting'));
//     socket.socket.connect();
//   }
// );
// export const signout = createAsyncThunk('user/signout', async (_, { dispatch }) => {
//   await userReq.signout();
//   socket.socket.disconnect();
//   dispatch(clearUser());
// });
// export const forgotPassword = createAsyncThunk(
//   'user/forgot-password',
//   userReq.sendResetPasswordLinkToUserEmail.bind(userReq)
// );
// export const resetPassword = createAsyncThunk(
//   'user/reset-password',
//   userReq.resetPassword.bind(userReq)
// );
// export const deleteAccount = createAsyncThunk(
//   'user/deleteAccount',
//   userReq.deleteAccount.bind(userReq)
// );
// //export const getUserData = createAsyncThunk('user/getData', userReq.getData.bind(userReq));
// export const getUserData = createAsyncThunk('user/getData', socket.getUserData);
// export const getToken = createAsyncThunk('user/getToken', userReq.getToken.bind(userReq));
// export const updateCredentials = createAsyncThunk(
//   'user/update-credentials',
//   userReq.updateCredentials.bind(userReq)
// );
// export const updateProfile = createAsyncThunk(
//   'user/update-profile',
//   userReq.updateProfile.bind(userReq)
// );
// export const updatePublicProfiles = createAsyncThunk(
//   'user/update-public-profiles',
//   userReq.getPublicProfiles.bind(userReq)
// );

// export const addContact = createAsyncThunk(
//   'user/add-contact',
//   (arg: FirstArgumentOf<typeof socket.addContact>, thunkApi) => {
//     return socket.addContact(arg).catch(thunkApi.rejectWithValue);
//   }
// );

// export const removeContact = createAsyncThunk(
//   'user/remove-contact',
//   (arg: FirstArgumentOf<typeof socket.removeContact>, thunkApi) => {
//     return socket.removeContact(arg).catch(thunkApi.rejectWithValue);
//   }
// );
