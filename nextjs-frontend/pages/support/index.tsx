import * as React from 'react'
import Link from 'next/link'
import type { NextPage } from 'next'
import NoobPage from '../../src/frontend/components/page/noob-page'
import commonStyles from '../../src/frontend/styles/common.module.css'
import { Divider, Typography, Icon, Grid, Card, CardContent } from '@mui/material'
import Heading from '../../src/frontend/components/ui-components/typography/heading'
import { Box } from '@mui/system'
//import NewsletterPoster from '../../src/frontend/components/newsletter-poster'
import HistoryIcon from '@mui/icons-material/History';
import styles from './support.module.css';
// import LiveChatIcon from '../../src/frontend/components/icons/live-chat-icon'
// import TicketIcon from '../../src/frontend/components/icons/ticket-icon'

const NoobSupportPage: NextPage = () => {
  return (
    <NoobPage
      title='Support'
      metaData={{
        description: "Noob Storm support page"
      }}
    >
      <React.Fragment>
        <Heading
          heading='For questions about your account,purchases, or general inquires.'
          backgroundImage
          backgroundImageUrl="/images/partner-with-us.png"
        />

        <Box className={commonStyles.container} sx={{ my: 5 }}>

          <Divider>
            <Typography variant='h3'>
                            SUPPORT
            </Typography>
          </Divider>

          <Grid container spacing={2} sx={{ my: 5, py: 5 }}>
            {[
              {
                to: '/support/ticket/create',
                icon: <Icon className={styles.iconContainer} color='action'>
                  <HistoryIcon />
                </Icon>,
                head: 'Create Ticket',
                sub: `Lorem Ipsum has been the industry's standard dummy 0.32.`,
              },
              {
                to: '/support/ticket/history',
                icon: <Icon className={styles.iconContainer} color='action'>
                  <HistoryIcon />
                </Icon>,
                head: 'Ticket History',
                sub: `Lorem Ipsum has been the industry's standard dummy 0.32.`,
              },
              {
                to: '/support/ticket/chat',
                icon: <Icon className={styles.iconContainer} color='action'>
                  <HistoryIcon />
                </Icon>,
                head: 'Live Chat',
                sub: `Lorem Ipsum has been the industry's standard dummy 0.32.`,
              },
            ].map((_, i) => (
              <Grid item key={i} className={styles.gridContainer} xs={12} lg={4}>
                <Link href={_.to}>
                  <a>
                    <Card className={styles.card}>
                      <CardContent className={styles.cardContent}>
                        {_.icon}
                        <Typography variant='h3'>
                          {_.head}
                        </Typography>

                        <Typography variant='body1'>
                          {_.sub}
                        </Typography>

                      </CardContent>
                    </Card>
                  </a>
                </Link>
              </Grid>
            ))}
          </Grid>

        </Box>

      </React.Fragment>
    </NoobPage>
  )
}

export default NoobSupportPage