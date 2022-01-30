import Head from 'next/head';
import {useCommonStyles} from '../src/frontend/styles/common-styles';
import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppSelector } from '../src/frontend/redux-store/redux-store';
import { authCheckStatusSelector, isLoggedInSelector } from '../src/frontend/redux-store/authentication/authentication-selectors';
import { getAppHeaderHeightSelector } from '../src/frontend/redux-store/layout/layout-selectors';
import NoobHeader from '../src/frontend/components/header/noob-header';
import UserProfileCard from '../src/frontend/components/cards/user-profile-card/user-profile-card';
import {useStyles} from '../src/frontend/styles/page-styles/account-styles'

export default function Account() {
  const theme = useTheme();
  const router = useRouter();
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  const checkStatus = useAppSelector(authCheckStatusSelector);
  const appHeaderHeight = useAppSelector(getAppHeaderHeightSelector);
  const styles = useStyles();
  const commonStyles = useCommonStyles();

  useEffect(() => {
    (async () => {
      if (checkStatus !== 'success') return;
      if (isLoggedIn) return;
      await router.push('/')
    })()
  });

  return (
    <div style={{backgroundColor: theme.palette.background.default}}>
      <Head>
        <title>Account</title>
        <meta name="description" content="Sign up to noob storm"/>
        <link rel="icon" href="/noob-fav.ico"/>
      </Head>
      <NoobHeader/>
      <main className={commonStyles.main}>
        <div className={styles.container} style={{marginTop: appHeaderHeight}}>
          <UserProfileCard/>
        </div>
      </main>
    </div>
  )
}