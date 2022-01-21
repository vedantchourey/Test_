import Head from 'next/head';
import commonStyles from '../../src/frontend/styles/common.module.css';
import { Container, Grid, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styles from '../account.module.css';
import { useAppSelector } from '../../src/frontend/redux-store/redux-store';
import { authCheckStatusSelector, isLoggedInSelector } from '../../src/frontend/redux-store/authentication/authentication-selectors';
import { getAppHeaderHeightSelector } from '../../src/frontend/redux-store/layout/layout-selectors';
import NoobHeader from '../../src/frontend/components/header/noob-header';
import UserProfileCard from '../../src/frontend/components/cards/user-profile-card/user-profile-card';
import Heading from '../../src/frontend/components/typography/heading';
import NewsletterPoster from "../../src/frontend/components/newsletter-poster"

const TEXT = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry.`

export default function AboutUs() {
    const theme = useTheme();
    const router = useRouter();
    const isLoggedIn = useAppSelector(isLoggedInSelector);
    const checkStatus = useAppSelector(authCheckStatusSelector);
    const appHeaderHeight = useAppSelector(getAppHeaderHeightSelector);

    // useEffect(() => {
    //     (async () => {
    //         if (checkStatus !== 'success') return;
    //         if (isLoggedIn) return;
    //         await router.push('/')
    //     })()
    // });

    return (
        <div style={{ backgroundColor: theme.palette.background.default }}>
            <Head>
                <title>About Us</title>
                <meta name="description" content="Sign up to noob storm" />
                <link rel="icon" href="/noob-fav.ico" />
            </Head>
            <NoobHeader />
            <main className={commonStyles.main}>
                <Container maxWidth="xl">

                    <Heading divider heading={"ABOUT US"} />

                    <Grid container spacing={2}>

                        <Grid item xs={12} lg={6}>

                            <Typography className={commonStyles.primaryText} marginBottom={2}>
                                {TEXT.substring(0, 70)}
                            </Typography>

                            {new Array(2).fill(TEXT).map((text, i) => (
                                <Typography className={commonStyles.whiteText} marginBottom={2}>
                                    {text}
                                </Typography>
                            ))}

                        </Grid>

                        <Grid item xs={12} lg={6}>
                            <img src="/images/about-us-hero.png" className={commonStyles.fillImage} />
                        </Grid>

                        <Grid item xs={12}>
                            <NewsletterPoster />
                        </Grid>

                    </Grid>

                </Container>

            </main>
        </div>
    )
}
