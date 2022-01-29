import { Container, Icon, Typography, useTheme } from '@mui/material';
import styles from '../register/register.module.css';
import commonStyles from '../../src/frontend/styles/common.module.css';
import { useAppSelector } from '../../src/frontend/redux-store/redux-store';
import { getAppHeaderHeightSelector } from '../../src/frontend/redux-store/layout/layout-selectors';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Fragment, useEffect } from 'react';
import { useRouter } from 'next/router';
import { isLoggedInSelector } from '../../src/frontend/redux-store/authentication/authentication-selectors';
import NoobPage from '../../src/frontend/components/page/noob-page';

export default function RegisterSuccess() {
  const theme = useTheme();
  const router = useRouter();
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  const appHeaderHeight = useAppSelector(getAppHeaderHeightSelector);

  useEffect(() => {
    (async () => {
      if (!isLoggedIn) return;
      await router.push('/');
    })();
  }, [isLoggedIn]);

  return (
    <NoobPage
      title="Registration Success"
      metaData={{
        description: "Noob Storm registration success page"
      }}
    >
      <Fragment>
        <div className={styles.mainBanner} style={{ marginTop: appHeaderHeight }}>
          <Typography className={styles.mainBannerText}>ACTIVATION</Typography>
        </div>
        <Container maxWidth="md" className={styles.registrationFormContainer}>
          <div className={commonStyles.simpleMessageContent} style={{ backgroundColor: theme.palette.background.paper }}>
            <Icon className={commonStyles.whiteText}><ErrorOutlineIcon /></Icon><Typography className={commonStyles.whiteText}>Signed up successfully! Please confirm activation email and sign in.</Typography>
          </div>
        </Container>
      </Fragment>
    </NoobPage>
  )
}
