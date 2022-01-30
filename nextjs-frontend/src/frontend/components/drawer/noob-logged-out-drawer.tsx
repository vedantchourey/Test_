import { Button, Dialog, Divider, IconButton, ListItemText, MenuItem, Typography, useTheme } from '@mui/material';
import {useStyles} from './noob-drawer-styles';
import CloseIcon from '@mui/icons-material/Close';
import * as React from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import DiscordIcon from '../icons/discord-icon';
import TwitchIcon from '../icons/twitch-icon';
import YoutubeIcon from '../icons/youtube-icon';
import { useRouter } from 'next/router';

interface Props {
  show: boolean;
  onClose: () => void;
  onLoginClick: () => void;
}

export default function NoobLoggedOutDrawer(props: Props) {
  const {show, onClose, onLoginClick} = props;
  const theme = useTheme();
  const router = useRouter();
  const styles = useStyles();

  async function gotoPage(url: string) {
    onClose();
    await router.push(url);
  }

  return (
    <Dialog open={show} onClose={onClose} fullScreen color="#08001C">
      <div className={styles.container}>
        <div className={styles.topMenuGroup}>
          <div className={styles.topMenuItemLeft}>
            <Button variant="outlined"
              style={{textTransform: 'none', color: 'white'}}
              onClick={()=> router.push('/register')}
            >
              Register
            </Button>
            <Typography style={{alignSelf: 'center'}}>OR</Typography>
            <Button variant="contained" style={{textTransform: 'none'}} onClick={onLoginClick}>
              Sign In
            </Button>
          </div>
          <div className={styles.topMenuItemRight}>
            <IconButton onClick={onClose}>
              <CloseIcon/>
            </IconButton>
          </div>
        </div>
        <Divider/>
        <div>
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
