import { Autocomplete, TextField } from '@mui/material';
import { IGameMapResponse } from '../../service-clients/messages/i-game-map-response';

interface Props {
  value?: string;
  options: IGameMapResponse[];
  onChange?: (id: string | undefined, state: IGameMapResponse | null) => void;
  autoCompleteClassName?: string;
  inputClassName?: string;
  error?: boolean;
  helperText?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}


export default function GameMapDropDown(props: Props) {
  const {value, options, onChange, autoCompleteClassName, inputClassName, error, helperText, label, placeholder, disabled} = props;
  const selectedMap = options.filter(x => x.id === value)[0] || null;

  const onInputChange = (event: any, newValue: IGameMapResponse | null) => {
    onChange?.(newValue?.id, newValue);
  };

  return (
    <Autocomplete disablePortal
                  className={autoCompleteClassName}
                  options={options}
                  value={selectedMap}
                  getOptionLabel={x => x.displayName}
                  onChange={onInputChange}
                  disabled={disabled}
                  isOptionEqualToValue={(option: IGameMapResponse, value1: IGameMapResponse) => option.id === value1.id}
                  renderInput={(params) => <TextField {...params}
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
