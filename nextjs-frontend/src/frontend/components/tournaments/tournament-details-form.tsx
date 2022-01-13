import { TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import PlatformDropDown from '../drop-downs/platform-drop-down';
import GameDropDown from '../drop-downs/game-drop-down';
import * as React from 'react';
import { useState } from 'react';
import { CreateOrEditTournamentRequest } from '../../../backend/services/tournament-service/create-or-edit-tournament-request';
import { getErrorForProp, isNullOrEmptyString, ValidationResult } from '../../../common/utils/validation/validator';
import styles from './tournament-details-form.module.css';
import { IGameResponse } from '../../service-clients/messages/i-game-response';
import { IGameMapResponse } from '../../service-clients/messages/i-game-map-response';
import GameMapDropDown from '../drop-downs/game-map-drop-down';
import MatchBestOfDropDown from '../drop-downs/match-best-of-drop-down';
import MatchFormatDropDown from '../drop-downs/match-formats-drop-down';
import { NoobNumberInput } from '../input/noob-number-input';
import TournamentTypeDropDown from '../drop-downs/tournament-type-drop-down';
import { DateTimePicker } from '@mui/lab';
import { parseDateTime, toISOString } from '../../../common/utils/date-time-utils';
import { DateTime } from 'luxon';


interface Props {
  errors: ValidationResult<CreateOrEditTournamentRequest>;
  value: Partial<CreateOrEditTournamentRequest>;
  onChange: (value: Partial<CreateOrEditTournamentRequest>) => void;
}

export default function TournamentDetailsForm(props: Props) {
  const {errors, value, onChange} = props;

  const [allowedPlatformIds, setAllowedPlatformIds] = useState<string[]>([]);
  const [allowedGameMaps, setAllowedGameMaps] = useState<IGameMapResponse[]>([]);

  const onGameChanged = (id: string | undefined, selectedGame: IGameResponse | null) => {
    setAllowedPlatformIds(selectedGame?.platformIds || []);
    setAllowedGameMaps(selectedGame?.gameMaps || []);
    onChange({...value, gameId: id, platformId: undefined, gameMapId: undefined});
  };

  const scheduledDateTime = isNullOrEmptyString(value.scheduledDateTime) ? undefined : parseDateTime(value.scheduledDateTime as string);

  return (
    <div className={styles.formContainer}>
      <div className={styles.row}>
        <TextField label="Tournament Name"
                   placeholder="Enter tournament name"
                   error={errors.name != null}
                   value={value.name}
                   className={styles.column}
                   onChange={event => onChange({...value, name: event.target.value})}
                   helperText={getErrorForProp(errors, 'name')}
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
                        helperText={getErrorForProp(errors, 'gameId')}
          />
        </div>
        <div className={styles.column}>
          <GameMapDropDown label="Game map"
                           placeholder="Select map"
                           options={allowedGameMaps}
                           value={value.gameMapId}
                           error={errors.gameMapId != null}
                           onChange={(id, state) => onChange({...value, gameMapId: id})}
                           inputClassName={styles.inputItem}
                           autoCompleteClassName={styles.inputItem}
                           disabled={allowedGameMaps.length === 0}
                           helperText={getErrorForProp(errors, 'gameMapId')}
          />
        </div>
      </div>
      <div className={styles.row}>
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
                            helperText={getErrorForProp(errors, 'platformId')}
          />
        </div>
        <div className={styles.column}>
          <MatchBestOfDropDown label="Match best of"
                               placeholder="Select match best of"
                               error={errors.matchBestOfId != null}
                               onChange={(id) => onChange({...value, matchBestOfId: id})}
                               inputClassName={styles.inputItem}
                               autoCompleteClassName={styles.inputItem}
                               value={value.matchBestOfId}
                               helperText={getErrorForProp(errors, 'matchBestOfId')}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.column}>
          <MatchFormatDropDown label="Match format"
                               placeholder="Select match format"
                               error={errors.matchFormatId != null}
                               onChange={(id) => onChange({...value, matchFormatId: id})}
                               inputClassName={styles.inputItem}
                               autoCompleteClassName={styles.inputItem}
                               value={value.matchFormatId}
                               helperText={getErrorForProp(errors, 'matchFormatId')}
          />
        </div>
        <div className={styles.column}>
          <TournamentTypeDropDown label="Tournament type"
                                  placeholder="Select type"
                                  error={errors.type != null}
                                  onChange={(type) => onChange({...value, type: type})}
                                  inputClassName={styles.inputItem}
                                  autoCompleteClassName={styles.inputItem}
                                  value={value.type}
                                  helperText={getErrorForProp(errors, 'type')}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.column}>
          <ToggleButtonGroup value={(value.isTeam === true).toString()}
                             exclusive
                             onChange={(event, selectedValue) => onChange({...value, isTeam: selectedValue === 'true'})}
                             aria-label="text alignment"
                             style={{flexGrow: 1, flexDirection: 'row'}}
          >
            <ToggleButton value="false" aria-label="left aligned" style={{flexGrow: 1, flexBasis: 0}}><Typography>Players</Typography></ToggleButton>
            <ToggleButton value="true" aria-label="left aligned" style={{flexGrow: 1, flexBasis: 0}}><Typography>Team</Typography></ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div className={styles.column}>
          <NoobNumberInput label={value.isTeam ? 'Number of teams' : 'Number of players'}
                           placeholder="Enter count"
                           error={errors.numberOfPlayers != null}
                           className={styles.column}
                           onChangeNumber={numberOfPlayers => onChange({...value, numberOfPlayers})}
                           helperText={getErrorForProp(errors, 'numberOfPlayers')}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.column}>
          <DateTimePicker label="Scheduled date time"
                          value={scheduledDateTime}
                          inputFormat="dd/MM/yyyy HH:mm"
                          onChange={(newValue: DateTime | null) => onChange({...value, scheduledDateTime: toISOString(newValue)})}
                          renderInput={(props) => <TextField {...props}
                                                             error={value.scheduledDateTime != null}
                                                             helperText={getErrorForProp(errors, 'scheduledDateTime')}
                          />}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.column}>
          <TextField label="Rules"
                     placeholder="Rule details"
                     multiline={true}
                     error={errors.rules != null}
                     className={styles.column}
                     rows={3}
                     onChange={event => onChange({...value, rules: event.target.value})}
          />
        </div>
      </div>

    </div>
  );
}
