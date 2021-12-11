import styles from './noob-desktop-header.module.css';
import Image from 'next/image';
import { AppBar, Button, Typography, useTheme } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import * as React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import LoginModal from '../auth/login-modal/login-modal';

export default function NoobDesktopHeader() {
  const theme = useTheme();
  const router = useRouter()
  const {pathname} = router;
  const [showLoginModal, setShowLoginModal] = useState(false);

  function buttonStyle(expectedPaths: string[]): React.CSSProperties {
    if (expectedPaths.indexOf(pathname) === -1) return {color: 'white', fontWeight: 700};
    return {color: theme.palette.primary.main, fontWeight: 700};
  }

  async function gotoRegisterPage() {
    await router.push('/auth/register')
  }

  async function gotoHomePage() {
    await router.push('/')
  }

  function onSuccessfulLogin() {
  }

  return (
    <>
      <AppBar position="fixed" className={styles.appHeader}>
        <div className={styles.topMenu}>
          <div className={styles.topLeftMenuGroup}>
            <Image src="/images/noobstorm-logo.png" width={182} height={39} alt="noob storm logo"/>
            <Button variant="text" startIcon={<ShoppingCartIcon/>} style={{textTransform: 'none'}}>
              Store
            </Button>
            <Button variant="text" startIcon={<FlashOnIcon/>} style={{color: theme.palette.secondary.main, textTransform: 'none'}}>
              Free Agency Market
            </Button>
          </div>
          <div className={styles.topRightMenuGroup}>
            <Button variant="outlined" style={{textTransform: 'none', color: 'white'}} onClick={gotoRegisterPage}>
              Register
            </Button>
            <Typography style={{alignSelf: 'center'}}>OR</Typography>
            <Button variant="contained" style={{textTransform: 'none'}} onClick={() => setShowLoginModal(true)}>
              Sign In
            </Button>
          </div>
        </div>
        <div className={styles.bottomMenu}>
          <div className={styles.bottomMenuLeftGroup}>
            <Button variant="text" style={buttonStyle(['/'])} onClick={gotoHomePage}>Home</Button>
            <Button variant="text" style={buttonStyle(['/tournaments'])}>Tournaments</Button>
            <Button variant="text" style={buttonStyle(['/leaderboards'])}>Leaderboards</Button>
            <Button variant="text" style={buttonStyle(['/about-us'])}>About Us</Button>
            <Button variant="text" style={buttonStyle(['/support'])}>Support</Button>
            <Button variant="text" style={buttonStyle(['/faq'])}>FAQ</Button>
          </div>
          <div className={styles.bottomMenuRightGroup}>
          </div>
        </div>
      </AppBar>
      <LoginModal show={showLoginModal}
                  onSuccessfulLogin={onSuccessfulLogin}
                  onCancel={() => setShowLoginModal(false)}
      />
    </>

  );
}
