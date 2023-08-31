import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import {
  Badge,
  Divider,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
} from '@mui/material';

import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import MarkChatReadOutlinedIcon from '@mui/icons-material/MarkChatReadOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { dispatch, useAppDispatch, useAppSelector } from 'store/store';
import {
  useChatData,
  useChatList,
  useChatListItemData,
  useMessageContent,
  useUserPublicProfile,
} from 'store/selector';
import { ChatListItem, setActiveChat } from 'store/appSlice';

export default function ChatList() {
  const chatList = useChatList();
  // const chats = useAppSelector(selectChats);
  // const chatFolders = useAppSelector(selectChatFolders);
  // const selectedFolderId = useAppSelector(selectSelectedFolderId);

  // const filteredChats = React.useMemo(() => {
  //   if (selectedFolderId && chatFolders?.length) {
  //     const folder = chatFolders.find((f) => f.id === selectedFolderId);
  //     return chats?.filter((chat) => folder?.chatIds.includes(chat.id));
  //   } else {
  //     return chats;
  //   }
  // }, [chats, chatFolders, selectedFolderId]);

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
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <span>{title || 'ㅤ'}</span>
              <Typography variant="caption" color="gray">
                {time || ''}
              </Typography>
            </Stack>
          }
          secondary={
            <Stack direction="row" justifyContent="space-between" alignItems="center">
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
