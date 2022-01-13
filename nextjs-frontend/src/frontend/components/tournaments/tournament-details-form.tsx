import { TextField } from "@mui/material";
import PlatformDropDown from '../drop-downs/platform-drop-down';
import GameDropDown from '../drop-downs/game-drop-down';
import { useState } from 'react';
import { CreateOrEditTournamentRequest } from '../../../backend/services/tournament-service/create-or-edit-tournament-request';
import { isNullOrEmptyString, ValidationResult } from '../../../common/utils/validation/validator';
import styles from './tournament-details-form.module.css';
import { IGameResponse } from '../../service-clients/messages/i-game-response';


interface Props {
  errors: ValidationResult<CreateOrEditTournamentRequest>;
  value: Partial<CreateOrEditTournamentRequest>;
  onChange: (value: Partial<CreateOrEditTournamentRequest>) => void;
}

export default function TournamentDetailsForm(props: Props) {
  const {errors, value, onChange} = props;

  const [allowedPlatformIds, setAllowedPlatformIds] = useState<string[]>([]);

  const onGameChanged = (id: string | undefined, selectedGame: IGameResponse | null) => {
    onChange({...value, gameId: id, platformId: undefined});
    setAllowedPlatformIds(selectedGame?.platformIds || []);
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.row}>
        <TextField label="Tournament Name"
                   placeholder="Enter tournament name"
                   error={errors.name != null}
                   value={value.name}
                   className={styles.column}
                   onChange={event => onChange({...value, name: event.target.value})}
        />
      </div>
      <div className={styles.row}>
        <div className={styles.column}>
          <GameDropDown label="Game"
                        placeholder="Select Game"
                        error={errors.gameId != null}
                        onChange={onGameChanged}
                        value={value.gameId}
                        inputClassName={styles.inputItem}
                        autoCompleteClassName={styles.inputItem}
          />
        </div>
        <div className={styles.column}>
          <PlatformDropDown label="Platform"
                            placeholder="Select Platform"
                            error={errors.platformId != null}
                            disabled={isNullOrEmptyString(value.gameId)}
                            allowedPlatformIds={allowedPlatformIds}
                            onChange={(id) => onChange({...value, platformId: id})}
                            inputClassName={styles.inputItem}
                            autoCompleteClassName={styles.inputItem}
                            value={value.platformId}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.column}>

        </div>
      </div>

    </div>
  );
}
