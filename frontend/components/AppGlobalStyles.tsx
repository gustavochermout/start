import { createGlobalStyle } from "styled-components"
import { createMuiTheme } from '@material-ui/core/styles';

export const GlobalStyle = createGlobalStyle`
  body, input, button {
    font-family: 'Roboto', Arial, Helvetica, sans-serif;
  }
`

export const GlobalMuiTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#6dc787',
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