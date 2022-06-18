import "../src/frontend/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import noobTheme from "../src/frontend/utils/theme-and-colours/mui-theme";
import reduxStore from "../src/frontend/redux-store/redux-store";
import LayoutChangeDetector from "../src/frontend/components/utils/layout-change-detector";
import { LoadingIndicator } from "../src/frontend/components/utils/loading-indicator";
import AuthEventsHandler from "../src/frontend/components/auth/auth-events-handler";
import createEmotionCache from "../src/frontend/utils/emoticon-cache";
import { CacheProvider, EmotionCache } from "@emotion/react";

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

// https://github.com/mui-org/material-ui/tree/ce5332fbcd11308be7f898511a3da5c7f2726e6b/examples/nextjs-with-typescript
function MyApp(props: MyAppProps): JSX.Element {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={noobTheme}>
        <Provider store={reduxStore}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <LayoutChangeDetector />
            <LoadingIndicator />
            <AuthEventsHandler />
            <Component {...pageProps} />
          </LocalizationProvider>
        </Provider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
