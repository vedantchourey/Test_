import styles from './noob-desktop-header.module.css';
import Image from 'next/image';
import { AppBar, Button, Typography, useTheme } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import * as React from 'react';
import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import LoginModal from '../auth/login-modal/login-modal';
import { ComponentDimensions, createFromRef } from '../utils/component-dimensions';
import { useAppDispatch, useAppSelector } from '../../redux-store/redux-store';
import { desktopHeaderHeightSelector, screenWidthSelector } from '../../redux-store/layout/layout-selectors';
import { isLoggedInSelector } from '../../redux-store/authentication/authentication-selectors';
import LoggedInUserMenu from './logged-in-user-menu';
import { setDesktopHeaderHeight } from '../../redux-store/layout/layout-slice';

export default function NoobDesktopHeader() {
  const theme = useTheme();
  const router = useRouter()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const loginButtonRef = useRef<any>();
  const [loginButtonDimensions, setLoginButtonDimensions] = useState(new ComponentDimensions(0, 0, 0, 0, 0, 0, 0))
  const {pathname} = router;
  const [showLoginModal, setShowLoginModal] = useState(false);
  const screenWidth = useAppSelector(screenWidthSelector);
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  const currentHeight = useAppSelector(desktopHeaderHeightSelector);

  const appDispatch = useAppDispatch();

  const updateDesktopHeight = (element: HTMLDivElement | null) => {
    if (!element?.clientHeight) return;
    if (currentHeight === element?.clientHeight) return;
    return appDispatch(setDesktopHeaderHeight(element?.clientHeight || 0));
  };

  function buttonStyle(expectedPaths: string[]): React.CSSProperties {
    if (expectedPaths.indexOf(pathname) === -1) return {color: 'white', fontWeight: 700};
    return {color: theme.palette.primary.main, fontWeight: 700};
  }

  async function gotoRegisterPage() {
    await router.push('/register')
  }

  async function gotoHomePage() {
    await router.push('/')
  }

  function onSuccessfulLogin() {
    setShowLoginModal(false);
  }

  function onShowLoginModal() {
    setLoginButtonDimensions(createFromRef(loginButtonRef));
    setShowLoginModal(true);
  }

  return (
    <>
      <AppBar position="fixed" className={styles.appHeader} ref={updateDesktopHeight}>
        <div className={styles.topMenu}>
          <div className={styles.topLeftMenuGroup}>
            <div className={styles.noobLogo}>
              <Image src="/images/noobstorm-logo-small.png"
                width={130}
                height={28}
                alt="noob storm logo"/>
            </div>
            <Button variant="text" startIcon={<ShoppingCartIcon/>} style={{textTransform: 'none'}}>
              Store
            </Button>
            <Button variant="text" startIcon={<FlashOnIcon/>} style={{color: theme.palette.secondary.main, textTransform: 'none'}}>
              Free Agency Market
            </Button>
          </div>
          {
            !isLoggedIn && <div className={styles.topRightMenuGroup}>
              <Button variant="outlined" style={{textTransform: 'none', color: 'white'}} onClick={gotoRegisterPage}>
                Register
              </Button>
              <Typography style={{alignSelf: 'center'}}>OR</Typography>
              <Button variant="contained" ref={loginButtonRef} style={{textTransform: 'none'}} onClick={onShowLoginModal}>
                Sign In
              </Button>
            </div>
          }
          {
            isLoggedIn && <div className={styles.topRightMenuGroup}>
              <LoggedInUserMenu/>
            </div>
          }

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
        top={loginButtonDimensions.bottom + 10}
        right={screenWidth - loginButtonDimensions.right}
      />
    </>

  );
}
