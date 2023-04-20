import { CssBaseline, CssVarsProvider, Stack } from '@mui/joy';
import Left from './components/main/left/Left';
import Middle from './components/main/middle/Middle';

function App() {
  return (
    <CssVarsProvider defaultMode="system">
      <CssBaseline />
      <Stack direction="row" spacing={0} sx={{ height: '100vh' }}>
        <Left />
        <Middle />
      </Stack>
    </CssVarsProvider>
  );
}

export default App;
