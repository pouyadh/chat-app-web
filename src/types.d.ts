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

type MessageType = 'text' | 'image-text' | 'image';
type OutgoingState = 'sending' | 'sent' | 'received' | 'seen';
interface ChatMessage {
  id: DatabaseRecordID;
  type: MessageType;
  text?: string;
  imageUrl?: string;
  senderId: DatabaseRecordID;
  createdAt: number;
  outgoingState?: OutgoingState;
}
