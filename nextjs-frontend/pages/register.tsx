import { Container, Typography, useTheme } from '@mui/material';
import Head from 'next/head';
import NoobHeader from '../src/frontend/components/header/noob-header';
import styles from './register.module.css';
import commonStyles from '../src/frontend/styles/common.module.css';
import RegistrationForm from '../src/frontend/components/auth/registration-form/registration-form';
import { useAppSelector } from '../src/frontend/redux-store/redux-store';
import { getAppHeaderHeightSelector, isDeviceTypeSelector } from '../src/frontend/redux-store/layout/layout-selectors';
import { deviceTypes } from '../src/frontend/redux-store/layout/device-types';
import { useRouter } from 'next/router';
import { isLoggedInSelector } from '../src/frontend/redux-store/authentication/authentication-selectors';
import { useEffect } from 'react';

export default function Register() {
  const theme = useTheme();
  const router = useRouter();
  const isDesktop = useAppSelector((x) => isDeviceTypeSelector(x, deviceTypes.desktop));
  const backgroundColor = isDesktop ? theme.palette.background.default : theme.palette.background.paper;
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  const appHeaderHeight = useAppSelector(getAppHeaderHeightSelector);

  const onSignUpSuccess = async () => {
    await router.push('/register-success');
  }

  useEffect(() => {
    (async () => {
      if (!isLoggedIn) return;
      await router.push('/');
    })();
  }, [isLoggedIn]);

  return (
    <div style={{backgroundColor}}>
      <Head>
        <title>Register</title>
        <meta name="description" content="Sign up to noob storm"/>
        <link rel="icon" href="/noob-fav.ico"/>
      </Head>
      <NoobHeader/>
      <main className={commonStyles.main}>
        <div className={styles.mainBanner} style={{marginTop: appHeaderHeight}}>
          <Typography className={styles.mainBannerText}>REGISTRATION</Typography>
        </div>
        <Container maxWidth="md" className={styles.registrationFormContainer}>
          <RegistrationForm onSignUpSuccess={onSignUpSuccess}/>
        </Container>
      </main>
    </div>
  )
}
