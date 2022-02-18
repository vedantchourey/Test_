import React, { FormEvent, useState } from 'react';
import { Button, Grid, TextField, Typography } from '@mui/material';
import commonStyles from '../../../styles/common.module.css'
import { getErrorForProp, isThereAnyError, propsHasError, ValidationResult } from '../../../../common/utils/validation/validator';
import { useAppDispatch } from '../../../redux-store/redux-store';
import { ResetPasswordErrors, ResetPasswordRequest } from '../../../../backend/services/auth-service/reset-password/reset-password-contracts';
import { validateResetPassword } from './validator';
import { setIsLoading } from '../../../redux-store/screen-animations/screen-animation-slice';
import { resetPassword } from '../../../service-clients/auth-service-client';

interface Props {
  onResetHandler: () => void
}

/*TODO integrating with api */
const ResetPasswordRequestCode = ({ onResetHandler }: Props): JSX.Element => {

  const appDispatch = useAppDispatch();
  const [errors, setErrors] = useState<ValidationResult<Partial<ResetPasswordErrors>>>({});
  const [request, setRequest] = useState<Partial<ResetPasswordRequest>>({
    email: '',
    // phone: ''
  });

  async function onClickResetPassword(e: FormEvent): Promise<void> {
    e.preventDefault()

    const validationResults = await validateResetPassword(request);
    setErrors(validationResults);
    if (isThereAnyError(validationResults)) return;
    try {
      appDispatch(setIsLoading(true));
      const response = await resetPassword(request as ResetPasswordRequest);
      if (!response.isError) {
        onResetHandler();
      } else {
        setErrors(response.errors);
      }
    } catch (err) {
      setErrors({ email:  "Error occured" });
    } finally {
      appDispatch(setIsLoading(false));
    }
  }

  const handleChangeValue = (e: { target: { value: string } }): void => {
    const { value } = e.target;
    setRequest({ email: value })
    // if (/^[\d]+$/gi.test(value)) {
    // setRequest({ email: '', phone: value })
    // } else {
    // setRequest({ phone: '', email: value })
    // }
  }

  return (
    <form noValidate autoComplete='off' onSubmit={onClickResetPassword}>
      <Grid container spacing={3}>

        <Grid item xs={12}>
          <Typography align='left' variant={"h3"}>
            Please enter your phone number or email address. You will receive a code to create a new password via email.
          </Typography >
        </Grid >

        <Grid item xs={12}>
          <Typography align='left' mb={1} variant={"h3"}>
            E-mail
          </Typography >
          <TextField
            id="email"
            variant="filled"
            value={request.email}
            error={propsHasError(errors, "email")}
            helperText={getErrorForProp(errors, "email")}
            // value={request.email || request.phone}
            // error={propsHasError(errors, request.email ? "email" : "phone")}
            // helperText={getErrorForProp(errors, request.email ? "email" : "phone")}
            onChange={handleChangeValue}
            fullWidth
            InputProps={{ disableUnderline: true }}
            inputProps={{
              style: {
                padding: 12
              }
            }}
          />
        </Grid >

        <Grid item xs={12}>
          <Button className={commonStyles.actionButton} variant="contained" type='submit'>
            <Typography>Send</Typography>
          </Button>
        </Grid>

      </Grid >
    </form >
  )
}

export default ResetPasswordRequestCode
