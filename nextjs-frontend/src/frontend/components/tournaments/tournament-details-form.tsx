import { TextField } from "@mui/material";
import PlatformDropDown from '../drop-downs/platform-drop-down';
import GameDropDown from '../drop-downs/game-drop-down';
import { useState } from 'react';
import { CreateOrEditTournamentRequest } from '../../../backend/services/tournament-service/create-or-edit-tournament-request';
import { ValidationResult } from '../../../common/utils/validation/validator';
import { IGame } from '../../../backend/services/database/models/i-game';


interface Props {
  errors: ValidationResult<CreateOrEditTournamentRequest>;
  value: Partial<CreateOrEditTournamentRequest>;
  onChange: (value: Partial<CreateOrEditTournamentRequest>) => void;
}

export default function TournamentDetailsForm(props: Props) {
  const {errors, value, onChange} = props;

  const [allowedPlatformIds, setAllowedPlatformIds] = useState<string[]>([]);

  const onGameChanged = (id: string | null, selectedGame: IGame | null) => {
    onChange({...value, gameId: id || '', platformId: ''});
    setAllowedPlatformIds(selectedGame?.platformIds || []);
  };

  return (
    <>
      <TextField label="Tournament Name"
                 placeholder="Enter tournament name"
                 error={errors.name != null}
                 value={value.name}
                 onChange={event => onChange({...value, name: event.target.value})}
      />
      <GameDropDown label="Game"
                    placeholder="Select Game"
                    error={errors.gameId != null}
                    onChange={onGameChanged}
                    value={value.gameId}
      />
      <PlatformDropDown label="Platform"
                        placeholder="Select Platform"
                        error={errors.platformId != null}
                        disabled={value.gameId == null}
                        allowedPlatformIds={allowedPlatformIds}
                        onChange={(id) => onChange({...value, platformId: id})}
      />
    </>
  );
}
