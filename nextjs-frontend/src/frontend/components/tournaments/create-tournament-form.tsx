import TournamentDetailsForm from './tournament-details-form';
import { useState } from 'react';
import { isThereAnyError, ValidationResult } from '../../../common/utils/validation/validator';
import { CreateOrEditTournamentRequest } from '../../../backend/services/tournament-service/create-or-edit-tournament-request';
import { validateTournament } from './tournament-details-validator';

interface Props {
  onCreated: (tournamentId: string) => void;
}

export default function CreateTournamentForm(props: Props) {
  const {onCreated} = props;
  const [errors, setErrors] = useState<ValidationResult<CreateOrEditTournamentRequest>>({});
  const [request, setRequest] = useState<Partial<CreateOrEditTournamentRequest>>({
    platformId: '',
    name: '',
    gameId: ''
  });

  const onChangeHandler = (value: Partial<CreateOrEditTournamentRequest>) => {
    setRequest(value);
    const newErrors = validateTournament(value);
    setErrors(newErrors);
    if (isThereAnyError(newErrors)) return;
  };

  return (
    <div>
      <TournamentDetailsForm errors={errors}
                             value={request}
                             onChange={onChangeHandler}
      />
    </div>
  )
}
