import { AppBar, Button, Typography } from '@mui/material';
import styles from './noob-header.module.css';
import Image from 'next/image';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FlashOnIcon from '@mui/icons-material/FlashOn';

export default function NoobHeader() {
  return (
    <nav>
      <AppBar position="fixed" className={styles.appHeader}>
        <div className={styles.topMenu}>
          <div className={styles.topLeftMenuGroup}>
            <Image src="/images/noobstorm-logo.png" width={182} height={39} alt="noob storm logo"/>
            <Button variant="text" startIcon={<ShoppingCartIcon/>}>
              Store
            </Button>
            <Button variant="text" startIcon={<FlashOnIcon/>}>
              Free Agency Market
            </Button>
          </div>
          <div className={styles.topRightMenuGroup}>
            <Button variant="contained">Contained</Button>
            <Typography style={{alignSelf: 'center'}}>OR</Typography>
            <Button variant="outlined">Outlined</Button>
          </div>
        </div>
      </AppBar>
    </nav>
  );
}
