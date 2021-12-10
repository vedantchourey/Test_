import { StateResponse } from '../../../service-clients/country-service/state-response';
import { useAppDispatch, useAppSelector } from '../../../store/redux-store';
import { countryAllStatesSelector } from '../../../store/countries/country-selectors';
import { useEffect, useState } from 'react';
import { fetchCountryStatesThunk } from '../../../store/countries/country-slice';
import { Autocomplete, TextField } from '@mui/material';

interface Props {
  countryId?: number;
  onChange?: (id?: number, state?: StateResponse | null) => void;
  value?: number;
  autoCompleteClassName?: string;
  inputClassName?: string;
  error?: boolean;
  helperText?: string;
}

export default function StateDropDown(props: Props) {
  const {countryId, value, onChange, autoCompleteClassName, inputClassName, error, helperText} = props;
  const appDispatch = useAppDispatch();
  const states = useAppSelector(x => countryAllStatesSelector(x, countryId));
  const [selectedState, setSelectedState] = useState<StateResponse | null>();

  const statesCheck = [...states].sort(x => x.id).join();
  useEffect(() => {
    const matchingState = states.filter(x => x.id === value)[0];
    if (matchingState?.id === selectedState?.id) return;
    setSelectedState(matchingState);
  }, [countryId, statesCheck]);

  useEffect(() => {
    if (countryId == null) return;
    appDispatch(fetchCountryStatesThunk(countryId))
  }, [countryId]);

  const onInputChange = (event: any, newValue: StateResponse | null) => {
    setSelectedState(newValue)
    onChange?.(newValue?.id, newValue);
  };

  return (
    <Autocomplete disablePortal
                  className={autoCompleteClassName}
                  options={states}
                  getOptionLabel={x => x.displayName}
                  renderInput={(params) => <TextField {...params}
                                                      label="State"
                                                      variant="filled"
                                                      className={inputClassName}
                                                      error={error}
                                                      helperText={helperText}
                  />}
                  value={selectedState || null}
                  onChange={onInputChange}
    />
  )
}
