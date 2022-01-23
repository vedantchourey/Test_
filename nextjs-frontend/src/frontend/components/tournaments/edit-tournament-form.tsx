import { Button, Container, Typography } from '@mui/material';
import styles from './create-tournament-form.module.css';
import TournamentDetailsForm from './tournament-details-form';
import commonStyles from '../../styles/common.module.css';
import { useEffect, useState } from 'react';
import { CreateOrEditTournamentRequest } from '../../../backend/services/tournament-service/create-or-edit-tournament-request';

interface Props {
  id: string;
}

export default function EditTournamentForm(props: Props) {
  const {id} = props;

  const [request, setRequest] = useState<Partial<CreateOrEditTournamentRequest>>({});

  useEffect(() => {
    if (id === request.id) return;

  }, [id, request.id]);


  return (
    <Container maxWidth="md" className={styles.container}>
      <div className={styles.form}>
        <div className={styles.titleRow}>
          <Typography className={styles.title}>CREATE TOURNAMENT</Typography>
        </div>
        <TournamentDetailsForm errors={errors}
                               value={request}
                               onChange={onChangeHandler}
        />
        <div className={styles.row}>
          <div className={styles.buttonGroup}>
            <Button className={commonStyles.actionButton} onClick={onClickCreateTournament}><Typography>Create</Typography></Button>
          </div>
        </div>
      </div>
    </Container>
  )
}
