import { Button, Dialog, FormHelperText, IconButton, Link, styled, TextField, Typography } from '@mui/material';
import styles from './login-modal.module.css';
import CancelIcon from '@mui/icons-material/Cancel';
import { useState } from 'react';
import { getErrorForProp, isThereAnyError, propsHasError, ValidationResult } from '../../../../common/utils/validation/validator';
import { useAppDispatch, useAppSelector } from '../../../redux-store/redux-store';
import { isDeviceTypeSelector } from '../../../redux-store/layout/layout-selectors';
import { deviceTypes } from '../../../redux-store/layout/device-types';
import validator from 'validator';
import { SignInRequest } from '../../../service-clients/messages/sign-in-request';
import { signIn } from '../../../service-clients/auth-service-client';
import { ApiError } from '@supabase/gotrue-js';
import { setIsLoading } from '../../../redux-store/screen-animations/screen-animation-slice';
import { useRouter } from 'next/router';

interface Props {
  show: boolean;
  onCancel: () => void;
  onSuccessfulLogin: () => void;
  top?: number;
  right?: number;
}

interface CustomLoginDialogProps {
  top?: number;
  right?: number;
}

const CustomLoginDialog = styled(Dialog)<CustomLoginDialogProps>(({ top = 100, right = 70 }) => {
  const isDesktop = useAppSelector((x) => isDeviceTypeSelector(x, deviceTypes.desktop));
  const positionStyle = !isDesktop ? {} : { position: 'absolute', top, right };

  return ({
    '& .MuiPaper-root': {
      borderRadius: 0,
      backgroundColor: '#160C30',
      margin: 0,
      ...positionStyle
    }
  });
});

function validateEmail(details: SignInRequest): string | undefined {
  if (details.email == null) return 'Is required';
  if (!validator.isEmail(details.email)) return 'Invalid email';
}

function validatePassword(details: SignInRequest): string | undefined {
  if (details.password == null) return 'Is required';
}


function validateCredentials(request: SignInRequest): ValidationResult<SignInRequest> {
  return {
    email: validateEmail(request),
    password: validatePassword(request)
  }
}

export default function LoginModal(props: Props): JSX.Element {
  const { onSuccessfulLogin, onCancel, show, right = 70, top = 100 } = props;
  const [request, setRequest] = useState<SignInRequest>({ email: '', password: '' });
  const [errors, setErrors] = useState<ValidationResult<SignInRequest>>({});
  const [loginError, setLoginError] = useState<ApiError | undefined>();
  const appDispatch = useAppDispatch();
  const [isBusy, setIsBusy] = useState(false);
  const router = useRouter();

  function resetData(): void {
    setRequest({ email: '', password: '' });
    setErrors({});
    setLoginError(undefined);
  }

  function onClose(): void {
    resetData();
    onCancel();
  }

  async function onClickLogin(): Promise<void> {
    const results = validateCredentials(request);
    setErrors(results);
    if (isThereAnyError(results)) return;
    try {
      setIsBusy(true);
      appDispatch(setIsLoading(true));
      const response = await signIn(request);
      if (response.isError) {
        setLoginError(response.error);
      } else {
        resetData();
        onSuccessfulLogin();
      }
    } finally {
      setIsBusy(false);
    }
  }

  const onClickLostPassword = async (): Promise<void> => {
    await router.push('/reset-password')
  };

  return (
    <CustomLoginDialog open={show} onClose={onClose} top={top} right={right} color="#08001C">
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <Typography>Sign In</Typography>
          </div>
          <div className={styles.headerButtons}>
            <IconButton onClick={onClose} disabled={isBusy}>
              <CancelIcon />
            </IconButton>
          </div>
        </div>
        <div className={styles.row}>
          <TextField id="email"
            label="Email"
            variant="filled"
            className={styles.inputRowItem}
            value={request.email}
            error={propsHasError(errors, 'email')}
            helperText={getErrorForProp(errors, 'email')}
            onChange={(event): void => setRequest({ ...request, email: event.target.value })}
            disabled={isBusy}
          />
        </div>
        <div className={styles.row}>
          <TextField id="password"
            label="Password"
            variant="filled"
            type="password"
            className={styles.inputRowItem}
            value={request.password}
            error={propsHasError(errors, 'password')}
            helperText={getErrorForProp(errors, 'password')}
            onChange={(event): void => setRequest({ ...request, password: event.target.value })}
            disabled={isBusy}
          />
        </div>
        <div className={styles.row}>
          <FormHelperText style={{ display: loginError ? '' : 'none' }} error={true}>{loginError?.message}</FormHelperText>
        </div>
        <div className={styles.row}>
          <Typography><Link onClick={onClickLostPassword}>Lost your password</Link></Typography>
        </div>
        <div className={styles.row}>
          <Button className={styles.actionButton}
            onClick={onClickLogin}
            disabled={isBusy}>
            <Typography>Log In</Typography>
          </Button>
        </div>
      </div>
    </CustomLoginDialog>
  )
}
