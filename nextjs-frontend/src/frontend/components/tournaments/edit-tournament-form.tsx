import { Container, Typography } from '@mui/material';
import {useStyles} from './create-tournament-form-styles';

interface Props {
  id: string;
}

export default function EditTournamentForm(props: Props) {
  const styles = useStyles();

  return (
    <Container maxWidth="md" className={styles.container}>
      <div className={styles.form}>
        <div className={styles.titleRow}>
          <Typography className={styles.title}>CREATE TOURNAMENT</Typography>
        </div>
        {/*<TournamentDetailsForm errors={{}}*/}
        {/*  value={{}}*/}
        {/*  onChange={() => {}}*/}
        {/*/>*/}
        <div className={styles.row}>
          <div className={styles.buttonGroup}>
            {/*<Button className={commonStyles.actionButton} onClick={onClickCreateTournament}><Typography>Create</Typography></Button>*/}
          </div>
        </div>
      </div>
    </Container>
  )
}
