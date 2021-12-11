import { Button, Dialog, Divider, IconButton, ListItem, ListItemText, Typography, useTheme } from '@mui/material';
import styles from './noob-drawer.module.css';
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
}

export default function NoobDrawer(props: Props) {
  const {show, onClose} = props;
  const theme = useTheme();
  const router = useRouter();

  return (
    <Dialog open={show} onClose={onClose} fullScreen color="#08001C">
      <div className={styles.container}>
        <div className={styles.topMenuGroup}>
          <div className={styles.topMenuItemLeft}>
            <Button variant="outlined"
                    style={{textTransform: 'none', color: 'white'}}
                    onClick={()=> router.push('/auth/register')}
            >
              Register
            </Button>
            <Typography style={{alignSelf: 'center'}}>OR</Typography>
            <Button variant="contained" style={{textTransform: 'none'}}>
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
          <ListItem><ListItemText primary="Home" onClick={() => router.push('/')}/></ListItem>
          <ListItem><ListItemText primary="Leaderboards"/></ListItem>
          <ListItem><ListItemText primary="About Us"/></ListItem>
          <ListItem><ListItemText primary="Support"/></ListItem>
          <ListItem><ListItemText primary="FAQ"/></ListItem>
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
