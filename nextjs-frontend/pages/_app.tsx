import '../styles/globals.css'
import type { AppProps } from 'next/app'
import reduxStore from '../store/redux-store';
import { Provider } from 'react-redux';

function MyApp({Component, pageProps}: AppProps) {

  return (
    <Provider store={reduxStore}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
