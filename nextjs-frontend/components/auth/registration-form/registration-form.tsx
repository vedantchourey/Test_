import styles from './registration-form.module.css';
import { Autocomplete, Button, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material';
import { DesktopDatePicker } from '@mui/lab';
import { ChangeEvent, useState } from 'react';
import { DateTime } from 'luxon';
import Link from 'next/link'
import commonStyles from '../../../styles/common.module.css';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import FacebookIcon from '@mui/icons-material/Facebook';
import { SignupRequest } from '../../../services/supabase-service';
import { parseDateTime, toISOString } from '../../../utils/date-time-utils';


const cities: { label: string }[] = [
  {label: 'Delhi'}
];

export default function RegistrationForm() {

  const [request, setRequest] = useState<Partial<SignupRequest>>({
    email: '',
    password: '',
    phone: '',
    firstName: '',
    lastName: '',
    agreeToTnc: false,
    username: '',
    countryId: 1,
  });

  const handleTncChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRequest({...request, agreeToTnc: event.target.checked})
  };

  const dateOfBirth = request.dateOfBirth == null ? null : parseDateTime(request.dateOfBirth);

  return (
    <div className={styles.container}>
      <div className={styles.inputRow}>
        <Typography className={styles.title}>JOIN NOOBSTORM TODAY FOR FREE!</Typography>
      </div>
      <div className={styles.inputRow}>
        <TextField id="username"
                   label="Username"
                   variant="filled"
                   className={styles.inputRowItem}
                   value={request.username}
                   onChange={event => setRequest({...request, username: event.target.value})}
        />
      </div>
      <div className={styles.inputRow}>
        <TextField id="firstName"
                   label="First Name"
                   variant="filled"
                   className={styles.inputRowItem}
                   value={request.firstName}
                   onChange={event => setRequest({...request, firstName: event.target.value})}
        />
        <TextField id="lastName"
                   label="Last Name"
                   variant="filled"
                   className={styles.inputRowItem}
                   value={request.lastName}
                   onChange={event => setRequest({...request, lastName: event.target.value})}
        />
      </div>
      <div className={styles.inputRow}>
        <DesktopDatePicker label="Date of birth"
                           className={styles.inputRowItem}
                           value={dateOfBirth}
                           onChange={(value: DateTime | null) => setRequest({...request, dateOfBirth: toISOString(value)})}
                           renderInput={(params) => <TextField {...params} variant="filled"/>}
        />
        <TextField id="password"
                   label="Password"
                   variant="filled"
                   type="password"
                   className={styles.inputRowItem}
                   value={request.password}
                   onChange={event => setRequest({...request, password: event.target.value})}
        />
      </div>
      <div className={styles.inputRow}>
        <Autocomplete disablePortal
                      id="city"
                      options={cities}
                      className={styles.inputRowItem}
                      renderInput={(params) => <TextField {...params} label="City" variant="filled" className={styles.inputRowItem}/>}
        />
      </div>
      <div className={styles.inputRow}>
        <FormControlLabel control={<Checkbox id="agreeToTNC" value={request.agreeToTnc} onChange={handleTncChange}/>}
                          className={styles.inputRowItem}
                          label={<Typography className={commonStyles.whiteText}>I certify I am over 18 and agree to the <Link href="/terms-and-conditions">Terms and Conditions!</Link></Typography>}
        />
      </div>
      <div className={styles.inputRow}>
        <Button className={styles.actionButton}><Typography>Sign up Today</Typography></Button>
      </div>
      <div className={styles.inputRow}>
        <Typography style={{color: 'white', fontWeight: '900'}}>OR SIGN UP WITH</Typography>
      </div>
      <div className={styles.socialMediaButtonGroup}>
        <Button variant="outlined" className={styles.socialMediaButton} startIcon={<GoogleIcon/>}>
          <Typography className={commonStyles.whiteText}>Google</Typography>
        </Button>
        <Button variant="outlined" className={styles.socialMediaButton} startIcon={<FacebookIcon/>}>
          <Typography className={commonStyles.whiteText}>Facebook</Typography>
        </Button>
        <Button variant="outlined" className={styles.socialMediaButton} startIcon={<AppleIcon/>}>
          <Typography className={commonStyles.whiteText}>Apple</Typography>
        </Button>
      </div>
    </div>
  )
}
