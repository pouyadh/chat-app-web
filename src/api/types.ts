export type DBDocId = string;
export type MessageStatus = 'sent' | 'delivered' | 'seen';

export type Folder = {
  id: DBDocId;
  name: string;
  chats: {
    type: 'user' | 'group' | 'channel';
    id: DBDocId;
  }[];
};

export interface IUser {
  _id: DBDocId;
  username: string;
  name: string;
  avatarUrl: string;
  email: string;
  password: string;
  refreshToken?: string;
  contacts: {
    name: string;
    user: DBDocId;
  }[];
  privateChats: {
    user: DBDocId;
    messages: IMessage[];
  }[];
  groupChats: DBDocId[];
  channels: DBDocId[];
  savedMessages: DBDocId[];
  lastSeen: Date;
  folders: Folder[];
  createdAt: string;
  updateAt: string;
}

export type UserPublicProfile = Pick<IUser, '_id' | 'username' | 'name' | 'avatarUrl'>;

export const GROUP_CHAT_ALL_PERMISSIONS = {
  // user
  joinGroup: 'Join group',
  leaveGroup: 'leave group',
  seeGroupInfo: 'See group info',
  seeGroupMembers: 'See group members',
  // member
  sendMessage: 'Send message',
  sendPhotos: 'Send photos',
  sendVideoFiles: 'Send video files',
  sendVideoMessages: 'Send video messages',
  sendMusic: 'Send music',
  sendVoiceMessage: 'Send voice message',
  sendFiles: 'Send files',
  addMembers: 'Add members',
  pinMessages: 'Pin messages',
  changeGroupInfo: 'Change group info',
  deleteOwnMessage: 'Delete own message',
  // admin
  deleteMessages: 'Delete Messages',
  banUsers: 'Ban users',
  inviteUsersViaLink: 'Invite users via link',
  manageVideoChats: 'Manage video chats',
  remainAnonymous: 'Remain anonymous',
  addNewAdmins: 'Add new admins',
  removeAdmins: 'Remove admins',
  kickMembers: 'Kick members',
  updateMemberPermissionOverrides: 'Update member permission overrides',
  // owner
  transferOwnership: 'Transfer Ownership',
  deleteGroup: 'Delete group',
} as const;

export type GroupChatAllPermissions = keyof typeof GROUP_CHAT_ALL_PERMISSIONS;
export type GroupChatAllPermissionObject = {
  [Key in GroupChatAllPermissions]: boolean;
};
export type GroupChatPartialPermissionObject = Partial<GroupChatAllPermissionObject>;
export type GroupChatRoles = 'owner' | 'admin' | 'member' | 'user' | 'guest';

export type GroupChatMessageContentItem = {
  type: 'message';
  data: {
    _id: DBDocId;
    sender: DBDocId;
    message: DBDocId;
    hiddenFor: DBDocId[];
  };
};
export type GroupChatActivityContentItem = {
  type: 'activity';
  data: {
    commiter: DBDocId;
    type: 'createGroupChat' | 'addSubscriber' | 'removeSubscriber';
    data: any;
  };
};

export type GroupChatContentItem = GroupChatActivityContentItem | GroupChatMessageContentItem;

export interface IGroupChat {
  info: {
    avatarUrl: string;
    name: string;
    description: string;
  };
  members: {
    role: GroupChatRoles;
    user: DBDocId;
    permissionOverrides: GroupChatPartialPermissionObject;
    customTitle?: string;
  }[];
  adminPermissions: GroupChatPartialPermissionObject;
  memberPermissions: GroupChatPartialPermissionObject;
  guestPermissions: GroupChatPartialPermissionObject;
  contents: GroupChatContentItem[];
  createdAt: string;
  updateAt: string;
}

export const CHANNEL_ALL_PERMISSIONS = {
  // user
  joinChannel: 'Join channel',
  leaveChannel: 'leave channel',
  seeChannelInfo: 'See channel info',
  seeChannelSubscribers: 'See channel subscribers',
  // subscriber
  seeMessages: 'See messages',
  // admin
  pinMessages: 'Pin messages',
  deleteOwnMessage: 'Delete own message',
  changeChannelInfo: 'Change channel info',
  postMessages: 'Post messages',
  editMessagesOfOthers: 'Edit messages of others',
  deleteMessagesOfOthers: 'Delete messages of others',
  addSubscribers: 'Add subscribers',
  manageLiveStreams: 'Manage live streams',
  addNewAdmins: 'Add new admins',
  removeSubscribers: 'Remove subscribers',
  removeAdmins: 'Remove admins',
  editOwnMessage: 'Edit own Message',

  // owner
  updateAdminsPermissions: 'Update admins permissions',
  transferOwnership: 'Transfer Ownership',
  deleteChannel: 'Delete channel',
} as const;

export type ChannelAllPermissions = keyof typeof CHANNEL_ALL_PERMISSIONS;
export type ChannelAllPermissionObject = {
  [Key in ChannelAllPermissions]: boolean;
};
export type ChannelPartialPermissionObject = Partial<ChannelAllPermissionObject>;
export type ChannelRoles = 'owner' | 'admin' | 'subscriber' | 'user' | 'guest';

export type ChannelMessageContentItem = {
  type: 'message';
  data: {
    _id: DBDocId;
    sender: DBDocId;
    message: DBDocId;
    hiddenFor: DBDocId[];
  };
};
export type ChannelActivityContentItem = {
  type: 'activity';
  data: {
    commiter: DBDocId;
    type: 'createChannel' | 'addSubscriber' | 'removeSubscriber';
    data: any;
  };
};

export type ChannelContentItem = ChannelActivityContentItem | ChannelMessageContentItem;

export interface IChannel {
  info: {
    avatarUrl: string;
    name: string;
    description: string;
  };
  subscribers: {
    role: ChannelRoles;
    user: DBDocId;
    permissionOverrides: ChannelPartialPermissionObject;
  }[];
  contents: ChannelContentItem[];
  guestPermissions: ChannelPartialPermissionObject;
  activities: string[];
  createdAt: string;
  updateAt: string;
}

export type IMessage = {
  _id: DBDocId;
  sender: DBDocId;
  status: MessageStatus;
  content: DBDocId;
  sentAt: string;
};
export type IMessagePopulated = IMessage & { content: IContent };

export interface IContent {
  _id: DBDocId;
  text: string;
  edited: boolean;
}
