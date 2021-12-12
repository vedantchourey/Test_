import { AppBar, IconButton } from '@mui/material';
import styles from './noob-mobile-header.module.css';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import * as React from 'react';
import { useState } from 'react';
import NoobDrawer from '../drawer/noob-drawer';
import LoginModal from '../auth/login-modal/login-modal';

export default function NoobMobileHeader() {
  const [showMenu, setShowMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const toggleDrawer = () => setShowMenu(true);
  const hideMenu = () => setShowMenu(false);

  function onSuccessfulLogin() {
    setShowLoginModal(false);
  }

  function onLoginClick() {
    setShowLoginModal(true)
    hideMenu();
  }

  return (
    <>
      <AppBar position="fixed" className={styles.appBar}>
        <div className={styles.topHeader}>
          <div className={styles.appBarItem}>
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
      </AppBar>
      <NoobDrawer show={showMenu}
                  onClose={hideMenu}
                  onLoginClick={onLoginClick}
      />
      <LoginModal show={showLoginModal}
                  onCancel={() => setShowLoginModal(false)}
                  onSuccessfulLogin={onSuccessfulLogin}
      />
    </>
  );
}
