import { Box, Container, Grid, Stack, Typography } from '@mui/joy';
import { Outlet } from 'react-router-dom';

export default function Auth() {
  return (
    <Container maxWidth="sm">
      <Stack height="100vh">
        <div style={{ flexGrow: 1 }}></div>
        <Box padding={2}>
          <Outlet />
        </Box>
        <div style={{ flexGrow: 1 }}></div>
        <Box component="footer" sx={{ py: 3 }}>
          <Typography level="body3" textAlign="center">
            © Pouyadh {new Date().getFullYear()}
          </Typography>
        </Box>
      </Stack>
    </Container>
  );
}
