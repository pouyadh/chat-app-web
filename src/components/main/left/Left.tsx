import { Box, IconButton, Stack } from '@mui/joy';
import MainMenu from './MainMenu';
import SearchInput from './SearchInput';
import ChatFolders from './ChatFolders';
import ChatList from './ChatList';
import FloatingNewChat from './FloatingNewChat';
import CHAT_SUMMERIES from 'mock-data/ChatSummery.json';
import CHAT_FOLDERS from 'mock-data/ChatFolder.json';

export default function Left() {
  return (
    <Box
      sx={{
        minWidth: '256px',
        maxWidth: '425px',
        flexGrow: 1,
        borderRight: '1px solid rgba(128,128,128,0.1)',
        position: 'relative',
        maxHeight: '100vh',
        backgroundColor: ({ palette }) => palette.background.body,
      }}
    >
      <Stack sx={{ maxHeight: '100vh' }}>
        <Stack direction="row" spacing={1} padding={1}>
          <MainMenu />
          <SearchInput />
        </Stack>
        <ChatFolders chatFolders={CHAT_FOLDERS as ChatFolder[]} />
        <ChatList chatSummeries={CHAT_SUMMERIES as ChatSummery[]} />
        <FloatingNewChat />
      </Stack>
    </Box>
  );
}
