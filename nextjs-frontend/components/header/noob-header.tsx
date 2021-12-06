import { AppBar, Button, Typography, useTheme } from '@mui/material';
import styles from './noob-header.module.css';
import Image from 'next/image';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FlashOnIcon from '@mui/icons-material/FlashOn';

export default function NoobHeader() {

  const theme = useTheme();

  return (
    <nav>
      <AppBar position="fixed" className={styles.appHeader}>
        <div className={styles.topMenu}>
          <div className={styles.topLeftMenuGroup}>
            <Image src="/images/noobstorm-logo.png" width={182} height={39} alt="noob storm logo"/>
            <Button variant="text" startIcon={<ShoppingCartIcon/>} style={{textTransform: 'none'}}>
              Store
            </Button>
            <Button variant="text" startIcon={<FlashOnIcon/>}  style={{color: theme.palette.secondary.main, textTransform: 'none'}}>
              Free Agency Market
            </Button>
          </div>
          <div className={styles.topRightMenuGroup}>
            <Button variant="contained" style={{textTransform: 'none'}}>Register</Button>
            <Typography style={{alignSelf: 'center'}}>OR</Typography>
            <Button variant="outlined" style={{textTransform: 'none'}}>Sign In</Button>
          </div>
        </div>
        <div className={styles.bottomMenu}>
          <div className={styles.bottomMenuLeftGroup}>

          </div>
        </div>
      </AppBar>
    </nav>
  );
}
