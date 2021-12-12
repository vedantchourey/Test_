import { Button, Dialog, IconButton, styled, TextField, Typography } from '@mui/material';
import styles from './login-modal.module.css';
import CancelIcon from '@mui/icons-material/Cancel';
import { useState } from 'react';
import { getErrorForProp, propsHasError, ValidationResult } from '../../../utils/validation/validator';
import Link from 'next/link';
import { useAppSelector } from '../../../store/redux-store';
import { isDeviceTypeSelector } from '../../../store/layout/layout-selectors';
import { deviceTypes } from '../../../store/layout/device-types';

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

interface ICredentials {
  email: string;
  password: string;
}


export default function LoginModal(props: Props) {
  const {onSuccessfulLogin, onCancel, show, right=70, top=100} = props;
  const [credentials, setCredentials] = useState<ICredentials>({email: '', password: ''});
  const [errors, setErrors] = useState<ValidationResult<ICredentials>>({});

  function onClickLogin() {

  }

  return (
    <CustomLoginDialog open={show} onClose={onCancel} top={top} right={right} color="#08001C">
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <Typography>Sign In</Typography>
          </div>
          <div className={styles.headerButtons}>
            <IconButton onClick={onCancel}>
              <CancelIcon/>
            </IconButton>
          </div>
        </div>
        <div className={styles.row}>
          <TextField id="email"
                     label="Email"
                     variant="filled"
                     className={styles.inputRowItem}
                     value={credentials.email}
                     error={propsHasError(errors, 'email')}
                     helperText={getErrorForProp(errors, 'email')}
                     onChange={event => setCredentials({...credentials, email: event.target.value})}
          />
        </div>
        <div className={styles.row}>
          <TextField id="password"
                     label="Password"
                     variant="filled"
                     type="password"
                     className={styles.inputRowItem}
                     value={credentials.password}
                     error={propsHasError(errors, 'password')}
                     helperText={getErrorForProp(errors, 'password')}
                     onChange={event => setCredentials({...credentials, password: event.target.value})}
          />
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
