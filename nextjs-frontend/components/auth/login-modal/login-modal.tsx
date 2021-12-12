import { Button, Dialog, FormHelperText, IconButton, styled, TextField, Typography } from '@mui/material';
import styles from './login-modal.module.css';
import CancelIcon from '@mui/icons-material/Cancel';
import { useState } from 'react';
import { getErrorForProp, isThereAnyError, propsHasError, ValidationResult } from '../../../utils/validation/validator';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '../../../store/redux-store';
import { isDeviceTypeSelector } from '../../../store/layout/layout-selectors';
import { deviceTypes } from '../../../store/layout/device-types';
import validator from 'validator';
import { SignInRequest } from '../../../services/front-end-services/auth/sign-in-request';
import { signIn } from '../../../services/front-end-services/auth/auth';
import { ApiError } from '@supabase/gotrue-js';
import { setIsLoading } from '../../../store/screen-animations/screen-animation-slice';
import { setIsLoggedIn } from '../../../store/authentication/authentication-slice';

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

const CustomLoginDialog = styled(Dialog)<CustomLoginDialogProps>(({theme, top = 100, right = 70}) => {
  const isDesktop = useAppSelector(x => isDeviceTypeSelector(x, deviceTypes.desktop));
  const positionStyle = !isDesktop ? {} : {position: 'absolute', top, right};

  return ({
    '& .MuiPaper-root': {
      borderRadius: 0,
      backgroundColor: '#160C30',
      margin: 0,
      ...positionStyle
    }
  });
});

function validateEmail(details: SignInRequest) {
  if (details.email == null) return 'Is required';
  if (!validator.isEmail(details.email)) return 'Invalid email';
}

function validatePassword(details: SignInRequest) {
  if (details.password == null) return 'Is required';
}


function validateCredentials(request: SignInRequest): ValidationResult<SignInRequest> {
  return {
    email: validateEmail(request),
    password: validatePassword(request)
  }
}

export default function LoginModal(props: Props) {
  const {onSuccessfulLogin, onCancel, show, right = 70, top = 100} = props;
  const [request, setRequest] = useState<SignInRequest>({email: '', password: ''});
  const [errors, setErrors] = useState<ValidationResult<SignInRequest>>({});
  const [loginError, setLoginError] = useState<ApiError | undefined>();
  const appDispatch = useAppDispatch();

  function resetData() {
    setRequest({email: '', password: ''});
    setErrors({});
    setLoginError(undefined);
  }

  function onClose() {
    resetData();
    onCancel();
  }

  async function onClickLogin() {
    const results = validateCredentials(request);
    setErrors(results);
    if (isThereAnyError(results)) return;
    try {
      appDispatch(setIsLoading(true));
      const response = await signIn(request);
      if (response.isError) {
        setLoginError(response.error);
      } else {
        resetData();
        appDispatch(setIsLoggedIn(true));
        onSuccessfulLogin();
      }
    } finally {
      appDispatch(setIsLoading(false));
    }
  }

  return (
    <CustomLoginDialog open={show} onClose={onClose} top={top} right={right} color="#08001C">
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <Typography>Sign In</Typography>
          </div>
          <div className={styles.headerButtons}>
            <IconButton onClick={onClose}>
              <CancelIcon/>
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
                     onChange={event => setRequest({...request, email: event.target.value})}
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
                     onChange={event => setRequest({...request, password: event.target.value})}
          />
        </div>
        <div className={styles.row}>
          <FormHelperText style={{display: loginError ? '' : 'none'}} error={true}>{loginError?.message}</FormHelperText>
        </div>
        <div className={styles.row}>
          <Typography><Link href="/forgot-password">Lost your password</Link></Typography>
        </div>
        <div className={styles.row}>
          <Button className={styles.actionButton} onClick={onClickLogin}><Typography>Log In</Typography></Button>
        </div>
      </div>
    </CustomLoginDialog>
  )
}
