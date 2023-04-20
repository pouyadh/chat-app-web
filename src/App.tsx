import { CssBaseline, CssVarsProvider, GlobalStyles, Stack } from '@mui/joy';
import Left from './components/main/left/Left';
import Middle from './components/main/middle/Middle';
import bgImageDark from 'assets/chat-bg-pattern-dark.png';
import bgImageLight from 'assets/chat-bg-pattern-light.png';

function App() {
  return (
    <CssVarsProvider defaultMode="system">
      <CssBaseline />
      <GlobalStyles
        styles={({ palette }) => {
          const isDark = palette.colorScheme === 'dark';
          return {
            //scrollbar webkit
            '*::-webkit-scrollbar': {
              width: '5px',
            },
            '*::-webkit-scrollbar-track': {
              backgroundColor: 'transparent',
            },
            '*::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(128,128,128,0.3)',
              borderRadius: '10px',
            },
            //scrollbar firefox
            '*': {
              scrollbarWidth: 'thin',
              scrollbarColor: '#1e1e1e transparent',
            },
            body: {
              backgroundImage: `url(${isDark ? bgImageDark : bgImageLight})`,
              backgroundSize: 'contain',
            },
          };
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
