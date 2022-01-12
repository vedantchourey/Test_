import { IPlatform } from '../../../backend/services/database/models/i-platform';
import { useAppDispatch, useAppSelector } from '../../redux-store/redux-store';
import { useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { getAllPlatformsStatusSelector, platformsByIdsSelector } from '../../redux-store/platforms/platform-selectors';
import { fetchAllPlatformsThunk } from '../../redux-store/platforms/platform-slice';


interface Props {
  onChange?: (id?: string, state?: IPlatform | null) => void;
  value?: string;
  autoCompleteClassName?: string;
  inputClassName?: string;
  error?: boolean;
  helperText?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  allowedPlatformIds: string[];
}


export default function PlatformDropDown(props: Props) {
  const {value, onChange, autoCompleteClassName, inputClassName, error, helperText, label, placeholder, disabled, allowedPlatformIds} = props;
  const appDispatch = useAppDispatch();
  const platforms = useAppSelector(x => platformsByIdsSelector(x, allowedPlatformIds));
  const platformsFetchStatus = useAppSelector(getAllPlatformsStatusSelector);
  const [selectedPlatform, setSelectedPlatform] = useState<IPlatform | null>();

  useEffect(() => {
    if (platformsFetchStatus !== 'idle') return;
    appDispatch(fetchAllPlatformsThunk());
  }, [appDispatch, platformsFetchStatus]);

  useEffect(() => {
    const matchingPlatform = platforms.filter(x => x.id === value);
    setSelectedPlatform(matchingPlatform[0]);
  }, [platforms, value]);

  const onInputChange = (event: any, newValue: IPlatform | null) => {
    setSelectedPlatform(newValue)
    onChange?.(newValue?.id, newValue);
  };

  return (
    <Autocomplete disablePortal
                  className={autoCompleteClassName}
                  options={platforms}
                  getOptionLabel={x => x.displayName}
                  renderInput={(params) => <TextField {...params}
                                                      label={label}
                                                      variant="filled"
                                                      className={inputClassName}
                                                      error={error}
                                                      placeholder={placeholder}
                                                      helperText={helperText}
                  />}
                  value={selectedPlatform || null}
                  onChange={onInputChange}
                  disabled={disabled}
    />
  )
}
