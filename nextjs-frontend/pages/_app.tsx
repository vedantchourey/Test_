import '../styles/globals.css'
import type { AppProps } from 'next/app'
import reduxStore from '../store/redux-store';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import noobTheme from '../utils/theme-and-colours/mui-theme';
import LayoutChangeDetector from '../components/utils/layout-change-detector';

function MyApp({Component, pageProps}: AppProps) {
  return (
    <ThemeProvider theme={noobTheme}>
      <Provider store={reduxStore}>
        <LayoutChangeDetector/>
        <Component {...pageProps} />
      </Provider>
    </ThemeProvider>
  )
}

export default MyApp
