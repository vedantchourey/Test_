import { useAppDispatch, useAppSelector } from '../../redux-store/redux-store';
import { useEffect, useState } from 'react';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { IMatchFormatResponse } from '../../service-clients/messages/i-match-format-response';
import { allMatchFormatsSelector, matchFormatsFetchStatusSelector } from '../../redux-store/match-format/match-format-selectors';
import { fetchAllMatchFormatsThunk } from '../../redux-store/match-format/match-format-slice';

interface Props {
  onChange?: (id: string | undefined, state: IMatchFormatResponse | null) => void;
  value?: string;
  autoCompleteClassName?: string;
  inputClassName?: string;
  error?: boolean;
  helperText?: string;
  label?: string;
  placeholder?: string;
}


export default function MatchFormatDropDown(props: Props) {
  const {value, onChange, autoCompleteClassName, inputClassName, error, helperText, label, placeholder} = props;
  const appDispatch = useAppDispatch();
  const matchFormats = useAppSelector(allMatchFormatsSelector);
  const matchFormatsFetchStatus = useAppSelector(matchFormatsFetchStatusSelector);
  const [selectedFormat, setSelectedFormat] = useState<IMatchFormatResponse | null>(null);
  const isLoading = matchFormatsFetchStatus === 'loading';

  useEffect(() => {
    if (matchFormatsFetchStatus !== 'idle') return;
    appDispatch(fetchAllMatchFormatsThunk());
  }, [appDispatch, matchFormatsFetchStatus]);

  useEffect(() => {
    const matchingFormat = matchFormats.filter((x) => x.id === value)[0];
    if (matchingFormat?.id === selectedFormat?.id) return;
    setSelectedFormat(matchingFormat || null);
  }, [matchFormats, selectedFormat?.id, value]);


  const onInputChange = (event: unknown, newValue: IMatchFormatResponse | null) => {
    setSelectedFormat(newValue)
    onChange?.(newValue?.id, newValue || null);
  };

  return (
    <Autocomplete disablePortal
      className={autoCompleteClassName}
      options={matchFormats}
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
      value={selectedFormat}
      onChange={onInputChange}
    />
  )


}
