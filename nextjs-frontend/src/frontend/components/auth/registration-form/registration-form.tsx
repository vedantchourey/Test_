import { DesktopDatePicker } from '@mui/lab';
import { Button, Checkbox, FormControl, FormControlLabel, FormHelperText, TextField, Typography } from '@mui/material';
import { DateTime } from 'luxon';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
import { SignupRequest } from '../../../../backend/services/auth-service/signup/signup-contracts';
import { parseDateTime, toISOString } from '../../../../common/utils/date-time-utils';
import { getErrorForProp, isThereAnyError, propsHasError, ValidationResult } from '../../../../common/utils/validation/validator';
import { useAppDispatch } from '../../../redux-store/redux-store';
import { setIsLoading } from '../../../redux-store/screen-animations/screen-animation-slice';
import { signUp } from '../../../service-clients/auth-service-client';
import commonStyles from '../../../styles/common.module.css';
import StateDropDown from '../../drop-downs/state-drop-down';
import styles from './registration-form.module.css';
import { validateSignUp } from './validator';

interface Props {
  onSignUpSuccess: (userId: string | undefined) => void;
}

export default function RegistrationForm(props: Props): JSX.Element {
  const { onSignUpSuccess } = props;
  const appDispatch = useAppDispatch();
  const [errors, setErrors] = useState<ValidationResult<SignupRequest>>({});

  const [request, setRequest] = useState<Partial<SignupRequest>>({
    email: '',
    password: '',
    phone: '',
    firstName: '',
    lastName: '',
    agreeToTnc: false,
    username: '',
    countryId: '',
  });

  const handleTncChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setRequest({ ...request, agreeToTnc: event.target.checked })
  };

  const dateOfBirth = request.dateOfBirth == null ? null : parseDateTime(request.dateOfBirth);

  async function onClickSignUp(): Promise<void> {
    const validationResults = await validateSignUp(request);
    setErrors(validationResults);
    if (isThereAnyError(validationResults)) return;
    try {
      appDispatch(setIsLoading(true));
      const response = await signUp(request as SignupRequest);
      if (!response.isError) {
        onSignUpSuccess(response.userId);
      } else {
        setErrors(response.errors);
      }
    } finally {
      appDispatch(setIsLoading(false));
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.inputRow}>
        <Typography className={styles.title}>JOIN NOOBSTORM TODAY FOR FREE!</Typography>
      </div>
      <div className={styles.inputRow}>
        <TextField
          id="username"
          label="Username"
          variant="filled"
          autoComplete='email'
          className={styles.inputRowItem}
          value={request.username}
          error={propsHasError(errors, 'username')}
          helperText={getErrorForProp(errors, 'username')}
          onChange={(event): void => setRequest({ ...request, username: event.target.value.trim() })}
        />
      </div>
      <div className={styles.inputRow}>
        <TextField id="email"
          label="Email"
          variant="filled"
          className={styles.inputRowItem}
          value={request.email}
          error={propsHasError(errors, 'email')}
          helperText={getErrorForProp(errors, 'email')}
          onChange={(event): void => setRequest({ ...request, email: event.target.value.trim() })}
        />
        <TextField id="mobile"
          label="Mobile"
          variant="filled"
          className={styles.inputRowItem}
          value={request.phone}
          error={propsHasError(errors, 'phone')}
          helperText={getErrorForProp(errors, 'phone')}
          onChange={(event): void => setRequest({ ...request, phone: event.target.value.trim() })}
        />
      </div>
      <div className={styles.inputRow}>
        <TextField id="firstName"
          label="First Name"
          variant="filled"
          className={styles.inputRowItem}
          value={request.firstName}
          error={propsHasError(errors, 'firstName')}
          helperText={getErrorForProp(errors, 'firstName')}
          onChange={(event): void => setRequest({ ...request, firstName: event.target.value.trim() })}
        />
        <TextField id="lastName"
          label="Last Name"
          variant="filled"
          className={styles.inputRowItem}
          value={request.lastName}
          error={propsHasError(errors, 'lastName')}
          helperText={getErrorForProp(errors, 'lastName')}
          onChange={(event): void => setRequest({ ...request, lastName: event.target.value.trim() })}
        />
      </div>
      <div className={styles.inputRow}>
        <DesktopDatePicker
          label="Date of birth"
          className={styles.inputRowItem}
          value={dateOfBirth}
          mask={'__/__/____'}
          onChange={(value: DateTime | null): void => setRequest({ ...request, dateOfBirth: toISOString(value) })}
          inputFormat="dd/MM/yyyy"
          renderInput={(params): JSX.Element =>
            <TextField {...params}
              variant="filled"
              className={styles.inputRowItem}
              disabled={true}
              error={propsHasError(errors, 'dateOfBirth')}
              helperText={getErrorForProp(errors, 'dateOfBirth')} />
          }
        />
        <TextField id="password"
          label="Password"
          variant="filled"
          type="password"
          className={styles.inputRowItem}
          value={request.password}
          error={propsHasError(errors, 'password')}
          helperText={getErrorForProp(errors, 'password')}
          onChange={(event): void => setRequest({ ...request, password: event.target.value.trim() })}
        />
      </div>
      <div className={styles.inputRow}>
        <StateDropDown
          value={request.stateId}
          onChange={(id, state): void => setRequest({ ...request, stateId: id || '', countryId: state?.countryId })}
          countryIsoCode="IND"
          autoCompleteClassName={styles.inputRowItem}
          inputClassName={styles.inputRowItem}
          error={propsHasError(errors, 'stateId')}
          helperText={getErrorForProp(errors, 'stateId')}
        />
      </div>
      <div className={styles.inputRow}>
        <FormControl>
          <FormControlLabel control={<Checkbox id="agreeToTNC" value={request.agreeToTnc} onChange={handleTncChange} />}
            className={styles.inputRowItem}
            label={<Typography className={commonStyles.whiteText}>I certify I am over 18 and agree to the <Link href="/terms-and-conditions">Terms and Conditions!</Link></Typography>}
          />
          <FormHelperText style={{ display: propsHasError(errors, 'agreeToTnc') ? '' : 'none' }} error={true}>{getErrorForProp(errors, 'agreeToTnc')}</FormHelperText>
        </FormControl>
      </div>
      <div className={styles.inputRow}>
        <Button className={styles.actionButton} onClick={onClickSignUp}><Typography>Sign up Today</Typography></Button>
      </div>
    </div>
  )
}
