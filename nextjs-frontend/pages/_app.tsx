  import '../styles/globals.css'
import type { AppProps } from 'next/app'
import reduxStore from '../store/redux-store';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import noobTheme from '../utils/theme-and-colours/mui-theme';
import LayoutChangeDetector from '../components/utils/layout-change-detector';
import AdapterLuxonFns from '@mui/lab/AdapterLuxon';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { LoadingIndicator } from '../components/utils/loading-indicator';
import AuthEventsHandler from '../components/auth/auth-events-handler';

function MyApp({Component, pageProps}: AppProps) {
  return (
    <ThemeProvider theme={noobTheme}>
      <Provider store={reduxStore}>
        <LocalizationProvider dateAdapter={AdapterLuxonFns}>
          <LayoutChangeDetector/>
          <LoadingIndicator/>
          <AuthEventsHandler/>
          <Component {...pageProps} />
        </LocalizationProvider>
      </Provider>
    </ThemeProvider>
  )
}

export default MyApp
