import { Box } from '@mui/material';
import Chat from './Chat';

export default function Middle() {
  const loading = false;
  return <Box sx={{ flexGrow: 1, minWidth: 0 }}>{<Chat />}</Box>;
}
