import type { NextPage } from 'next'
import { Container, Typography } from '@mui/material';
import styles from './register.module.css';
import RegistrationForm from '../../src/frontend/components/auth/registration-form/registration-form';
import { useAppSelector } from '../../src/frontend/redux-store/redux-store';
import { getAppHeaderHeightSelector } from '../../src/frontend/redux-store/layout/layout-selectors';
import { useRouter } from 'next/router';
import { isLoggedInSelector } from '../../src/frontend/redux-store/authentication/authentication-selectors';
import { Fragment, useEffect } from 'react';
import NoobPage from '../../src/frontend/components/page/noob-page';

const Register: NextPage = () => {
  const router = useRouter();
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
    <NoobPage
      title="Register"
      metaData={{
        description: "Sign up to noob storm"
      }}
    >
      <Fragment>
        <div className={styles.mainBanner} style={{ marginTop: appHeaderHeight }}>
          <Typography className={styles.mainBannerText}>REGISTRATION</Typography>
        </div>
        <Container maxWidth="md" className={styles.registrationFormContainer}>
          <RegistrationForm onSignUpSuccess={onSignUpSuccess} />
        </Container>
      </Fragment>
    </NoobPage>
  )
}

export default Register