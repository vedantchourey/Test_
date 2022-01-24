import TournamentDetailsForm from './tournament-details-form';
import { useState } from 'react';
import { isThereAnyError, ValidationResult } from '../../../common/utils/validation/validator';
import { CreateOrEditTournamentRequest } from '../../../backend/services/tournament-service/create-or-edit-tournament-request';
import { Button, Container, Typography } from '@mui/material';
import styles from './create-tournament-form.module.css';
import commonStyles from '../../styles/common.module.css';
import { validateTournament } from './tournament-details-validator';
import { useAppDispatch, useAppSelector } from '../../redux-store/redux-store';
import { allGamesSelector } from '../../redux-store/games/game-selectors';
import { createTournament } from '../../service-clients/tournament-service-client';
import { setIsLoading } from '../../redux-store/screen-animations/screen-animation-slice';
import { daysFromToday } from '../../../common/utils/date-time-utils';

interface Props {
  onCreated: (tournamentId: string) => void;
}

export default function CreateTournamentForm(props: Props) {
  const {onCreated} = props;
  const [errors, setErrors] = useState<ValidationResult<CreateOrEditTournamentRequest>>({});
  const [request, setRequest] = useState<Partial<CreateOrEditTournamentRequest>>({tournamentName: '', isTeamParticipating: false, scheduleDate: daysFromToday(7)});
  const appDispatch = useAppDispatch();
  const allGames = useAppSelector(allGamesSelector);

  const onChangeHandler = (value: Partial<CreateOrEditTournamentRequest>) => {
    setRequest(value);
  };

  async function onClickCreateTournament() {
    const newErrors = validateTournament(request, allGames);
    setErrors(newErrors);
    if (isThereAnyError(newErrors)) return;
    try {
      appDispatch(setIsLoading(true));
      const response = await createTournament(request as CreateOrEditTournamentRequest);
      if (response.isError) {
        setErrors(response.errors);
      } else {
        setErrors({});
        onCreated(response.id);
      }
    } finally {
      appDispatch(setIsLoading(false));
    }

  }

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
