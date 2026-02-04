import '@fontsource/inter';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import Form from './components/form';
import { createRoot } from 'react-dom/client';

document.body.innerHTML = '<div id="app"></div>';

const theme = extendTheme({
  components: {
    JoyButton: {
      defaultProps: {
        variant: 'soft',
      },
    },
    JoyCheckbox: {
      defaultProps: {
        variant: 'outlined',
      },
    }
  },
});

const root = createRoot(document.getElementById('app'));
root.render(<CssVarsProvider theme={theme}><Form /></CssVarsProvider>);
