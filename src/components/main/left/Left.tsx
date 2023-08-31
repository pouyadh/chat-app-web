import { Box, LinearProgress, Stack } from '@mui/material';
import MainMenu from './MainMenu';
import SearchInput from './SearchInput';
import ChatFolders from './ChatList/ChatFolders';
import FloatingNewChat from './ChatList/FloatingNewChat';
import { useSocketStatus } from 'store/selector';
import ChatList from './ChatList/ChatList';

export default function Left() {
  const socketStatus = useSocketStatus();
  const loading = socketStatus !== 'connected';
  return (
    <Box
      sx={{
        minWidth: '256px',
        maxWidth: '425px',
        flexGrow: 1,
        borderRight: '1px solid rgba(128,128,128,0.1)',
        position: 'relative',
        maxHeight: '100vh',
        backgroundColor: ({ palette }) => palette.background.default,
      }}
    >
      <Stack sx={{ maxHeight: '100vh' }}>
        <LinearProgress
          value={0}
          variant={loading ? 'indeterminate' : 'determinate'}
          sx={{ height: '1px' }}
        />
        <Stack direction="row" spacing={1} padding={1}>
          <MainMenu />
          <SearchInput />
        </Stack>
        <ChatFolders />
        <ChatList />
        <FloatingNewChat />
      </Stack>
    </Box>
  );
}
