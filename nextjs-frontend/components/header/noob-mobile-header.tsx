import { AppBar, Avatar, Icon, IconButton } from '@mui/material';
import styles from './noob-mobile-header.module.css';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import * as React from 'react';
import { useState } from 'react';
import NoobDrawer from '../drawer/noob-drawer';
import LoginModal from '../auth/login-modal/login-modal';
import { useAppDispatch, useAppSelector } from '../../store/redux-store';
import { avatarUrlSelector, isLoggedInSelector } from '../../store/authentication/authentication-selectors';
import PersonIcon from '@mui/icons-material/Person';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import EqualizerOutlinedIcon from '@mui/icons-material/EqualizerOutlined';
import MilitaryTechOutlinedIcon from '@mui/icons-material/MilitaryTechOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { signOut } from '../../services/front-end-services/auth-service';
import { setMobileHeaderHeight } from '../../store/layout/layout-slice';
import { mobileHeaderHeightSelector } from '../../store/layout/layout-selectors';


export default function NoobMobileHeader() {
  const [showMenu, setShowMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const toggleDrawer = () => setShowMenu(true);
  const hideMenu = () => setShowMenu(false);
  const avatarUrl = useAppSelector(avatarUrlSelector);
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  const appDispatch = useAppDispatch();
  const currentHeight = useAppSelector(mobileHeaderHeightSelector);

  function onSuccessfulLogin() {
    setShowLoginModal(false);
  }

  function onLoginClick() {
    setShowLoginModal(true)
    hideMenu();
  }

  function avatar() {
    if (avatarUrl == null) return (<Icon className={styles.userIcon}><PersonIcon className={styles.userIcon}/></Icon>);
    return <Avatar alt="Remy Sharp"
                   sx={{width: 40, height: 40}}
                   className={styles.userProfilePic}
                   src={avatarUrl}/>
  }

  async function onLogoutClick() {
    hideMenu();
    await signOut();
  }

  const updateMobileHeight = (element: HTMLDivElement | null) => {
    if (!element?.clientHeight) return;
    if (currentHeight == element?.clientHeight) return;
    return appDispatch(setMobileHeaderHeight(element?.clientHeight || 0));
  };

  return (
    <>
      <AppBar position="fixed" className={styles.appBar} ref={updateMobileHeight}>
        <div className={styles.topHeader}>
          <div className={styles.appBarItem}>
            {avatar()}
          </div>
          <div className={styles.appBarItemMiddle}>
            <Image src="/images/noobstorm-logo-small.png"
                   width={130}
                   height={28}
                   alt="noob storm logo"/>
          </div>
          <div className={styles.appBarItemLast}>
            <IconButton onClick={toggleDrawer}>
              <MenuIcon/>
            </IconButton>
          </div>
        </div>
        {isLoggedIn && <div className={styles.bottomHeader}>
          <IconButton className={styles.bottomHeaderIcons}>
            <Icon><HomeOutlinedIcon/></Icon>
          </IconButton>
          <IconButton className={styles.bottomHeaderIcons}>
            <Icon><EqualizerOutlinedIcon/></Icon>
          </IconButton>
          <IconButton className={styles.bottomHeaderIcons}>
            <Icon><MilitaryTechOutlinedIcon/></Icon>
          </IconButton>
          <IconButton className={styles.bottomHeaderIcons}>
            <Icon><NotificationsOutlinedIcon/></Icon>
          </IconButton>
          <IconButton className={styles.bottomHeaderIcons}>
            <Icon><ChatBubbleOutlineOutlinedIcon/></Icon>
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
                  onCancel={() => setShowLoginModal(false)}
                  onSuccessfulLogin={onSuccessfulLogin}
      />
    </>
  );
}
