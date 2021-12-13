import { Container, Typography, useTheme } from '@mui/material';
import Head from 'next/head';
import NoobHeader from '../components/header/noob-header';
import styles from './register.module.css';
import commonStyles from '../styles/common.module.css';
import RegistrationForm from '../components/auth/registration-form/registration-form';
import { useAppSelector } from '../store/redux-store';
import { isDeviceTypeSelector } from '../store/layout/layout-selectors';
import { deviceTypes } from '../store/layout/device-types';
import { useRouter } from 'next/router';
import { isLoggedInSelector } from '../store/authentication/authentication-selectors';
import { useEffect } from 'react';

export default function Register() {
  const theme = useTheme();
  const router = useRouter();
  const isDesktop = useAppSelector(x => isDeviceTypeSelector(x, deviceTypes.desktop));
  const backgroundColor = isDesktop ? theme.palette.background.default : theme.palette.background.paper;
  const isLoggedIn = useAppSelector(isLoggedInSelector);

  const onSignUpSuccess = async (userId: string | undefined) => {
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
        <div className={styles.mainBanner}>
          <Typography className={styles.mainBannerText}>REGISTRATION</Typography>
        </div>
        <Container maxWidth="md" className={styles.registrationFormContainer}>
          <RegistrationForm onSignUpSuccess={onSignUpSuccess}/>
        </Container>
      </main>
    </div>
  )
}
