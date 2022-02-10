import React from "react"
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { Typography } from "@mui/material";
import commonStyles from '../../src/frontend/styles/common.module.css';
import Heading from "../../src/frontend/components/ui-components/typography/heading"
import NoobPage from "../../src/frontend/components/page/noob-page";
import { backendConfig } from '../../src/backend/utils/config/backend-config';

interface IPageProps {
    pageContent: {
        attributes: {
            content: string
        }
    } | null
}

export default function TermsOfServicePage(props: IPageProps): JSX.Element {

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
    cmsApiEndpoint,
    cmsApiToken
  } = backendConfig.client;

  try {
    const endpoint = cmsApiEndpoint + '/api/terms-and-condition';
    const res = await axios.get(endpoint, {
      headers: {
        'Authorization': 'Bearer ' + cmsApiToken
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
