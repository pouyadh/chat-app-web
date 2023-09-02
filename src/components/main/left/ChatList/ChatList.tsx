import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import {
  Badge,
  ListItemAvatar,
  ListItemButton,
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
import { dispatch, useAppDispatch, useAppSelector } from 'store/store';
import { useChatList, useChatListItemData } from 'store/selector';
import { ChatListItem, ChatTypeAndId, reportMessageAsSeen, setActiveChat } from 'store/appSlice';

export default function ChatList() {
  const chatList = useChatList();
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  let deleteMenuText = 'Delete';
  if (open) {
    const chatType = anchorEl?.getAttribute('data-chat-type');
    if (chatType !== 'person') {
      deleteMenuText = `Leave ${chatType}`;
    }
  }
  const handleChatContextMenu = (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div
      style={{
        overflowY: 'scroll',
      }}
    >
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {chatList && chatList.map((chat) => <ChatItem key={chat.id} chat={chat} />)}
      </List>
      <Menu id="ChatContextMenu" anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleClose}>
          <OpenInNewOutlinedIcon />
          Open in new tab
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <FolderOutlinedIcon />
          Add to folder
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <MarkChatReadOutlinedIcon />
          Mark as read
        </MenuItem>
        <MenuItem onClick={handleClose} color="danger">
          <DeleteOutlinedIcon />
          {deleteMenuText}
        </MenuItem>
      </Menu>
    </div>
  );
}

function ChatItem(props: { chat: ChatListItem }) {
  const data = useChatListItemData(props.chat);

  if (data) {
    const { avatarUrl, title, subtitlePrefix, subtitle, time, badge } = data;
    return (
      <ListItemButton
        alignItems="flex-start"
        onClick={() => {
          dispatch(setActiveChat(props.chat));
        }}
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
