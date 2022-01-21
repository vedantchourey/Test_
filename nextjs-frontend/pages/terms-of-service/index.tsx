import React from "react"
import axios from 'axios';
import Head from "next/head"
import { GetServerSideProps } from 'next';
import NoobHeader from "../../src/frontend/components/header/noob-header"
import { Typography, useTheme } from "@mui/material";
import homeModule from '../../src/frontend/styles/common.module.css';
import commonStyles from '../../src/frontend/styles/common.module.css';
import Heading from "../../src/frontend/components/ui-components/typography/heading"

interface IPageProps {
    pageContent: {
        attributes: {
            content: string
        }
    } | null
}

export default function TermsOfServicePage(props: IPageProps) {
    const theme = useTheme();
    const fallback_text = 'Terms and Conditions not available';
    const content = props.pageContent?.attributes?.content || fallback_text;

    return (
        <div style={{ backgroundColor: theme.palette.background.default }}>
            <Head>
                <title>Terms of service</title>
                <meta name="description" content="Noob storm home page" />
                <link rel="icon" href="/noob-fav.ico" />
            </Head>
            <NoobHeader />
            <main className={homeModule.main}>
                <div className={commonStyles.container}>

                    <Heading divider heading={"TERMS OF SERVICE"} />

                    <Typography className={commonStyles.whiteText} marginBottom={2}>
                        {content}
                    </Typography>
                </div>

            </main>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    const {
        NEXT_PUBLIC_CMS_API_ENDPOINT,
        NEXT_PUBLIC_CMS_API_TOKEN
    } = process.env;
    try {
        const endpoint = NEXT_PUBLIC_CMS_API_ENDPOINT + '/api/terms-and-condition';
        const res = await axios.get(endpoint, {
            headers: {
                'Authorization': 'Bearer ' + NEXT_PUBLIC_CMS_API_TOKEN
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
