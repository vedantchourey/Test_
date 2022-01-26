import { useAppDispatch, useAppSelector } from '../../redux-store/redux-store';
import { useEffect, useState } from 'react';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { allMatchBestOfSelector, matchBestOfFetchStatusSelector } from '../../redux-store/match-best-of/match-best-of-selectors';
import { IMatchBestOfResponse } from '../../service-clients/messages/i-match-best-of-response';
import { fetchAllMatchBestOfsThunk } from '../../redux-store/match-best-of/match-best-of-slice';

interface Props {
  onChange?: (id: string | undefined, state: IMatchBestOfResponse | null) => void;
  value?: string;
  autoCompleteClassName?: string;
  inputClassName?: string;
  error?: boolean;
  helperText?: string;
  label?: string;
  placeholder?: string;
}


export default function MatchBestOfDropDown(props: Props) {
  const {value, onChange, autoCompleteClassName, inputClassName, error, helperText, label, placeholder} = props;
  const appDispatch = useAppDispatch();
  const matchBestOfs = useAppSelector(allMatchBestOfSelector);
  const matchBestOfFetchStatus = useAppSelector(matchBestOfFetchStatusSelector);
  const [selectedBestOf, setSelectedBestOf] = useState<IMatchBestOfResponse | null>(null);
  const isLoading = matchBestOfFetchStatus === 'loading';

  useEffect(() => {
    if (matchBestOfFetchStatus !== 'idle') return;
    appDispatch(fetchAllMatchBestOfsThunk());
  }, [appDispatch, matchBestOfFetchStatus]);

  useEffect(() => {
    const matchingBestOf = matchBestOfs.filter((x) => x.id === value)[0];
    if (matchingBestOf?.id === selectedBestOf?.id) return;
    setSelectedBestOf(matchingBestOf || null);
  }, [matchBestOfs, selectedBestOf?.id, value]);


  const onInputChange = (event: unknown, newValue: IMatchBestOfResponse | null) => {
    setSelectedBestOf(newValue)
    onChange?.(newValue?.id, newValue || null);
  };

  return (
    <Autocomplete disablePortal
      className={autoCompleteClassName}
      options={matchBestOfs}
      getOptionLabel={(x) => x.displayName}
      loading={isLoading}
      renderInput={(params) => <TextField {...params}
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
      value={selectedBestOf}
      onChange={onInputChange}
    />
  )


}
