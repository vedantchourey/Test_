import { useAppDispatch, useAppSelector } from '../../redux-store/redux-store';
import { useEffect, useState } from 'react';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { gamesByPlatformSelector, gamesFetchStatusSelector } from '../../redux-store/games/game-selectors';
import { fetchAllGamesThunk } from '../../redux-store/games/game-slice';
import { IGameResponse } from '../../service-clients/messages/i-game-response';

interface Props {
  platformId?: string;
  onChange?: (id: string | undefined, state: IGameResponse | null) => void;
  value?: string;
  autoCompleteClassName?: string;
  inputClassName?: string;
  error?: boolean;
  helperText?: string;
  label?: string;
  placeholder?: string;
}

export default function GameDropDown(props: Props): JSX.Element {
  const {value, onChange, autoCompleteClassName, inputClassName, error, helperText, label, platformId, placeholder} = props;
  const appDispatch = useAppDispatch();
  const games = useAppSelector((x) => gamesByPlatformSelector(x, platformId));
  const gamesFetchStatus = useAppSelector(gamesFetchStatusSelector);
  const [selectedGame, setSelectedGame] = useState<IGameResponse | null>(null);
  const isLoading = gamesFetchStatus === 'loading';

  useEffect(() => {
    if (gamesFetchStatus !== 'idle') return;
    appDispatch(fetchAllGamesThunk());
  }, [appDispatch, gamesFetchStatus]);

  useEffect(() => {
    const matchingGame = games.filter((x) => x.id === value)[0];
    if (matchingGame?.id === selectedGame?.id) return;
    setSelectedGame(matchingGame || null);
  }, [games, selectedGame?.id, value]);


  const onInputChange = (event: unknown, newValue: IGameResponse | null): void => {
    setSelectedGame(newValue)
    onChange?.(newValue?.id, newValue || null);
  };

  return (
    <Autocomplete disablePortal
      className={autoCompleteClassName}
      options={games}
      getOptionLabel={(x): string => x.displayName}
      loading={isLoading}
      renderInput={(params): JSX.Element => <TextField {...params}
        label={label}
        variant="filled"
        className={inputClassName}
        error={error}
        placeholder={placeholder}
        helperText={helperText}
        InputProps={{
          ...params.InputProps,
          endAdornment: (
            <div>
              {isLoading ? <CircularProgress color="inherit" size={20}/> : null}
              {params.InputProps.endAdornment}
            </div>
          )
        }}
      />}
      value={selectedGame}
      onChange={onInputChange}
    />
  )


}
