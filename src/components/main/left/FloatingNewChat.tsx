import IconButton from '@mui/joy/IconButton';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import React from 'react';
import { ListItemDecorator, Menu, MenuItem } from '@mui/joy';

import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';

export default function FloatingNewChat({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton
        id="NewChatMenu-button"
        sx={{
          position: 'absolute',
          right: '24px',
          bottom: '24px',
          borderRadius: '50%',
          padding: 2,
        }}
        color="info"
        onClick={handleClick}
      >
        {open ? <CloseOutlinedIcon /> : <CreateOutlinedIcon />}
      </IconButton>
      <Menu
        id="NewChatMenu-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        aria-labelledby="NewChatMenu-button"
        placement="top-start"
      >
        <MenuItem onClick={handleClose}>
          <ListItemDecorator>
            <CampaignOutlinedIcon />
          </ListItemDecorator>{' '}
          New channel
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemDecorator>
            <GroupOutlinedIcon />
          </ListItemDecorator>{' '}
          New Group
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemDecorator>
            <Person2OutlinedIcon />
          </ListItemDecorator>{' '}
          New message
        </MenuItem>
      </Menu>
    </>
  );
}
