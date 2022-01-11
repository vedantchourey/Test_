import { useAppDispatch, useAppSelector } from '../../../redux-store/redux-store';
import { allStatesSelector } from '../../../redux-store/countries/country-selectors';
import { useEffect, useState } from 'react';
import { fetchCountryStatesThunk } from '../../../redux-store/countries/country-slice';
import { Autocomplete, TextField } from '@mui/material';
import { IState } from '../../../../backend/services/database/repositories/state-repository';

interface Props {
  countryIsoCode?: string;
  onChange?: (id?: string, state?: IState | null) => void;
  value?: string;
  autoCompleteClassName?: string;
  inputClassName?: string;
  error?: boolean;
  helperText?: string;
}

export default function StateDropDown(props: Props) {
  const {countryIsoCode, value, onChange, autoCompleteClassName, inputClassName, error, helperText} = props;
  const appDispatch = useAppDispatch();
  const states = useAppSelector(allStatesSelector);
  const [selectedState, setSelectedState] = useState<IState | null>();

  const statesCheck = [...states].sort((x, y) => ('' + x.id).localeCompare(y.id)).join();

  useEffect(() => {
    const matchingState = states.filter(x => x.id === value)[0];
    if (matchingState?.id === selectedState?.id) return;
    setSelectedState(matchingState);
  }, [countryIsoCode, statesCheck]);

  useEffect(() => {
    if (countryIsoCode == null) return;
    appDispatch(fetchCountryStatesThunk(countryIsoCode))
  }, [countryIsoCode]);

  const onInputChange = (event: any, newValue: IState | null) => {
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
