import Link from 'next/link'
import { Box, Button, Card, CardActions, CardContent, CardHeader, Container, Divider, Grid, Typography } from "@mui/material";
import TicketIcon from "../../../icons/ticket-icon";
import MessageIcon from "../../../icons/message-icon";
import styles from './ticket-history.module.css'

interface Props {
  _id: string | number,
  status: 'active' | 'solved';
  ticketNumber: string;
  query: string;
  answer: string;
  created_at: Date;
  commentCount: number
}

export default function TicketHisoryCard({ _id, answer, created_at, ticketNumber, query, status, commentCount }: Props): JSX.Element {
  return (
    <Card className={styles.cardBackground} sx={{ my: 5 }}>
      <Container>
        <CardHeader
          avatar={
            <TicketIcon style={{ width: 32, height: 32 }} />
          }
          action={
            <Typography variant='body1' color={status == 'active' ? 'success.main' : 'secondary'}>
              {status}
            </Typography>
          }
          title={`Ticket #${ticketNumber}`}
        />
        <CardContent>
          <Typography align='left' variant="h3" gutterBottom color="primary">
            {query}
          </Typography>
          <Typography align='left' variant="body1">
            {answer}
          </Typography>
        </CardContent>

        <Divider light />

        <CardActions>
          <Grid container spacing={2}>
            <Grid item xs={12} md={5} className={styles.flexRow}>
              <Typography align='left' variant="body1">
                {created_at}
              </Typography>
              <Box className={styles.flexRow}>
                <MessageIcon />
                <Typography align='left' ml={2} variant="body1">
                  {commentCount}
                </Typography>
              </Box>
            </Grid>
            <Grid item ml='auto' className={styles.cardButton} xs={12} md={3}>
              <Link href={`/support/ticket/chat?ticketId=${_id}`}>
                <a>
                  <Button variant='contained'>VIEW TICKET</Button>
                </a>
              </Link>
            </Grid>
          </Grid>
        </CardActions>
      </Container>
    </Card >
  )
}