import * as React from 'react'
import type { GetServerSideProps } from 'next'
import NoobPage from '../../../../src/frontend/components/page/noob-page'
import commonStyles from '../../../../src/frontend/styles/common.module.css'
import { Container, Divider, Typography } from '@mui/material'
import Heading from '../../../../src/frontend/components/ui-components/typography/heading'
import { Box } from '@mui/system'
import NewsletterPoster from '../../../../src/frontend/components/newsletter-poster'
import TicketChats from '../../../../src/frontend/components/support/ticket/chat'

interface Chat {
  profileImage: string,
  comment: string,
  userName: string,
  created_at: string,
}

interface Props {
  ticketNumber: string;
  ticketSubject: string;
  chats: Chat[];
}

const NoobTicketCreatePage = (props: Props): JSX.Element => {
  const { ticketNumber, ticketSubject, chats } = props;

  return (
    <NoobPage
      title='Ticket Chat'
      metaData={{
        description: "Noob Storm ticket chat page"
      }}
    >
      <React.Fragment>
        <Heading
          heading='For questions about your account, purchases, or general inquires.'
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
            <TicketChats ticketNumber={ticketNumber} ticketSubject={ticketSubject} chats={chats} />
          </Container>

        </Box>
      </React.Fragment>
    </NoobPage>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    // todo integrate fetch api here
    return {
      props: {
        ticketNumber: "2020-8697",
        ticketSubject: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        chats: [{
          userName: "Guy Hawkins",
          profileImage: "",
          created_at: '04/09/2021, 19:21',
          comment: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`
        }]
      }
    }
  } catch (error) {
    return {
      props: {
        ticketNumber: "",
        ticketSubject: "",
        chats: []
      }
    }
  }
}

export default NoobTicketCreatePage
