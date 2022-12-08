import { Button, Dialog, Divider, IconButton, Typography, useTheme, Box } from '@mui/material';
import styles from './noob-drawer.module.css';
import CloseIcon from '@mui/icons-material/Close';
import * as React from 'react';
import TwitchIcon from '../icons/twitch-icon';
import YoutubeIcon from '../icons/youtube-icon';
import { useRouter } from 'next/router';
import { createStyles, makeStyles } from "@mui/styles";

const drawerWidth = 20;

const useRoundStatusStyles = makeStyles(() =>
  createStyles({
    drawer: {
      width: drawerWidth
    },
    drawerPaper: {
      width: drawerWidth
    },
    buttonStyles : { margin: '10px', fontSize: '15px', marginLeft: '30px', color: '#ffffff', opacity: '0.31',justifyContent: 'flex-start', width:'180px',' & .hover': {background: 'linear-gradient(90deg, rgba(105, 49, 249, 0.12) 9.34%, rgba(105, 49, 249, 0) 100%)',},
    },
    imgStyle : {
      marginRight: '20px', width: '15px', height: '16px', marginTop: '-5px'
    }
  }));
interface Props {
  show: boolean;
  onClose: () => void;
  onLoginClick: () => void;
}

export default function NoobLoggedOutDrawer(props: Props): JSX.Element {
  const {show, onClose, onLoginClick} = props;
  const theme = useTheme();
  const router = useRouter();

  // async function gotoPage(url: string): Promise<void> {
  //   onClose();
  //   await router.push(url);
  // }

  const { pathname } = router;
  
  const classes = useRoundStatusStyles();

  function buttonStyle(expectedPaths: string[]): React.CSSProperties {
    if (expectedPaths.indexOf(pathname) === -1) return { color: 'white', fontWeight: 700 };
    return { color: theme.palette.primary.main, fontWeight: 700 };
  }
  async function gotoHomePage(): Promise<void> {
    await router.push('/')
  }

  async function gotoAboutUsPage(): Promise<void> {
    await router.push('/about-us')
  }

  async function gotoHowItworksPage(): Promise<void> {
    await router.push('/how-it-works')
  }

  async function gotoFaqPage(): Promise<void> {
    await router.push('/faq')
  }
  
  async function gotoDisputesPage(): Promise<void> {
    await router.push('/disputes')
  }
  return (
    <Dialog open={show} onClose={onClose} fullScreen color="#08001C">
      <div className={styles.container}>
        <div className={styles.topMenuGroup}>
          <div className={styles.topMenuItemLeft}>
            <Button variant="outlined"
              style={{textTransform: 'none', color: 'white'}}
              onClick={(): Promise<boolean> => router.push('/register')}
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
          <Box><Button variant="text" style={buttonStyle(['/'])} onClick={gotoHomePage} className={classes.buttonStyles}><img src="/images/menu/Home.png" className={classes.imgStyle} />Home</Button></Box>
          <Box><Button variant="text" className={classes.buttonStyles}><img src="/images/menu/Tournaments.png" className={classes.imgStyle} />Tournaments</Button></Box>
          <Box><Button variant="text" className={classes.buttonStyles}><img src="/images/menu/Leader-Board.png" className={classes.imgStyle} />Leaderboards</Button></Box>
          <Box><Button variant="text" style={buttonStyle(['/'])} onClick={gotoAboutUsPage} className={classes.buttonStyles}><img src="/images/menu/Support.png" className={classes.imgStyle} />About Us</Button></Box>
          <Box><Button variant="text" className={classes.buttonStyles} onClick={gotoFaqPage}> <img src="/images/menu/Support.png" className={classes.imgStyle} />FAQ</Button></Box>
          <Box><Button variant="text" style={buttonStyle(['/'])} onClick={gotoHowItworksPage} className={classes.buttonStyles}><img src="/images/menu/Support.png" className={classes.imgStyle} />How it Works</Button></Box>
          <Box><Button variant="text" style={buttonStyle(['/'])} onClick={gotoDisputesPage} className={classes.buttonStyles}><img src="/images/menu/Support.png" className={classes.imgStyle} />Disputes and Code of Conduct</Button></Box>
        </div>
        <div className={styles.footerContainer}>
          <div className={styles.footer}>
            <YoutubeIcon/>
            <img src="/icons/Vector-DiscordIcon.png" style={{ height: '19px' }} />
            <TwitchIcon/>
          </div>
        </div>
      </div>
    </Dialog>
  );
}