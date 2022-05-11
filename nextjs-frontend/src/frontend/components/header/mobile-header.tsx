import { AppBar, Avatar, Icon, IconButton, Button, Box, Divider } from '@mui/material';
import styles from './noob-mobile-header.module.css';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import * as React from 'react';
import { useState } from 'react';
import NoobDrawer from '../drawer/noob-drawer';
import LoginModal from '../auth/login-modal/login-modal';
import { useAppDispatch, useAppSelector } from '../../redux-store/redux-store';
import { avatarImageBlobUrlSelector, isLoggedInSelector } from '../../redux-store/authentication/authentication-selectors';
import PersonIcon from '@mui/icons-material/Person';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import EqualizerOutlinedIcon from '@mui/icons-material/EqualizerOutlined';
import MilitaryTechOutlinedIcon from '@mui/icons-material/MilitaryTechOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { signOut } from '../../service-clients/auth-service-client';
import { setMobileHeaderHeight } from '../../redux-store/layout/layout-slice';
import { mobileHeaderHeightSelector } from '../../redux-store/layout/layout-selectors';
import { useRouter } from 'next/router';

export default function MobileDrawer(): JSX.Element {
  const [showMenu, setShowMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const toggleDrawer = (): void => setShowMenu(true);
  const hideMenu = (): void => setShowMenu(false);
  const avatarUrl = useAppSelector(avatarImageBlobUrlSelector);
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  const appDispatch = useAppDispatch();
  const currentHeight = useAppSelector(mobileHeaderHeightSelector);
  const router = useRouter();

  function onSuccessfulLogin(): void {
    setShowLoginModal(false);
  }

  function onLoginClick(): void {
    setShowLoginModal(true)
    hideMenu();
  }

  function avatar(): JSX.Element {
    if (avatarUrl == null) return (<Icon className={styles.userIcon}><PersonIcon className={styles.userIcon} /></Icon>);
    return <Avatar alt="Remy Sharp"
      sx={{ width: 40, height: 40 }}
      className={styles.userProfilePic}
      src={avatarUrl} />
  }

  async function onLogoutClick(): Promise<void> {
    hideMenu();
    await signOut();
  }

  const updateMobileHeight = (element: HTMLDivElement | null): void => {
    if (!element?.clientHeight) return;
    if (currentHeight === element?.clientHeight) return;
    appDispatch(setMobileHeaderHeight(element?.clientHeight || 0));
  };

  return (
    <>
      <AppBar position="fixed" className={styles.appBar} ref={updateMobileHeight}>

      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px' }}>
        <Box>
          <IconButton onClick={toggleDrawer}>
            <img src="/icons/Vector-MenuIcon.png"/>
          </IconButton>
        </Box>
        <Box>
          <img src="/icons/logo-white-1.png" style={{ marginLeft: '20px',marginBottom: '-8px' }} />
          <span style={{ borderRight: '1px solid #6931F9',margin: '10px' }}></span>
          <img src="/images/noobstorm-logo-small.png" style={{ marginBottom: '-13px', width: '120px', height: '33px' }}/>
        </Box>
        <Box>
          <Button variant="text" style={{ color: 'white', backgroundColor: '#6931F9', borderRadius: '10px', marginLeft: '10px',fontSize: '12px', height: '30px', paddingLeft: '12px'}} startIcon={<img src="/icons/Vector-Wallet.png" />}>$240.00</Button>
          </Box>
        <Box>
          <img src="/icons/Vector-Bell.png" style={{ marginLeft: '10px', marginBottom: '-5px' }}/>
          <img src="/icons/Vector-Ellipse.png" style={{ marginLeft: '-3px', marginBottom: '13px' }}/>
        </Box>
      </div>
        <Divider/>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px' }}>
          <Box>
            <img src="/icons/Vector-home2.png" style={{ height: '21px', width: '18px' }} />
          </Box>
          <Box>
            <img src="/icons/Vector-Tournaments2.png" style={{ height: '21px', width: '18px' }}/>
          </Box>
          <Box>
            <img src="/icons/Vector-Leaderboards.png" style={{ height: '21px', width: '18px' }}/>
          </Box>
          <Box style={{ width: '30px', height: '30px', backgroundColor: '#6931F9', alignItems: 'center', display: 'flex', justifyContent: 'center', borderRadius: '20px', marginTop: '-5px' }}>
            <img src="/icons/Vector-Search.png" style={{ width: '16px' }}/>
          </Box>
        </div>

        {isLoggedIn && <div className={styles.bottomHeader}>
          <IconButton className={styles.bottomHeaderIcons} onClick={(): Promise<boolean> => router.push('/')}>
            <Icon><HomeOutlinedIcon /></Icon>
          </IconButton>
          <IconButton className={styles.bottomHeaderIcons}>
            <Icon><EqualizerOutlinedIcon /></Icon>
          </IconButton>
          <IconButton className={styles.bottomHeaderIcons}>
            <Icon><MilitaryTechOutlinedIcon /></Icon>
          </IconButton>
          <IconButton className={styles.bottomHeaderIcons}>
            <Icon><NotificationsOutlinedIcon /></Icon>
          </IconButton>
          <IconButton className={styles.bottomHeaderIcons}>
            <Icon><ChatBubbleOutlineOutlinedIcon /></Icon>
          </IconButton>
        </div>
        }
      </AppBar>
      <NoobDrawer show={showMenu}
        onClose={hideMenu}
        onLoginClick={onLoginClick}
        onLogoutClick={onLogoutClick}
      />
      <LoginModal show={showLoginModal}
        onCancel={(): void => setShowLoginModal(false)}
        onSuccessfulLogin={onSuccessfulLogin}
      />
    </>
  );
}