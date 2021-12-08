import styles from './registration-form.module.css';
import { Autocomplete, Button, FormControlLabel, TextField, Typography } from '@mui/material';
import { DesktopDatePicker } from '@mui/lab';
import { useState } from 'react';
import { DateTime } from 'luxon';
import { CheckBox } from '@mui/icons-material';
import Link from 'next/link'
import commonStyles from '../../../styles/common.module.css';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import FacebookIcon from '@mui/icons-material/Facebook';

const cities: { label: string }[] = [
  {label: 'Delhi'}
];

export default function RegistrationForm() {
  const [value, setValue] = useState<DateTime | null>(DateTime.now());

  return (
    <div className={styles.container}>
      <div className={styles.inputRow}>
        <Typography className={styles.title}>JOIN NOOBSTORM TODAY FOR FREE!</Typography>
      </div>
      <div className={styles.inputRow}>
        <TextField id="username" label="Username" variant="filled" className={styles.inputRowItem}/>
      </div>
      <div className={styles.inputRow}>
        <TextField id="firstName" label="First Name" variant="filled" className={styles.inputRowItem}/>
        <TextField id="lastName" label="Last Name" variant="filled" className={styles.inputRowItem}/>
      </div>
      <div className={styles.inputRow}>
        <DesktopDatePicker label="Date of birth"
                           className={styles.inputRowItem}
                           value={value}
                           onChange={(newValue) => setValue(newValue)}
                           renderInput={(params) => <TextField {...params} variant="filled"/>}
        />
        <TextField id="password" label="Password" variant="filled" className={styles.inputRowItem}/>
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
        <FormControlLabel control={<CheckBox id="agreeToTNC"/>}
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
