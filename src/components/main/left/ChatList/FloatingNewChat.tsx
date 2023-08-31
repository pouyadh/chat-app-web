import IconButton from '@mui/material/IconButton';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import React from 'react';
import { Menu, MenuItem } from '@mui/material';

import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import { useAppDispatch } from 'store/store';
import { showContactListModal } from 'store/uiSlice';

export default function FloatingNewChat({ children }: { children?: React.ReactNode }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useAppDispatch();
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
          color: ({ palette }) => palette.primary.dark,
        }}
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
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleClose}>
          <CampaignOutlinedIcon />
          New channel
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <GroupOutlinedIcon />
          New Group
        </MenuItem>
        <MenuItem
          onClick={() => {
            dispatch(showContactListModal());
            handleClose();
          }}
        >
          <Person2OutlinedIcon />
          New message
        </MenuItem>
      </Menu>
    </>
  );
}
