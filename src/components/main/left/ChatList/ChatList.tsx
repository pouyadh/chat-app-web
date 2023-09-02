import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import {
  Badge,
  ListItemAvatar,
  ListItemButton,
  ListItemButtonProps,
  ListItemText,
  Menu,
  MenuItem,
  MenuProps,
  Stack,
} from '@mui/material';

import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import MarkChatReadOutlinedIcon from '@mui/icons-material/MarkChatReadOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useAppDispatch } from 'store/store';
import { useChatList, useChatListItemData } from 'store/selector';
import { ChatListItem, ChatTypeAndId, reportMessageAsSeen, setActiveChat } from 'store/appSlice';

export default function ChatList() {
  const chatList = useChatList();
  const [contextMenu, setContextMenu] = React.useState({
    anchorEl: null as HTMLElement | null,
    chat: { type: 'user', id: '' } as ChatTypeAndId,
  });

  const handleChatContextMenu: React.MouseEventHandler<HTMLElement> = (e) => {
    e.preventDefault();
    const anchorEl = e.currentTarget;
    const chat = {
      id: anchorEl?.getAttribute('data-chat-id'),
      type: anchorEl?.getAttribute('data-chat-type'),
    } as ChatTypeAndId;
    setContextMenu({
      anchorEl,
      chat,
    });
  };
  const handleClose = () => {
    setContextMenu((state) => ({
      ...state,
      anchorEl: null,
    }));
  };

  return (
    <div
      style={{
        overflowY: 'scroll',
      }}
    >
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {chatList &&
          chatList.map((chat) => (
            <ChatItem
              key={chat.id}
              chat={chat}
              onContextMenu={handleChatContextMenu}
              data-chat-type={chat.type}
              data-chat-id={chat.id}
            />
          ))}
      </List>
      <ChatContextMenu
        id="ChatContextMenu"
        open={!!contextMenu.anchorEl}
        anchorEl={contextMenu.anchorEl}
        chat={contextMenu.chat}
        onClose={handleClose}
        onItemSelect={handleClose}
      />
    </div>
  );
}

function ChatItem({ chat, ...props }: { chat: ChatListItem } & ListItemButtonProps) {
  const data = useChatListItemData(chat);
  const dispatch = useAppDispatch();

  if (data) {
    const { avatarUrl, title, subtitlePrefix, subtitle, time, badge } = data;
    return (
      <ListItemButton
        alignItems="flex-start"
        onClick={() => {
          dispatch(setActiveChat(chat));
        }}
        {...props}
      >
        <ListItemAvatar>
          <Avatar alt={title || ''} src={avatarUrl || ''} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Stack
              component="span"
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <span>{title || 'ㅤ'}</span>
              <Typography variant="caption" color="gray">
                {time || ''}
              </Typography>
            </Stack>
          }
          secondary={
            <Stack
              component="span"
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <span>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {subtitlePrefix || ''}
                </Typography>
                {subtitle || 'ㅤ'}
              </span>
              <Badge color="primary" badgeContent={badge} />
            </Stack>
          }
        />
      </ListItemButton>
    );
  } else {
    return null;
  }
}

function ChatContextMenu({
  chat,
  onItemSelect,
  ...props
}: MenuProps & { chat: ChatTypeAndId; onItemSelect?: () => any }) {
  let typeSpecificItems: React.ReactNode[] | null = null;
  const dispatch = useAppDispatch();

  switch (chat.type) {
    case 'user':
      typeSpecificItems = [
        <MenuItem key="delete chat">
          <DeleteOutlinedIcon /> Delete chat
        </MenuItem>,
      ];
      break;
    case 'group':
      typeSpecificItems = [
        <MenuItem key="delete group">
          <DeleteOutlinedIcon /> Delete group
        </MenuItem>,
      ];
      break;
    case 'channel':
      typeSpecificItems = [
        <MenuItem key="delete channel">
          <DeleteOutlinedIcon /> Delete channel
        </MenuItem>,
      ];
      break;
  }
  return (
    <Menu {...props}>
      <MenuItem>
        <OpenInNewOutlinedIcon /> Open in new tab
      </MenuItem>
      <MenuItem>
        <FolderOutlinedIcon /> Add to folder
      </MenuItem>
      <MenuItem
        onClick={() => {
          dispatch(
            reportMessageAsSeen({
              chat,
              messageId: '',
            })
          );
          onItemSelect?.();
        }}
      >
        <MarkChatReadOutlinedIcon /> Mark as read
      </MenuItem>
      {typeSpecificItems}
    </Menu>
  );
}
