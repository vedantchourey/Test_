import { AppBar, IconButton } from '@mui/material';
import styles from './noob-mobile-header.module.css';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import * as React from 'react';
import { useState } from 'react';
import NoobDrawer from '../drawer/noob-drawer';

export default function NoobMobileHeader() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleDrawer = () => setShowMenu(true);
  const hideMenu = () => setShowMenu(false);

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
      <NoobDrawer show={showMenu} onClose={hideMenu}/>
    </>
  );
}
