type DatabaseRecordId = number;

type ChatMessageId = DatabaseRecordId;
type ProfileId = DatabaseRecordId;
type ChatId = DatabaseRecordId;
type MessageId = DatabaseRecordId;
type FolderId = DatabaseRecordId;

type ChatType = 'person' | 'group' | 'channel';
type OutgoingMessageStatus = 'sending' | 'sent' | 'received' | 'seen' | 'failed';

interface ChatMessage {
  id: MessageId;
  text: string;
  senderId: DatabaseRecordId;
  createdAt: number;
  outgoingStatus: OutgoingMessageStatus;
}

interface PublicProfile {
  id: ProfileId;
  name: string;
  avatarUrl: string;
  username: string;
}

interface OwnProfile extends PublicProfile {
  id: ProfileId;
  name: string;
  avatarUrl: string;
  username: string;
}

interface Chat {
  id: ChatId;
  type: ChatType;
  avatarUrl: string;
  title: string;
  messages: ChatMessage[];
  unreadMessagesCount: number;
}

interface ChatFolder {
  id: FolderId;
  name: string;
  chatIds: DatabaseRecordId[];
}
