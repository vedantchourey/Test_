import * as React from 'react';
import styles from './noob-desktop-header.module.css';
import { Typography, Button, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import TwitchIcon from '../icons/twitch-icon';
import YoutubeIcon from '../icons/youtube-icon';
import { useRouter } from 'next/router';
import { createStyles, makeStyles } from "@mui/styles";

const drawerWidth = 280;

const useRoundStatusStyles = makeStyles(() =>
  createStyles({
    drawer: {
      width: drawerWidth
    },
    drawerPaper: {
      width: drawerWidth
    },
    root: {
      display: 'flex'
    },
    buttonStyles : { margin: '10px',marginLeft: '30px', color: '#ffffff', opacity: '0.31',justifyContent: 'flex-start', width:'180px',' & .hover': {background: 'linear-gradient(90deg, rgba(105, 49, 249, 0.12) 9.34%, rgba(105, 49, 249, 0) 100%)',},
    },
    boxStyle : {
      width: '209px',
      height: '304px',
      background: 'linear-gradient(196.04deg, #08001C -37.47%, rgba(15, 5, 38, 0) 89.41%)',
      borderRadius: '5px',
    },
    imgStyle : {
      marginRight: '20px', width: '15px', height: '16px', marginTop: '-5px'
    }
  }));

export default function DrawerLeft() {

const classes = useRoundStatusStyles();

const theme = useTheme();
const router = useRouter()
const { pathname } = router;

function buttonStyle(expectedPaths: string[]): React.CSSProperties {
  if (expectedPaths.indexOf(pathname) === -1) return { color: 'white', fontWeight: 700 };
  return { color: theme.palette.primary.main, fontWeight: 700, textDecoration: 'blink', width: '180px', borderRadius: '8px', backgroundColor: 'rgb(249 50 50)', background: 'linear-gradient(90deg, rgba(105, 49, 249, 0.12) 9.34%, rgba(105, 49, 249, 0) 100%)'};
}
async function gotoHomePage(): Promise<void> {
  await router.push('/')
  }

  return (
    <Box sx={{ display: 'flex' }} >
      <CssBaseline />
      <AppBar sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}></AppBar>
    <div className={classes.root}>
      <Drawer
        PaperProps={{ style: { height: "auto", position: "absolute", borderRight: '0px' } }}
        className={classes.drawer}
        sx={{ width: drawerWidth, flexShrink: 0, '& .MuiDrawer-paper': { width: drawerWidth,boxSizing: 'border-box',},}}
        variant="permanent"
        classes={{ paper: classes.drawerPaper }}
      >
        <div>
          <img src="/images/noobstorm-logo-small.png" alt="noob storm logo" style={{ width: '154px', height: '34px', marginTop: '15px' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
            <Button variant="text" style={{ color: 'white' }}>Dashboard</Button>
            <span style={{ borderRight: '1px solid white', opacity: '0.31',margin: '4px' }}></span>
            <Button variant="text" style={{ color: 'white'}} endIcon={<img src="/icons/Downarrow.svg" style={{ color: 'white', height: '12px', width: '12px' }} />}>My Teams</Button>
        </div>

        <div style={{ padding: '20px', textAlign: 'left' }}>
          <Box><Button variant="text" style={buttonStyle(['/'])} onClick={gotoHomePage} className={classes.buttonStyles}><img src="/icons/Vector-home.png" className={classes.imgStyle} />Home</Button></Box>
          <Box><Button variant="text" className={classes.buttonStyles}><img src="/icons/Vector-Tournaments.png" className={classes.imgStyle} />Tournaments</Button></Box>
          <Box><Button variant="text" className={classes.buttonStyles}><img src="/icons/Vector-Leaderboards.png" className={classes.imgStyle} />Leaderboards</Button></Box>
          <Box><Button variant="text" className={classes.buttonStyles}><img src="/icons/Vector-Message.png" className={classes.imgStyle} />Message</Button></Box>
          <Box><Button variant="text" className={classes.buttonStyles}><img src="/icons/Vector-Aboutus.png" className={classes.imgStyle} />About Us</Button></Box>
          <Box><Button variant="text" className={classes.buttonStyles}><img src="/icons/Vector-Support.png" className={classes.imgStyle} />Support</Button></Box>
          <Box><Button variant="text" className={classes.buttonStyles}><img src="/icons/Vector-FAQ.png" className={classes.imgStyle} />FAQ</Button></Box>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box className={classes.boxStyle}>
            <img src="/images/16276393842661.png" style={{ background: 'linear-gradient(180deg, rgba(10, 1, 30, 0) 0%, #0F0525 100%, #0C0322 100%)' }} />
            <Typography color={"white"} style={{ marginTop: '20px', fontSize: '13px'}}>Always keep in touch with your friends and watch their activities, like and comment. </Typography>
            <Box style={{ justifyContent: 'space-evenly', display: 'flex' }}>
              <span style={{ borderTop: '1px solid white', padding: '10px', marginTop: '10px' }}></span>
            </Box>
            <Box style={{ justifyContent: 'space-evenly', display: 'flex' }}>
              <YoutubeIcon/>
              <img src="/icons/Vector-DiscordIcon.png" style={{ height: '19px' }} />
              <TwitchIcon/>
            </Box>
          </Box>
          <div className={styles.bottomMenuGroup}>
            <Button variant="text" startIcon={<FlashOnIcon/>} style={{color: '#FD6262', fontSize: '17px', textTransform: 'none'}}>
              Free Agency Market
            </Button>
          </div>
          <Box style={{ justifyContent: 'space-evenly', display: 'flex' }}>
              <span style={{ borderTop: '1px solid white', padding: '10px', marginTop: '10px', width: '140px' }}></span>
            </Box>
            <Typography color={"default"} variant="h3" style={{ fontSize: '13px' }}>
            Copyright © 2021. All Rights Reserved By <Button variant="text" onClick={gotoHomePage}>
              NOOBSTORM
            </Button>
          </Typography>
        </div>
      </Drawer>
      </div>
    </Box>
  );
}