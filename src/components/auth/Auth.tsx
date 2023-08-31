import { Box, Container, Stack, Typography } from '@mui/material';
import userRedirectIfUser from 'hooks/userRedirectIfUser';
import { Outlet } from 'react-router-dom';

export default function Auth() {
  userRedirectIfUser('/');
  return (
    <Container maxWidth="sm">
      <Stack height="100vh">
        <div style={{ flexGrow: 1 }}></div>
        <Box padding={2}>
          <Outlet />
        </Box>
        <div style={{ flexGrow: 1 }}></div>
        <Box component="footer" sx={{ py: 3 }}>
          <Typography variant="body2" textAlign="center">
            © Pouyadh {new Date().getFullYear()}
          </Typography>
        </Box>
      </Stack>
    </Container>
  );
}
