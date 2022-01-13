import TournamentDetailsForm from './tournament-details-form';
import { useState } from 'react';
import { isThereAnyError, ValidationResult } from '../../../common/utils/validation/validator';
import { CreateOrEditTournamentRequest } from '../../../backend/services/tournament-service/create-or-edit-tournament-request';
import { validateTournament } from './tournament-details-validator';
import { Container, Typography } from '@mui/material';
import styles from './create-tournament-form.module.css';

interface Props {
  onCreated: (tournamentId: string) => void;
}

export default function CreateTournamentForm(props: Props) {
  const {onCreated} = props;
  const [errors, setErrors] = useState<ValidationResult<CreateOrEditTournamentRequest>>({});
  const [request, setRequest] = useState<Partial<CreateOrEditTournamentRequest>>({
    name: ''
  });

  const onChangeHandler = (value: Partial<CreateOrEditTournamentRequest>) => {
    setRequest(value);
    // const newErrors = validateTournament(value);
    // setErrors(newErrors);
    // if (isThereAnyError(newErrors)) return;
  };

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
      </div>
    </Container>
  )
}
