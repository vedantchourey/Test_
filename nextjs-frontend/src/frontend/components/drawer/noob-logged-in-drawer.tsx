import { Button, Dialog, Divider, IconButton, ListItemIcon, ListItemText, MenuItem, MenuList, useTheme } from '@mui/material';
import styles from './noob-drawer.module.css';
import * as React from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import DiscordIcon from '../icons/discord-icon';
import TwitchIcon from '../icons/twitch-icon';
import YoutubeIcon from '../icons/youtube-icon';
import { useRouter } from 'next/router';
import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SettingsIcon from '@mui/icons-material/Settings';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import LogoutIcon from '@mui/icons-material/Logout';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import commonStyles from '../../styles/common.module.css';

interface Props {
  show: boolean;
  onClose: () => void;
  onLogoutClick: () => void;
}

export default function NoobLoggedInDrawer(props: Props) {
  const {show, onClose, onLogoutClick} = props;
  const theme = useTheme();
  const router = useRouter();

  async function gotoPage(url: string) {
    onClose();
    await router.push(url);
  }
  return (
    <Dialog open={show} onClose={onClose} fullScreen color="#08001C">
      <div className={styles.container}>
        <div className={commonStyles.flexGroup}>
          <div className={commonStyles.flexEqualSpace}/>
          <div className={commonStyles.flexEqualSpace}>
            <Image src="/images/noobstorm-logo-small.png"
                   width={130}
                   height={28}
                   alt="noob storm logo"/>
          </div>
          <div className={styles.topMenuItemRight}>
            <IconButton onClick={onClose}>
              <CloseIcon/>
            </IconButton>
          </div>
        </div>
        <div className={styles.topMenuGroup}>
          <MenuList>
            <MenuItem onClick={()=> gotoPage('/account')}><ListItemIcon><PersonIcon fontSize="small"/></ListItemIcon><ListItemText>Account</ListItemText></MenuItem>
            <MenuItem><ListItemIcon><DashboardIcon fontSize="small"/></ListItemIcon><ListItemText>Dashboard</ListItemText></MenuItem>
            <MenuItem><ListItemIcon><ShoppingBagIcon fontSize="small"/></ListItemIcon><ListItemText>Orders</ListItemText></MenuItem>
            <MenuItem><ListItemIcon><AccountBalanceWalletIcon fontSize="small"/></ListItemIcon><ListItemText>Wallet</ListItemText></MenuItem>
            <MenuItem><ListItemIcon><SettingsIcon fontSize="small"/></ListItemIcon><ListItemText>Profile Settings</ListItemText></MenuItem>
            <MenuItem><ListItemIcon><WatchLaterIcon fontSize="small"/></ListItemIcon><ListItemText>Active Tournaments</ListItemText></MenuItem>
            <Divider/>
            <MenuItem onClick={onLogoutClick}><ListItemIcon><LogoutIcon fontSize="small"/></ListItemIcon><ListItemText>Logout</ListItemText></MenuItem>
          </MenuList>
        </div>
        <Divider/>
        <div className={styles.flexRowWrap}>
          <MenuItem><ListItemText primary="Home" onClick={() => gotoPage('/')}/></MenuItem>
          <MenuItem><ListItemText primary="Leaderboards"/></MenuItem>
          <MenuItem><ListItemText primary="About Us"/></MenuItem>
          <MenuItem><ListItemText primary="Support"/></MenuItem>
          <MenuItem><ListItemText primary="FAQ"/></MenuItem>
        </div>
        <Divider/>
        <div className={styles.bottomMenuGroup}>
          <Button variant="text" startIcon={<ShoppingCartIcon/>} style={{textTransform: 'none'}}>
            Store
          </Button>
          <Button variant="text" startIcon={<FlashOnIcon/>} style={{color: theme.palette.secondary.main, textTransform: 'none'}}>
            Free Agency Market
          </Button>
        </div>
        <div className={styles.footerContainer}>
          <div className={styles.footer}>
            <DiscordIcon/>
            <TwitchIcon/>
            <YoutubeIcon/>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
