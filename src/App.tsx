import * as themes from 'theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useSelectedTheme } from 'store/selector';

function App() {
  const selectedTheme = useSelectedTheme();
  return (
    <ThemeProvider theme={themes[selectedTheme]}>
      <CssBaseline />
      <Outlet />
    </ThemeProvider>
  );
}

export default App;
