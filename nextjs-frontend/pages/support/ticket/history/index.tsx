import * as React from 'react'
import type { GetServerSideProps, NextPage } from 'next'
import NoobPage from '../../../../src/frontend/components/page/noob-page'
import commonStyles from '../../../../src/frontend/styles/common.module.css'
import { Container, Divider, Typography } from '@mui/material'
import Heading from '../../../../src/frontend/components/ui-components/typography/heading'
import { Box } from '@mui/system'
import NewsletterPoster from '../../../../src/frontend/components/newsletter-poster'
import TicketHisoryCard from '../../../../src/frontend/components/support/ticket/history/ticketHistoryCard'

interface Props {
    tickets?: Array<string>
}

const NoobTicketHistoryPage = ({ tickets }: Props): JSX.Element => {
    return (
        <NoobPage
            title='Ticket History'
            metaData={{
                description: "Noob Storm ticket history page"
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
                            TICKET HISTORY
                        </Typography>
                    </Divider>

                    <Container maxWidth='md'>
                        {Array.isArray(tickets) && tickets.map((ticket, i) => (
                            <React.Fragment key={i}>
                                <TicketHisoryCard  {...ticket} />
                            </React.Fragment>
                        ))}
                    </Container>

                    <NewsletterPoster />
                </Box>

            </React.Fragment>
        </NoobPage>
    )
}

export async function getServerSideProps() {
    try {
        // todo make an api call here
        return {
            props: {
                tickets: [
                    {
                        _id: 1,
                        status: 'active',
                        ticketNumber: `2020-8697`,
                        query: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
                        answer: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type...`,
                        created_at: `10 OCT 2018 08:10 PM`,
                        commentCount: 2
                    },
                    {
                        _id: 2,
                        status: 'solved',
                        ticketNumber: `2020-8697`,
                        query: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
                        answer: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type...`,
                        created_at: `10 OCT 2018 08:10 PM`,
                        commentCount: 2
                    }
                ]
            }
        }
    } catch (error) {
        return {
            props: {
                tickets: []
            }
        }
    }
}

export default NoobTicketHistoryPage