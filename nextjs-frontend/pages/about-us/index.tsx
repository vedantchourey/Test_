import { Fragment } from 'react';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import commonStyles from '../../src/frontend/styles/common.module.css';
import { Container, Grid, Typography, Box } from '@mui/material';
import Heading from '../../src/frontend/components/ui-components/typography/heading';
import NoobPage from '../../src/frontend/components/page/noob-page';
import { backendConfig } from '../../src/backend/utils/config/backend-config';
import styles from './about-us.module.css';

interface IPageProps {
  pageContent: {
    attributes: {
      title: string,
      description: string
    }
  } | null
}

const AboutUs = (props: IPageProps): JSX.Element => {
  const content = props.pageContent?.attributes;

  return (
    <NoobPage title="About Us" metaData={{ description: "Noob Storm about us page" }}>
      <Fragment>
        <Container maxWidth="xl">
          <Heading divider heading={"ABOUT US"}/>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={7}>
              <Typography className={commonStyles.primaryText} marginBottom={2} style={{ whiteSpace: 'pre-line' }}>{content?.title}</Typography>
              <Typography className={commonStyles.whiteText} marginBottom={2}>{content?.description}</Typography>
            </Grid>
            <Grid item xs={12} lg={5}>
              <img src="/images/about-us-hero.png" className={commonStyles.fillImage} />
            </Grid>
            <Grid item xs={12}>
              <Heading divider heading={"TEAM"} />
                <Grid container columns={{ xs: 16, sm: 8, md: 12, lg: 16 }} className={styles.mainContainer}>
                  {Array.from(Array(8)).map((_, index) => (
                    <Grid item xs={12} lg={4} key={index}>
                      <Box className={styles.container}>
                        <img src="/images/team1.png" className={styles.img1} />
                        <Box className={styles.box1}>
                          <Typography className={styles.text1}>Sumer Sandhu</Typography>
                          <Typography className={styles.text2}>Product owner</Typography>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
            </Grid>
          </Grid>
        </Container>
      </Fragment>
    </NoobPage>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const {
    cmsApiEndpoint,
    cmsApiToken
  } = backendConfig.client;

  try {
    const endpoint = cmsApiEndpoint + '/api/about-us';
    const res = await axios.get(endpoint, {
      headers: {
        'Authorization': 'Bearer ' + cmsApiToken
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
    return {
      props: {
        pageContent: null
      }
    }
  }
}

export default AboutUs