import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Typography from '@mui/joy/Typography';
import { ListItemButton, Menu, MenuItem } from '@mui/joy';

import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import MarkChatReadOutlinedIcon from '@mui/icons-material/MarkChatReadOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useAppDispatch, useAppSelector } from 'store/store';
import {
  selectChatFolders,
  selectChats,
  selectSelectedFolderId,
  setSelectedChatId,
} from 'store/mainSlice';
import { selectDataStatus } from 'store/mainSlice';

export default function ChatList() {
  const chats = useAppSelector(selectChats);
  const chatFolders = useAppSelector(selectChatFolders);
  const selectedFolderId = useAppSelector(selectSelectedFolderId);

  const filteredChats = React.useMemo(() => {
    if (selectedFolderId && chatFolders?.length) {
      const folder = chatFolders.find((f) => f.id === selectedFolderId);
      return chats?.filter((chat) => folder?.chatIds.includes(chat.id));
    } else {
      return chats;
    }
  }, [chats, chatFolders, selectedFolderId]);

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
      <List
        sx={{
          '--ListItemDecorator-size': '56px',
        }}
      >
        {filteredChats &&
          filteredChats.map((chat) => (
            <ListItem
              key={chat.id}
              data-chat-id={chat.id}
              data-chat-type={chat.type}
              onContextMenu={handleChatContextMenu}
              onClick={() => dispatch(setSelectedChatId(chat.id))}
            >
              <ListItemButton>
                <ListItemDecorator sx={{ alignSelf: 'flex-start' }}>
                  <Avatar alt={chat.title} src={chat.avatarUrl} />
                </ListItemDecorator>
                <ListItemContent>
                  <Typography>
                    <span dangerouslySetInnerHTML={{ __html: chat.title }} />
                  </Typography>
                  <Typography level="body2" noWrap>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: chat.messages.at(-1)?.text || '',
                      }}
                    />
                  </Typography>
                </ListItemContent>
              </ListItemButton>
            </ListItem>
          ))}
      </List>
      <Menu
        id="ChatContextMenu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        placement="bottom-end"
      >
        <MenuItem onClick={handleClose}>
          <ListItemDecorator>
            <OpenInNewOutlinedIcon />
          </ListItemDecorator>{' '}
          Open in new tab
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemDecorator>
            <FolderOutlinedIcon />
          </ListItemDecorator>{' '}
          Add to folder
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemDecorator>
            <MarkChatReadOutlinedIcon />
          </ListItemDecorator>{' '}
          Mark as read
        </MenuItem>
        <MenuItem onClick={handleClose} color="danger">
          <ListItemDecorator>
            <DeleteOutlinedIcon />
          </ListItemDecorator>{' '}
          {deleteMenuText}
        </MenuItem>
      </Menu>
    </div>
  );
}
