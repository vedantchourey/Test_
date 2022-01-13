import { TextField } from '@mui/material';
import * as React from 'react';
import { TextFieldProps } from '@mui/material/TextField/TextField';
import validator from 'validator';
import { isNullOrEmptyString } from '../../../common/utils/validation/validator';

type Props = TextFieldProps & {
  onChangeNumber: (value: number | undefined) => void;
};

export function NoobNumberInput(props: Props) {
  const {onChangeNumber, ...others} = props;

  function handleOnChange(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    const value = event.target.value;
    if (isNullOrEmptyString(value)) return onChangeNumber(undefined);
    if (validator.isNumeric(value)) return onChangeNumber(parseInt(value));
    onChangeNumber(NaN);
  }

  return (<TextField {...others} onChange={handleOnChange}/>)
}
