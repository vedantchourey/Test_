import { useTheme } from '@mui/material';
import Head from 'next/head';
import NoobHeader from '../src/frontend/components/header/noob-header';
import {useCommonStyles} from '../src/frontend/styles/common-styles';
import { useAppSelector } from '../src/frontend/redux-store/redux-store';
import { getAppHeaderHeightSelector } from '../src/frontend/redux-store/layout/layout-selectors';
import NotFound from '../src/frontend/components/not-found/not-found';
import {useStyles} from '../src/frontend/styles/page-styles/404-styles';

export default function Noob404Page() {
  const theme = useTheme();
  const appHeaderHeight = useAppSelector(getAppHeaderHeightSelector);
  const styles = useStyles();
  const commonStyles = useCommonStyles();

  return (
    <div style={{backgroundColor: theme.palette.background.default}}>
      <Head>
        <title>Home</title>
        <meta name="description" content="Noob storm home page"/>
        <link rel="icon" href="/noob-fav.ico"/>
      </Head>
      <NoobHeader/>
      <main className={commonStyles.main}>
        <div style={{marginTop: appHeaderHeight}} className={styles.mainContainer}>
          <NotFound/>
        </div>
      </main>
    </div>
  )
}
