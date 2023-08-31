import { createSelector } from '@reduxjs/toolkit';
import { RootState, store, useAppSelector } from './store';
import { ChatTypeAndId } from './appSlice';
import { DBDocId } from 'api/types';
import { useMemo } from 'react';

export const useUserData = () => useAppSelector((state) => state.app.data.user);
export const useFolders = () => useAppSelector((state) => state.app.data.user?.folders || []);
export const useSelectedFolderId = () => useAppSelector((state) => state.app.selectedFolderId);

export const useSocketStatus = () => useAppSelector((state) => state.app.socketStatus);
export const useSelectedTheme = () => useAppSelector((state) => state.ui.theme);
export const useIsContactListModalOpen = () =>
  useAppSelector((state) => state.ui.isContactListModalOpen);

export const useIsAddContactModalOpen = () =>
  useAppSelector((state) => state.ui.isAddContactModalOpen);

export const useContacts = () =>
  useAppSelector((state) => {
    const contacts = state.app.data.user?.contacts;
    if (!contacts) return [];
    return contacts.map((c) => {
      const userProfile = state.app.data.userProfileMap[c.user];
      if (!userProfile)
        return {
          _id: c.user,
          name: c.name,
          avatarUrl: '',
          username: '',
          loading: true,
        };
      const contact = { ...userProfile };
      if (c.name) contact.name = c.name;
      return contact;
    });
  });

export const useActiveChat = () => useAppSelector((state) => state.app.activeChat);

export const useActiveChatData = () =>
  useAppSelector(
    (state) => {
      const activeChat = state.app.activeChat;
      if (!activeChat) return null;
      switch (activeChat.type) {
        case 'user':
          const pv = state.app.data.user?.privateChats.find((pv) => pv.user === activeChat.id);
          const user = state.app.data.userProfileMap[activeChat.id];
          if (!user) return { loading: true };
          return {
            type: activeChat.type,
            title: user.name,
            avatarUrl: user.avatarUrl,
            messages: pv?.messages || [],
          };
        case 'group':
          return null;
        case 'channel':
          return null;
        default:
          return null;
      }
    },
    (a, b) => a?.title === b?.title && a?.messages === b?.messages && a?.avatarUrl === b?.avatarUrl
  );

export const useChatData = (chat: ChatTypeAndId | null) =>
  useAppSelector((state) => {
    if (!chat) return null;
    switch (chat.type) {
      case 'user':
        return state.app.data.user?.privateChats.find((pv) => pv.user === chat.id);
      case 'group':
        return null;
      case 'channel':
        return null;
    }
  });

export const useUserPublicProfile = (userId: DBDocId) =>
  useAppSelector((state) => state.app.data.userProfileMap[userId]);

export const useContent = (contentId: DBDocId) =>
  useAppSelector((state) => state.app.data.contentMap[contentId]);

export const useMessageInput = () => useAppSelector((state) => state.app.messageInput);

export const useChatList = () => useAppSelector((state) => state.app.chatList);

export const useMessageContent = (contentId: string) =>
  useAppSelector((state) => state.app.data.contentMap[contentId]);

export const useChatListItemData = (chat: ChatTypeAndId) =>
  useAppSelector((state) => {
    if (!chat) return null;
    switch (chat.type) {
      case 'user':
        const chatData = state.app.data.user?.privateChats.find((pv) => pv.user === chat.id);
        if (!chatData) return null;
        const userProfile = state.app.data.userProfileMap[chatData.user];
        const lastMessage = chatData.messages.at(-1);
        const lastMessageTime = lastMessage?.sentAt;
        const lastMessageTimeText = useMemo(() => {
          if (lastMessageTime) {
            const d = new Date(lastMessageTime);
            return `${d.getHours()}:${d.getMinutes()}`;
          } else {
            return '';
          }
        }, [lastMessageTime]);
        const lastMessageContentText =
          state.app.data.contentMap[lastMessage?.content || '']?.text || '';
        return {
          avatarUrl: userProfile?.avatarUrl,
          title: userProfile?.name,
          time: lastMessageTimeText,
          subtitle: lastMessageContentText,
          subtitlePrefix: '',
        };
      case 'group':
        return {};
      case 'channel':
        return {};
    }
  });
