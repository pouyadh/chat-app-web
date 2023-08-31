import { IconButton, Menu, MenuItem, Switch, Typography, useColorScheme } from '@mui/material';
import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ModeNightOutlinedIcon from '@mui/icons-material/ModeNightOutlined';
import { useSelectedTheme } from 'store/selector';
import { useAppDispatch } from 'store/store';
import { setTheme, showContactListModal } from 'store/uiSlice';
import { signout } from 'store/appSlice';

export default function MainMenu() {
  const selectedTheme = useSelectedTheme();
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleNightMode = () => dispatch(setTheme(selectedTheme === 'dark' ? 'light' : 'dark'));

  return (
    <div>
      <IconButton
        id="MainMenu-button"
        aria-controls={open ? 'MainMenu-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        color="default"
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="MainMenu-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        aria-labelledby="MainMenu-button"
      >
        <MenuItem onClick={handleClose}>
          <BookmarkBorderOutlinedIcon />
          Saved Messages
        </MenuItem>
        <MenuItem
          onClick={() => {
            dispatch(showContactListModal());
            handleClose();
          }}
        >
          <PersonOutlineOutlinedIcon />
          Contacts
        </MenuItem>
        <MenuItem onClick={toggleNightMode}>
          <ModeNightOutlinedIcon />
          Night Mode
          <Switch checked={selectedTheme === 'dark'} />
        </MenuItem>
        <MenuItem
          onClick={() => {
            dispatch(signout());
            handleClose();
          }}
        >
          <PersonOutlineOutlinedIcon />
          Signout
        </MenuItem>

        <MenuItem disabled sx={{ justifyContent: 'center' }}>
          <Typography variant="body2" color="grey">
            ChatApp @pouyadh
          </Typography>
        </MenuItem>
      </Menu>
    </div>
  );
}
