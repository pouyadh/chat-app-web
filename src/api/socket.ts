import { io } from 'socket.io-client';
import { ChatTypeAndId, clearUser, getUserData, setSocketStatus } from 'store/appSlice';
import { DBDocId, IContent, IMessage, IUser, UserPublicProfile } from './types';
import { dispatch } from 'store/store';
import { updateData, rpcActions } from 'store/appSlice';

const socket = io('ws://127.0.0.1:9090', {
  withCredentials: true,
  reconnection: true,
});

export function initSocket() {
  socket.io.on('open', async () => {
    dispatch(setSocketStatus('connected'));
    await dispatch(getUserData());
    await dispatch(updateData());
  });
  socket.io.on('close', (...args) => {
    dispatch(setSocketStatus('disconnected'));
  });

  socket.io.on('reconnect_attempt', (attempts) => {
    dispatch(setSocketStatus('connecting'));
  });

  socket.on('connect_error', (e) => {
    if ((e as any).description === 403) {
      dispatch(clearUser());
      socket.disconnect();
    }
  });
  socket.on('appAction', async ({ method, arg }, callback) => {
    console.log(method, arg);
    if (method in rpcActions) {
      const _method = method as keyof typeof rpcActions;
      const result = await dispatch(rpcActions[_method](arg));
      if (typeof callback === 'function') callback(result);
    } else {
      if (typeof callback === 'function') callback(null);
    }
  });
}

const socketRequest = <Data = any, Resp = any>(event: string, data: Data): Promise<Resp> =>
  new Promise((res, rej) => {
    const callback = (resp: Resp) => {
      if (resp && typeof resp === 'object' && 'error' in resp) {
        rej(resp);
      } else {
        res(resp);
      }
    };
    socket.emit(event, data, callback);
  });
const createSocketRequest =
  (eventPrefix: string) =>
  <Data = any, Resp = any>(event: string, data: Data): Promise<Resp> =>
    new Promise((res, rej) => {
      const callback = (resp: Resp) => res(resp);
      socket.emit(eventPrefix + event, data, callback);
    });

export default {
  socket,
  async getPublicProfiles(form: { userIds: DBDocId[] }): Promise<UserPublicProfile[]> {
    return await socketRequest('UserService', {
      method: 'getPublicProfilesById',
      arg: form,
    });
  },
  async addContact(form: { username: string; name?: string }) {
    return await socketRequest('UserService', {
      method: 'addContact',
      arg: form,
    });
  },
  async removeContact(form: { userId: string }) {
    return await socketRequest('UserService', {
      method: 'removeContact',
      arg: form,
    });
  },
  async getUserData(): Promise<IUser> {
    return await socketRequest('UserService', {
      method: 'getUserData',
    });
  },
  async sendPrivateMessage(form: {
    userId: string;
    text: string;
  }): Promise<{ userId: DBDocId; message: IMessage; content: IContent }> {
    return await socketRequest('UserService', {
      method: 'sendPrivateMessage',
      arg: form,
    });
  },
  async getContents(form: { contentIds: string[] }): Promise<IContent[]> {
    return await socketRequest('UserService', {
      method: 'getContents',
      arg: form,
    });
  },
  async markMessageAsSeen(form: { chat: ChatTypeAndId; messageId: DBDocId }) {
    return socketRequest('UserService', {
      method: 'markMessageAsSeen',
      arg: form,
    });
  },
  async createGroup(form: { title: string; avatarUrl: string; members: string[] }) {
    return socketRequest('group-chat/create-group', form);
  },

  groupChat(groupChatId: DBDocId) {
    return {
      base(ev: string, data: object) {
        return socketRequest('/group-chat' + ev, { groupChatId, ...data });
      },
      getPublicProfile() {
        return this.base('/get-public-profile', {});
      },
      deleteChat() {
        return this.base('/delete-chat', {});
      },
      getProfile() {
        return this.base('/get-profile', {});
      },
      addMember(form: { userId: string }) {
        return this.base('/add-member', form);
      },
      kickMember(form: { userId: string }) {
        return this.base('/kick-member', form);
      },
      updateAdmin(form: { memberUserId: string }) {
        return this.base('/update-admin', form);
      },
    };
  },
  groupChats(groupChatIds: DBDocId[]) {
    return {
      base(ev: string, data: object) {
        return socketRequest('GroupChatService' + ev, { groupChatIds, ...data });
      },
      get() {
        return this.base('', {
          method: 'get',
          payload: {},
        });
      },
      deleteChat() {
        return this.base('/delete-chat', {});
      },
      getProfile() {
        return this.base('/get-profile', {});
      },
      addMember(form: { userId: string }) {
        return this.base('/add-member', form);
      },
      kickMember(form: { userId: string }) {
        return this.base('/kick-member', form);
      },
      updateAdmin(form: { memberUserId: string }) {
        return this.base('/update-admin', form);
      },
    };
  },
} as const;

initSocket();
