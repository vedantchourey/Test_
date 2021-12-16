import Head from 'next/head';
import NoobHeader from '../components/header/noob-header';
import commonStyles from '../styles/common.module.css';
import { useTheme } from '@mui/material';
import { useAppSelector } from '../store/redux-store';
import { authCheckStatusSelector, isLoggedInSelector } from '../store/authentication/authentication-selectors';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import UserProfileCard from '../components/cards/user-profile-card/user-profile-card';
import styles from './account.module.css';

export default function Account() {
  const theme = useTheme();
  const router = useRouter();
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  const checkStatus = useAppSelector(authCheckStatusSelector);

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
        <div className={styles.container}>
          <UserProfileCard/>
        </div>
      </main>
    </div>
  )
}
