import React, { useEffect, useState } from 'react';
import { Button, Grid, TextField, Typography } from '@mui/material';
import commonStyles from '../../../styles/common.module.css'
import { getErrorForProp, isThereAnyError, propsHasError, ValidationResult } from '../../../../common/utils/validation/validator';
import { useAppDispatch } from '../../../redux-store/redux-store';
import { NewPasswordRequest } from '../../../../backend/services/auth-service/reset-password/reset-password-contracts';
import { validateNewPasswordInputs } from './validator';
import { setIsLoading } from '../../../redux-store/screen-animations/screen-animation-slice';
import { resetPasswordManually } from '../../../service-clients/auth-service-client';
import { useRouter } from 'next/router';

interface Props {
  onResetHandler: () => void,
}

const SetNewPassword = ({ onResetHandler }: Props) => {

  const router = useRouter()
  const appDispatch = useAppDispatch();
  const [errors, setErrors] = useState<ValidationResult<NewPasswordRequest>>({});
  const [request, setRequest] = useState<Partial<NewPasswordRequest>>({
    password: '',
    confirm_password: '',
    token: ''
  });

  async function onClickResetPassword() {
    const validationResults = await validateNewPasswordInputs(request);
    setErrors(validationResults);
    if (isThereAnyError(validationResults)) return;
    try {
      appDispatch(setIsLoading(true));
      const response = await resetPasswordManually(request as NewPasswordRequest);
      if (!response.isError) {
        onResetHandler();
      } else {
        setErrors(response.errors);
      }
    } catch (err: any) {
      setErrors({ password: err.errors?.apiError?.message || "Error occured" });
    } finally {
      appDispatch(setIsLoading(false));
    }
  }

  useEffect(() => {
    const location = router.asPath.split("?")[1];
    const urlParams = new URLSearchParams(location)
    const token = urlParams.get("token")
    setRequest((pre) => ({
      ...pre,
      token
    }))
  }, [])

  return (
    <Grid container spacing={3}>

      <Grid item xs={12}>
        <Typography align='left' variant={"h3"}>
          Enter your new password below.
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography align='left' mb={1} variant={"h3"}>
          New password
        </Typography>
        <TextField
          id="password"
          type="password"
          size='small'
          variant="filled"
          value={request.password}
          error={propsHasError(errors, 'password')}
          helperText={getErrorForProp(errors, 'password')}
          onChange={(event) => setRequest({ ...request, password: event.target.value })}
          fullWidth
          InputProps={{ disableUnderline: true }}
          inputProps={{
            style: {
              padding: 12
            }
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <Typography align='left' mb={1} variant={"h3"}>
          Confirm password
        </Typography>
        <TextField
          id="confirm_password"
          type="password"
          size='small'
          variant="filled"
          value={request.confirm_password}
          error={propsHasError(errors, 'confirm_password')}
          helperText={getErrorForProp(errors, 'confirm_password')}
          onChange={(event) => setRequest({ ...request, confirm_password: event.target.value })}
          fullWidth
          InputProps={{ disableUnderline: true }}
          inputProps={{
            style: {
              padding: 12
            }
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <Button className={commonStyles.actionButton} variant='contained' onClick={onClickResetPassword}>
          <Typography variant={'h3'}>
            Reset Password
          </Typography>
        </Button>
      </Grid>

      <Grid item xs={12}>
        <Typography align='left' variant={'h3'}>
          * The password should be at least twelve characters long. To make it stronger, use upper and lower case letters, numbers, and symbols like ! " ? $ % ^.
        </Typography>
      </Grid>

    </Grid>
  )
}

export default SetNewPassword