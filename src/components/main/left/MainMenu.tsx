import {
  IconButton,
  ListDivider,
  ListItemDecorator,
  Menu,
  MenuItem,
  Switch,
  Typography,
  useColorScheme,
} from '@mui/joy';
import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ModeNightOutlinedIcon from '@mui/icons-material/ModeNightOutlined';

export default function MainMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { mode, setMode } = useColorScheme();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleNightMode = () => setMode(mode === 'dark' ? 'light' : 'dark');

  return (
    <div>
      <IconButton
        id="MainMenu-button"
        aria-controls={open ? 'MainMenu-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="plain"
        color="neutral"
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
        placement="bottom-end"
      >
        <MenuItem onClick={handleClose}>
          <ListItemDecorator>
            <BookmarkBorderOutlinedIcon />
          </ListItemDecorator>{' '}
          Saved Messages
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemDecorator>
            <PersonOutlineOutlinedIcon />
          </ListItemDecorator>{' '}
          Contacts
        </MenuItem>
        <MenuItem onClick={toggleNightMode}>
          <ListItemDecorator>
            <ModeNightOutlinedIcon />
          </ListItemDecorator>{' '}
          Night Mode
          <ListItemDecorator />
          <Switch checked={mode === 'dark'} />
        </MenuItem>
        <ListDivider />
        <MenuItem disabled sx={{ justifyContent: 'center' }}>
          <Typography level="body2" textColor="grey">
            ChatApp @pouyadh
          </Typography>
        </MenuItem>
      </Menu>
    </div>
  );
}
