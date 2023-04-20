import { CssBaseline, CssVarsProvider, GlobalStyles, Stack } from '@mui/joy';
import Left from './components/main/left/Left';
import Middle from './components/main/middle/Middle';

function App() {
  return (
    <CssVarsProvider defaultMode="system">
      <CssBaseline />
      <GlobalStyles
        styles={{
          //scrollbar webkit
          '*::-webkit-scrollbar': {
            width: '5px',
          },
          '*::-webkit-scrollbar-track': {
            'background-color': 'transparent',
          },
          '*::-webkit-scrollbar-thumb': {
            'background-color': 'rgba(128,128,128,0.3)',
            'border-radius': '10px',
          },
          //scrollbar firefox
          '*': {
            'scrollbar-width': 'thin',
            'scrollbar-color': '#1e1e1e transparent',
          },
        }}
      />
      <Stack direction="row" spacing={0} sx={{ height: '100vh' }}>
        <Left />
        <Middle />
      </Stack>
    </CssVarsProvider>
  );
}

export default App;
