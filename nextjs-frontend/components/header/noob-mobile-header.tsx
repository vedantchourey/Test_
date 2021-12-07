import { AppBar, IconButton } from '@mui/material';
import styles from './noob-mobile-header.module.css';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import * as React from 'react';

export default function NoobMobileHeader() {
  return (
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
          <IconButton>
            <MenuIcon/>
          </IconButton>
        </div>
      </div>
    </AppBar>
  );
}
