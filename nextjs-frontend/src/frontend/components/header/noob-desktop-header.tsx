import FlashOnIcon from '@mui/icons-material/FlashOn';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppBar, Button, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useRef, useState } from 'react';
import { isLoggedInSelector } from '../../redux-store/authentication/authentication-selectors';
import { desktopHeaderHeightSelector, screenWidthSelector } from '../../redux-store/layout/layout-selectors';
import { setDesktopHeaderHeight } from '../../redux-store/layout/layout-slice';
import { useAppDispatch, useAppSelector } from '../../redux-store/redux-store';
import LoginModal from '../auth/login-modal/login-modal';
import { ComponentDimensions, createFromRef } from '../utils/component-dimensions';
import LoggedInUserMenu from './logged-in-user-menu';
import styles from './noob-desktop-header.module.css';

export default function NoobDesktopHeader(): JSX.Element {
  const theme = useTheme();
  const router = useRouter()
  const loginButtonRef = useRef<HTMLButtonElement>(null);
  const [loginButtonDimensions, setLoginButtonDimensions] = useState(new ComponentDimensions(0, 0, 0, 0, 0, 0, 0))
  const { pathname } = router;
  const [showLoginModal, setShowLoginModal] = useState(false);
  const screenWidth = useAppSelector(screenWidthSelector);
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  const currentHeight = useAppSelector(desktopHeaderHeightSelector);

  const appDispatch = useAppDispatch();

  const updateDesktopHeight = (element: HTMLDivElement | null): void => {
    if (!element?.clientHeight) return;
    if (currentHeight === element?.clientHeight) return;
    appDispatch(setDesktopHeaderHeight(element?.clientHeight || 0));
  };

  function buttonStyle(expectedPaths: string[]): React.CSSProperties {
    if (expectedPaths.indexOf(pathname) === -1) return { color: 'white', fontWeight: 700 };
    return { color: theme.palette.primary.main, fontWeight: 700 };
  }

  async function gotoAboutUsPage(): Promise<void> {
    await router.push('/about-us')
  }

  async function gotoRegisterPage(): Promise<void> {
    await router.push('/register')
  }

  async function gotoSupportPage(): Promise<void> {
    await router.push('/support')
  }

  async function gotoHomePage(): Promise<void> {
    await router.push('/')
  }

  async function gotoLeadboardsPage(): Promise<void> {
    await router.push('/leaderboards')
  }

  async function gotoTeamListPage(): Promise<void> {
    await router.push('/teamlist')
  }

  function onSuccessfulLogin(): void {
    setShowLoginModal(false);
  }

  function onShowLoginModal(): void {
    setLoginButtonDimensions(createFromRef(loginButtonRef));
    setShowLoginModal(true);
  }

  async function gotoFreeAgencyMarketPage(): Promise<void> {
    await router.push('/free-agency-market/view/members')
  }

  return (
    <>
      <AppBar position="fixed" color='transparent' className={styles.appHeader} ref={updateDesktopHeight}>
        <div className={styles.topMenu}>
          <div className={styles.topLeftMenuGroup}>
            <div className={styles.noobLogo}>
              <Image src="/images/noobstorm-logo-small.png"
                width={130}
                height={28}
                alt="noob storm logo" />
            </div>
            <Button variant="text" startIcon={<ShoppingCartIcon />} style={{ textTransform: 'none' }}>
              Store
            </Button>
            <Button variant="text" startIcon={<FlashOnIcon />} style={{ color: theme.palette.secondary.main, textTransform: 'none' }} onClick={gotoFreeAgencyMarketPage}>
              Free Agency Market
            </Button>
          </div>
          {
            !isLoggedIn && <div className={styles.topRightMenuGroup}>
              <Button variant="outlined" style={{ textTransform: 'none', color: 'white' }} onClick={gotoRegisterPage}>
                Register
              </Button>
              <Typography color='white' style={{ alignSelf: 'center' }}>OR</Typography>
              <Button variant="contained" ref={loginButtonRef} style={{ textTransform: 'none' }} onClick={onShowLoginModal}>
                Sign In
              </Button>
            </div>
          }
          {
            isLoggedIn && <div className={styles.topRightMenuGroup}>
              <LoggedInUserMenu />
            </div>
          }

        </div>
        <div className={styles.bottomMenu}>
          <div className={styles.bottomMenuLeftGroup}>
            <Button variant="text" style={buttonStyle(['/'])} onClick={gotoHomePage}>Home</Button>
            <Button variant="text" style={buttonStyle(['/tournaments'])}>Tournaments</Button>
            <Button variant="text" onClick={gotoLeadboardsPage} style={buttonStyle(['/leaderboards'])} >Leaderboards</Button>
            <Button variant="text" onClick={gotoAboutUsPage} style={buttonStyle(['/about-us'])}>About Us</Button>
            <Button variant="text" onClick={gotoSupportPage} style={buttonStyle(['/support'])}>Support</Button>
            <Button variant="text" style={buttonStyle(['/faq'])} onClick={(): any => router.push("/match-hub")}>FAQ</Button>
            <Button variant="text" style={buttonStyle(['/teamlist'])} onClick={gotoTeamListPage}>Teams</Button>
          </div>
          <div className={styles.bottomMenuRightGroup}>
          </div>
        </div>
      </AppBar>
      <LoginModal show={showLoginModal}
        onSuccessfulLogin={onSuccessfulLogin}
        onCancel={(): void => setShowLoginModal(false)}
        top={loginButtonDimensions.bottom + 10}
        right={screenWidth - loginButtonDimensions.right}
      />
    </>
  );
}
