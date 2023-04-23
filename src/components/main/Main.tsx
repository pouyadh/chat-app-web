import Stack from '@mui/joy/Stack';
import Left from './left/Left';
import Middle from './middle/Middle';

export default function Main() {
  return (
    <Stack direction="row" spacing={0} sx={{ height: '100vh' }}>
      <Left />
      <Middle />
    </Stack>
  );
}
