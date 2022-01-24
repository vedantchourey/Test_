import Head from 'next/head';
import commonStyles from '../../src/frontend/styles/common.module.css';
import { Container, Grid, Typography, useTheme } from '@mui/material';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import NoobHeader from '../../src/frontend/components/header/noob-header';
import Heading from '../../src/frontend/components/ui-components/typography/heading';
import NewsletterPoster from "../../src/frontend/components/newsletter-poster/index"
import NoobFooter from '../../src/frontend/components/footer';

interface IPageProps {
    pageContent: {
        attributes: {
            title: string,
            description: string
        }
    } | null
}

export default function AboutUs(props: IPageProps) {
    const content = props.pageContent?.attributes;
    const theme = useTheme();

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
                                {content?.title}
                            </Typography>

                            <Typography className={commonStyles.whiteText} marginBottom={2}>
                                {content?.description}
                            </Typography>

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
            <NoobFooter />
        </div>
    )
}


export const getServerSideProps: GetServerSideProps = async () => {
    const {
        NEXT_PUBLIC_CMS_API_ENDPOINT,
        NEXT_PUBLIC_CMS_API_TOKEN
    } = process.env;
    try {
        const endpoint = NEXT_PUBLIC_CMS_API_ENDPOINT + '/api/about-us';
        const res = await axios.get(endpoint, {
            headers: {
                'Authorization': 'Bearer ' + NEXT_PUBLIC_CMS_API_TOKEN
            },
            params: {
                populate: '*'
            }
        });

        return {
            props: {
                pageContent: res.data.data
            }
        }

    }
    catch (err) {
        // console.log(err);
        return {
            props: {
                pageContent: null
            }
        }
    }
}