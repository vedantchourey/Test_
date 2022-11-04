import { useAppDispatch, useAppSelector } from '../../redux-store/redux-store';
import { allStatesSelector, statesFetchStatusSelector } from '../../redux-store/countries/country-selectors';
import { useEffect, useState } from 'react';
import { fetchCountryStatesThunk } from '../../redux-store/countries/country-slice';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { IState } from '../../../backend/services/database/models/i-state';

interface Props {
  countryIsoCode?: string;
  onChange?: (id: string | null, state: IState | null) => void;
  value?: string;
  autoCompleteClassName?: string;
  inputClassName?: string;
  error?: boolean;
  helperText?: string;
}

export default function StateDropDown(props: Props): JSX.Element {
  const {countryIsoCode, value, onChange, autoCompleteClassName, inputClassName, error, helperText} = props;
  const appDispatch = useAppDispatch();
  const states = useAppSelector(allStatesSelector);
  const statesFetchStatus = useAppSelector(statesFetchStatusSelector);
  const [selectedState, setSelectedState] = useState<IState | null>(null);
  const isLoading = statesFetchStatus === 'loading';

  const statesCheck = [...states].sort((x, y) => (String(x.id)).localeCompare(y.id)).join();

  useEffect(() => {
    const matchingState = states.filter((x) => x.id === value)[0];
    if (matchingState?.id === selectedState?.id) return;
    setSelectedState(matchingState || null);
  }, [countryIsoCode, selectedState?.id, states, statesCheck, value]);

  useEffect(() => {
    if (countryIsoCode == null) return;
    appDispatch(fetchCountryStatesThunk(countryIsoCode))
  }, [appDispatch, countryIsoCode]);

  const onInputChange = (event: unknown, newValue: IState | null): void => {
    setSelectedState(newValue)
    onChange?.(newValue?.id || null, newValue);
  };

  return (
    <Autocomplete disablePortal
      style={{fontSize: 10}}
      fullWidth
      className={autoCompleteClassName}
      options={states}
      getOptionLabel={(x): string => x.displayName}
      renderInput={(params): JSX.Element => <TextField {...params}
        label="State"
        variant="filled"
        className={inputClassName}
        error={error}
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
      value={selectedState}
      onChange={onInputChange}
    />
  )
}
