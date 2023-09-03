import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  DBDocId,
  IContent,
  IMessage,
  IMessagePopulated,
  IUser,
  UserPublicProfile,
} from 'api/types';
import { RootState, dispatch } from './store';
import socket from 'api/socket';
import { FirstArgumentOf } from 'utils/types';
import req from 'api/http';

export interface ChatTypeAndId {
  type: 'user' | 'group' | 'channel';
  id: string;
}

export interface ChatListItem {
  type: 'user' | 'group' | 'channel';
  id: string;
}

export interface IAppSlice {
  data: {
    user: IUser | null;
    userProfileMap: Record<DBDocId, UserPublicProfile>;
    contentMap: Record<DBDocId, IContent>;
  };
  socketStatus: 'connected' | 'disconnected' | 'connecting';
  selectedFolderId: string;
  chatList: ChatListItem[];
  activeChat: null | ChatTypeAndId;
  messageInput: {
    text: string;
    isEmojiPickerOpen: boolean;
  };
}

const initialState: IAppSlice = {
  data: {
    user: null,
    userProfileMap: {},
    contentMap: {},
  },
  socketStatus: 'disconnected',
  selectedFolderId: '',
  chatList: [],
  activeChat: null,
  messageInput: {
    text: '',
    isEmojiPickerOpen: false,
  },
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setChatList(state, action: PayloadAction<ChatListItem[]>) {
      state.chatList = action.payload;
    },
    addChatToList(state, action: PayloadAction<ChatListItem>) {
      state.chatList.unshift(action.payload);
    },
    removeChatFromList(state, action: PayloadAction<DBDocId>) {
      state.chatList = state.chatList.filter((chat) => chat.id !== action.payload);
    },
    moveChatToTop(state, action: PayloadAction<DBDocId>) {
      const idx = state.chatList.findIndex((chat) => chat.id === action.payload);
      const chat = state.chatList.splice(idx, 1)[0];
      state.chatList.unshift(chat);
    },
    setSelectedFolderId(state, action: PayloadAction<DBDocId>) {
      state.selectedFolderId = action.payload;
    },
    setActiveChat(state, action: PayloadAction<IAppSlice['activeChat']>) {
      state.activeChat = action.payload;
    },
    setMessageInputText(state, action: PayloadAction<string>) {
      state.messageInput.text = action.payload;
    },
    setIsEmojiPickerOpen(state, action: PayloadAction<boolean>) {
      state.messageInput.isEmojiPickerOpen = action.payload;
    },
    setSocketStatus: (state, action: PayloadAction<IAppSlice['socketStatus']>) => {
      state.socketStatus = action.payload;
    },
    clearUser(state, action: PayloadAction<void>) {
      state.data.user = null;
    },
    addMessageToPrivateChat(
      state,
      action: PayloadAction<{ userId: DBDocId; message: IMessage; content: IContent }>
    ) {
      state.data.contentMap[action.payload.content._id] = action.payload.content;
      const pvs = state.data.user?.privateChats;
      if (pvs) {
        const pv = pvs.find((pv) => pv.user === action.payload.userId);
        if (pv) {
          pv.messages.push(action.payload.message);
        } else {
          pvs.push({
            user: action.payload.userId,
            messages: [action.payload.message],
          });
        }
      }
    },
    markMessageAsSeen(
      state,
      action: PayloadAction<{
        chat: ChatTypeAndId;
        messageId: DBDocId;
        sender?: 'own' | 'except-own' | 'all';
      }>
    ) {
      const user = state.data.user;
      if (!user) return;
      const { type: chatType, id: chatId } = action.payload.chat;
      const { messageId } = action.payload;
      const shouldMarkFns = {
        own: (senderId: DBDocId) => senderId === user._id,
        'except-own': (senderId: DBDocId) => senderId !== user._id,
        all: (senderId: DBDocId) => true,
      };
      let shouldMarkFn = shouldMarkFns[action.payload.sender ? action.payload.sender : 'own'];
      switch (chatType) {
        case 'user':
          const pv = user.privateChats.find((pv) => pv.user === chatId);
          if (pv) {
            let msgIdx = pv.messages.length - 1;
            if (messageId) {
              msgIdx = pv.messages.findIndex((msg) => msg._id === messageId);
            }
            while (msgIdx >= 0 && pv.messages[msgIdx].status !== 'seen') {
              if (shouldMarkFn(pv.messages[msgIdx].sender)) {
                pv.messages[msgIdx].status = 'seen';
              }
              msgIdx--;
            }
          }
          break;
        case 'group':
          break;
        case 'channel':
          break;
      }
    },

    markMessageAsDelivered(
      state,
      action: PayloadAction<{
        chat: ChatTypeAndId;
        messageId: DBDocId;
        sender?: 'own' | 'except-own' | 'all';
      }>
    ) {
      const user = state.data.user;
      if (!user) return;
      const { type: chatType, id: chatId } = action.payload.chat;
      const { messageId } = action.payload;
      const shouldMarkFns = {
        own: (senderId: DBDocId) => senderId === user._id,
        'except-own': (senderId: DBDocId) => senderId !== user._id,
        all: (senderId: DBDocId) => true,
      };
      let shouldMarkFn = shouldMarkFns[action.payload.sender ? action.payload.sender : 'own'];
      switch (chatType) {
        case 'user':
          const pv = user.privateChats.find((pv) => pv.user === chatId);
          if (pv) {
            let msgIdx = pv.messages.length - 1;
            if (messageId) {
              msgIdx = pv.messages.findIndex((msg) => msg._id === messageId);
            }

            while (msgIdx >= 0 && pv.messages[msgIdx].status === 'sent') {
              if (shouldMarkFn(pv.messages[msgIdx].sender)) {
                pv.messages[msgIdx].status = 'delivered';
              }
              msgIdx--;
            }
          }
          break;
        case 'group':
          break;
        case 'channel':
          break;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserData.fulfilled, (state, action) => {
        state.data.user = action.payload;
        state.chatList = [];
        if (action.payload.privateChats) {
          state.chatList.push(
            ...action.payload.privateChats.map(
              (pv) => ({ type: 'user', id: pv.user } as ChatListItem)
            )
          );
          console.log(action.payload.privateChats);
        }
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.data.user?.contacts.push(action.payload);
      })
      .addCase(removeContact.fulfilled, (state, action) => {
        if (state.data.user?.contacts) {
          state.data.user.contacts = state.data.user.contacts.filter((c) => c !== action.payload);
        }
      })
      .addCase(updateData.fulfilled, (state, action) => {
        action.payload.publicProfiles.forEach((p) => {
          state.data.userProfileMap[p._id] = p;
        });
        action.payload.contents.forEach((c) => {
          state.data.contentMap[c._id] = c;
        });
      });
  },
});

export const {
  setSelectedFolderId,
  setChatList,
  addChatToList,
  removeChatFromList,
  setActiveChat,
  setMessageInputText,
  setIsEmojiPickerOpen,
  setSocketStatus,
  clearUser,
  addMessageToPrivateChat,
  markMessageAsSeen,
  markMessageAsDelivered,
} = appSlice.actions;

export default appSlice;

const userReq = req.server.user;

export const signup = createAsyncThunk(
  'user/signup',
  async (arg: FirstArgumentOf<typeof userReq.signup>, { dispatch }) => {
    await userReq.signup(arg);
    await userReq.signin({ username: arg.username, password: arg.password });
    socket.socket.connect();
  }
);

export const signin = createAsyncThunk(
  'user/signin',
  async (arg: FirstArgumentOf<typeof userReq.signin>, { dispatch }) => {
    await userReq.signin(arg);
    dispatch(setSocketStatus('connecting'));
    socket.socket.connect();
  }
);
export const signout = createAsyncThunk('user/signout', async (_, { dispatch }) => {
  socket.socket.disconnect();
  dispatch(clearUser());
  await userReq.signout();
});
export const forgotPassword = createAsyncThunk(
  'user/forgot-password',
  userReq.sendResetPasswordLinkToUserEmail.bind(userReq)
);
export const resetPassword = createAsyncThunk(
  'user/reset-password',
  userReq.resetPassword.bind(userReq)
);
export const deleteAccount = createAsyncThunk(
  'user/deleteAccount',
  userReq.deleteAccount.bind(userReq)
);
//export const getUserData = createAsyncThunk('user/getData', userReq.getData.bind(userReq));
export const getUserData = createAsyncThunk('user/getData', socket.getUserData);
export const getToken = createAsyncThunk('user/getToken', userReq.getToken.bind(userReq));
export const updateCredentials = createAsyncThunk(
  'user/update-credentials',
  userReq.updateCredentials.bind(userReq)
);
export const updateProfile = createAsyncThunk(
  'user/update-profile',
  userReq.updateProfile.bind(userReq)
);
export const updatePublicProfiles = createAsyncThunk(
  'user/update-public-profiles',
  userReq.getPublicProfiles.bind(userReq)
);

export const addContact = createAsyncThunk(
  'user/add-contact',
  (arg: FirstArgumentOf<typeof socket.addContact>, thunkApi) => {
    return socket.addContact(arg).catch(thunkApi.rejectWithValue);
  }
);

export const removeContact = createAsyncThunk(
  'user/remove-contact',
  (arg: FirstArgumentOf<typeof socket.removeContact>, thunkApi) => {
    return socket.removeContact(arg).catch(thunkApi.rejectWithValue);
  }
);

export const updateData = createAsyncThunk('data/update-data', async (_, thunkApi) => {
  const state = thunkApi.getState() as RootState;
  if (!state.app.data.user) throw new Error();
  const userIdsToGetTheirProfiles = new Set([
    ...state.app.data.user.contacts.map((c) => c.user),
    ...state.app.data.user.privateChats.map((pv) => pv.user),
  ]);
  let publicProfiles = [] as UserPublicProfile[];
  if (userIdsToGetTheirProfiles.size > 0) {
    publicProfiles = await socket.getPublicProfiles({
      userIds: [...userIdsToGetTheirProfiles],
    });
  }
  const contentIdsToGetTheirContents = new Set([
    ...state.app.data.user.privateChats
      .map((pv) => pv.messages.map((msg) => msg.content))
      .reduce((all, cIds) => all.concat(cIds), []),
  ]);
  let contents = [] as IContent[];
  if (contentIdsToGetTheirContents.size > 0) {
    contents = await socket.getContents({
      contentIds: [...contentIdsToGetTheirContents],
    });
  }
  return {
    publicProfiles,
    contents,
  };
});

export const sendMessage = createAsyncThunk('chat/send-message', async (_, thunkApi) => {
  const state = thunkApi.getState() as RootState;
  if (!state.app.activeChat || !state.app.messageInput.text) throw new Error();
  const { type, id } = state.app.activeChat;
  switch (type) {
    case 'user':
      const resp = await socket
        .sendPrivateMessage({ userId: id, text: state.app.messageInput.text })
        .catch(console.log);
      if (resp) dispatch(addMessageToPrivateChat(resp));
      return resp;
    case 'group':
      break;
    case 'channel':
      break;
  }
});

export const reportMessageAsSeen = createAsyncThunk(
  'chat/mark-message-as-seen',
  async ({ chat, messageId }: { chat: ChatTypeAndId; messageId: DBDocId }, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    await socket.markMessageAsSeen({ chat, messageId });
    thunkApi.dispatch(markMessageAsSeen({ chat, messageId, sender: 'except-own' }));
    return { chat, messageId };
  }
);

export const rpcActions = {
  addMessageToPrivateChat,
  markMessageAsSeen,
  markMessageAsDelivered,
};
