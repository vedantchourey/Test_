import * as React from 'react'
import type { NextPage } from 'next'
import NoobPage from '../../../../src/frontend/components/page/noob-page'
import commonStyles from '../../../../src/frontend/styles/common.module.css'
import { Container, Divider, Typography } from '@mui/material'
import Heading from '../../../../src/frontend/components/ui-components/typography/heading'
import { Box } from '@mui/system'
//import NewsletterPoster from '../../../../src/frontend/components/newsletter-poster'
import CreateTicketForm from '../../../../src/frontend/components/support/ticket/create-ticket'

const NoobTicketCreatePage: NextPage = () => {
  return (
    <NoobPage
      title='Create Ticket'
      metaData={{
        description: "Noob Storm create ticket page"
      }}
    >
      <React.Fragment>
        <Heading
          heading='For questions about your account,purchases, or general inquires.'
          backgroundImage
          backgroundImageUrl="/images/partner-with-us.png"
        />

        <Box className={commonStyles.container} sx={{ my: 5 }}>

          <Container maxWidth='md' sx={{ my: 5 }}>

            <Divider light>
              <Typography variant='h3'>
                                CREATE TICKET
              </Typography>
            </Divider>

            <CreateTicketForm />

          </Container>
          
        </Box>
      </React.Fragment>
    </NoobPage>
  )
}

export default NoobTicketCreatePage