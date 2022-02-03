import * as React from 'react'
import type { NextPage } from 'next'
import NoobPage from '../../../../src/frontend/components/page/noob-page'
import commonStyles from '../../../../src/frontend/styles/common.module.css'
import { Container, Divider, Paper, Typography } from '@mui/material'
import Heading from '../../../../src/frontend/components/ui-components/typography/heading'
import { Box } from '@mui/system'
import NewsletterPoster from '../../../../src/frontend/components/newsletter-poster'
import TicketChats from '../../../../src/frontend/components/support/ticket/chat'

const NoobTicketCreatePage: NextPage = () => {
    return (
        <NoobPage
            title='Ticket Chat'
            metaData={{
                description: "Noob Storm ticket chat page"
            }}
        >
            <React.Fragment>
                <Heading
                    heading='For questions about your account,purchases, or general inquires.'
                    backgroundImage
                    backgroundImageUrl="/images/partner-with-us.png"
                />

                <Box className={commonStyles.container} sx={{ my: 5 }}>

                    <Divider light>
                        <Typography variant='h3' gutterBottom>
                            TICKET
                        </Typography>
                    </Divider>

                    <Container maxWidth='md'>
                        <TicketChats />
                    </Container>

                    <NewsletterPoster />

                </Box>
            </React.Fragment>
        </NoobPage>
    )
}

export default NoobTicketCreatePage