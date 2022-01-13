import '../src/frontend/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import AdapterLuxonFns from '@mui/lab/AdapterLuxon';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import noobTheme from '../src/frontend/utils/theme-and-colours/mui-theme';
import reduxStore from '../src/frontend/redux-store/redux-store';
import LayoutChangeDetector from '../src/frontend/components/utils/layout-change-detector';
import { LoadingIndicator } from '../src/frontend/components/utils/loading-indicator';
import AuthEventsHandler from '../src/frontend/components/auth/auth-events-handler';

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
