import { IPlatformResponse } from '../../service-clients/messages/i-platform-response';
import { useAppDispatch, useAppSelector } from '../../redux-store/redux-store';
import { useEffect, useState } from 'react';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { getAllPlatformsSelector, getAllPlatformsStatusSelector } from '../../redux-store/platforms/platform-selectors';
import { fetchAllPlatformsThunk } from '../../redux-store/platforms/platform-slice';


interface Props {
  onChange?: (id: string | undefined, state: IPlatformResponse | null) => void;
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


export default function PlatformDropDown(props: Props): JSX.Element {
  const {value, onChange, autoCompleteClassName, inputClassName, error, helperText, label, placeholder, disabled, allowedPlatformIds} = props;
  const appDispatch = useAppDispatch();
  const platforms = useAppSelector(getAllPlatformsSelector);
  const platformsFetchStatus = useAppSelector(getAllPlatformsStatusSelector);
  const [selectedPlatform, setSelectedPlatform] = useState<IPlatformResponse | null>(null);
  const isLoading = platformsFetchStatus === 'loading';

  useEffect(() => {
    if (platformsFetchStatus !== 'idle') return;
    appDispatch(fetchAllPlatformsThunk());
  }, [appDispatch, platformsFetchStatus]);

  useEffect(() => {
    const matchingPlatform = platforms.filter((x) => x.id === value)[0];
    if (matchingPlatform?.id === selectedPlatform?.id) return;
    setSelectedPlatform(matchingPlatform || null);
  }, [platforms, selectedPlatform?.id, value]);

  const onInputChange = (event: unknown, newValue: IPlatformResponse | null): void => {
    setSelectedPlatform(newValue)
    onChange?.(newValue?.id, newValue);
  };

  const optionDisabled = (option: IPlatformResponse): boolean => allowedPlatformIds.indexOf(option.id) === -1;
  return (
    <Autocomplete disablePortal
      className={autoCompleteClassName}
      options={platforms}
      value={selectedPlatform}
      getOptionLabel={(x): string => x.displayName}
      getOptionDisabled={optionDisabled}
      onChange={onInputChange}
      disabled={disabled}
      isOptionEqualToValue={(option: IPlatformResponse, value1: IPlatformResponse): boolean => option.id === value1.id}
      renderInput={(params): JSX.Element => <TextField {...params}
        label={label}
        variant="outlined"
        size='medium'
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
    />
  )
}
