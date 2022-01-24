import React from "react"
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { Typography } from "@mui/material";
import commonStyles from '../../src/frontend/styles/common.module.css';
import Heading from "../../src/frontend/components/ui-components/typography/heading"
import NoobPage from "../../src/frontend/components/page/noob-page";

interface IPageProps {
    pageContent: {
        attributes: {
            content: string
        }
    } | null
}

export default function TermsOfServicePage(props: IPageProps) {

    const fallback_text = 'Terms and Conditions not available';
    const content = props.pageContent?.attributes?.content || fallback_text;

    return (
        <NoobPage
            title="Terms of service"
            metaData={{
                description: "Noob Storm terms of service page"
            }}
        >
            <div className={commonStyles.container}>

                <Heading divider heading={"TERMS OF SERVICE"} />

                <Typography className={commonStyles.whiteText} marginBottom={2} style={{ whiteSpace: 'pre-line' }}>
                    {content}
                </Typography>
            </div>
        </NoobPage>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    const {
        CMS_API_ENDPOINT,
        CMS_API_TOKEN
    } = process.env;
    try {
        const endpoint = CMS_API_ENDPOINT + '/api/terms-and-condition';
        const res = await axios.get(endpoint, {
            headers: {
                'Authorization': 'Bearer ' + CMS_API_TOKEN
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
