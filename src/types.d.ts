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

type OutgoingMessageStatus =
  | 'sending'
  | 'sent'
  | 'received'
  | 'seen'
  | 'failed';

interface ChatMessage {
  id: DatabaseRecordID;
  text: string;
  senderId: DatabaseRecordID;
  createdAt: number;
  outgoingStatus: OutgoingMessageStatus;
}
