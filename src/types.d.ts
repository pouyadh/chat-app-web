type ChatType = 'person' | 'group' | 'channel';
type ChatID = number;
type ChatSummery = {
  id: ChatID;
  type: ChatType;
  avatarURL?: string;
  title: string;
  lastMessageText: string;
  unreadMessagesCount: number;
};
