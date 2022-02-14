import { Autocomplete, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { TournamentType } from '../../../backend/services/tournament-service/tournament-type';

interface Props {
  value?: TournamentType;
  onChange?: (type: TournamentType | undefined) => void;
  autoCompleteClassName?: string;
  inputClassName?: string;
  error?: boolean;
  helperText?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

type IOption = { value: TournamentType, display: string };

const options: IOption[] = [
  {value: 'SingleElimination', display: 'Single elimination'},
  {value: 'League', display: 'League'}
]


export default function TournamentTypeDropDown(props: Props):JSX.Element {
  const {value, onChange, autoCompleteClassName, inputClassName, error, helperText, label, placeholder, disabled} = props;
  const [selectedType, setSelectedType] = useState<IOption | null>(null);

  useEffect(() => {
    if (value === selectedType?.value) return;
    const matchingValue = options.filter((x) => x.value === value)[0];
    setSelectedType(matchingValue);
  }, [selectedType?.value, value])


  const onInputChange = (event: unknown, newValue: IOption | null): void => {
    setSelectedType(newValue);
    onChange?.(newValue?.value);
  };

  return (
    <Autocomplete disablePortal
      className={autoCompleteClassName}
      options={options}
      value={selectedType}
      getOptionLabel={(x): string => x.display}
      onChange={onInputChange}
      disabled={disabled}
      isOptionEqualToValue={(option: IOption, value1: IOption): boolean => option.value === value1.value}
      renderInput={(params): JSX.Element => <TextField {...params}
        label={label}
        variant="filled"
        className={inputClassName}
        error={error}
        placeholder={placeholder}
        helperText={helperText}
      />}
    />
  )
}
