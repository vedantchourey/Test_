import { Container, Icon, Typography, useTheme } from '@mui/material';
import Head from 'next/head';
import NoobHeader from '../../src/frontend/components/header/noob-header';
import styles from './register.module.css';
import commonStyles from '../../src/frontend/styles/common.module.css';
import { useAppSelector } from '../../src/frontend/redux-store/redux-store';
import { getAppHeaderHeightSelector, isDeviceTypeSelector } from '../../src/frontend/redux-store/layout/layout-selectors';
import { deviceTypes } from '../../src/frontend/redux-store/layout/device-types';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { isLoggedInSelector } from '../../src/frontend/redux-store/authentication/authentication-selectors';

export default function RegisterSuccess() {
    const theme = useTheme();
    const isDesktop = useAppSelector(x => isDeviceTypeSelector(x, deviceTypes.desktop));
    const backgroundColor = isDesktop ? theme.palette.background.default : theme.palette.background.paper;
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
        <div style={{ backgroundColor }}>
            <Head>
                <title>Registration Success</title>
                <meta name="description" content="Sign up to noob storm" />
                <link rel="icon" href="/noob-fav.ico" />
            </Head>
            <NoobHeader />
            <main className={commonStyles.main}>
                <div className={styles.mainBanner} style={{ marginTop: appHeaderHeight }}>
                    <Typography className={styles.mainBannerText}>ACTIVATION</Typography>
                </div>
                <Container maxWidth="md" className={styles.registrationFormContainer}>
                    <div className={commonStyles.simpleMessageContent} style={{ backgroundColor: theme.palette.background.paper }}>
                        <Icon className={commonStyles.whiteText}><ErrorOutlineIcon /></Icon><Typography className={commonStyles.whiteText}>Signed up successfully! Please confirm activation email and sign in.</Typography>
                    </div>
                </Container>
            </main>
        </div>
    )
}
