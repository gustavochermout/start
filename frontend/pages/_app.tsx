import { GlobalStyle, GlobalMuiTheme } from '../components/AppGlobalStyles';
import { ThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ReduxStore, Persistor } from '../redux/store';
import { PersistGate } from 'redux-persist/integration/react'

export default function MyApp({ Component, pageProps }) {
  return (
    <Provider store={ReduxStore}>
      <PersistGate loading={null} persistor={Persistor}>
        <GlobalStyle />
        <ThemeProvider theme={GlobalMuiTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  )
}