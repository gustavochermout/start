import { createGlobalStyle } from "styled-components"
import { createTheme } from '@material-ui/core/styles';

export const GlobalStyle = createGlobalStyle`
  body, input, button {
    font-family: 'Poppins', Arial, Helvetica, sans-serif;
  }
`

export const GlobalMuiTheme = createTheme({
  typography: {
    fontFamily: `'Poppins', 'Roboto', Arial, Helvetica, sans-serif`,
  },
  palette: {
    primary: {
      main: '#087ea4',
      contrastText: '#FFF',
    },
    secondary: {
      main: '#282a37',
      contrastText: '#FFF',
    },
    background: {
      default: '#F2F2F2',
      paper: '#F2F2F2',
    }
  },
});
