type DatabaseRecordID = number;

type ChatType = 'person' | 'group' | 'channel';
type ChatSummery = {
  id: DatabaseRecordID;
  type: ChatType;
  avatarURL?: string;
  title: string;
  lastMessageText: string;
  unreadMessagesCount: number;
};

type ChatFolder = {
  id: DatabaseRecordID;
  name: string;
  chatIds: DatabaseRecordID[];
};

interface BaseChatMessage {
  id: DatabaseRecordID;
  type: 'text' | 'image-text' | 'image';
  text?: string;
  imageUrl?: string;
  senderId: DatabaseRecordID;
  createdAt: number;
  outgoingState?: 'sending' | 'sent' | 'received' | 'seen';
}
