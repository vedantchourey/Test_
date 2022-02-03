import React from 'react';
import Image from 'next/image';
import { Button, Divider, Grid, IconButton, Typography, useTheme } from "@mui/material"
import styles from "./noob-footer.module.css"
import { useRouter } from 'next/router';
import YoutubeIcon from '../icons/youtube-icon';
import TwitchIcon from '../icons/twitch-icon';
import DiscordIcon from '../icons/discord-icon';

export default function NoobDesktopFooter() {

  const theme = useTheme();
  const router = useRouter()
  const { pathname } = router;
  function buttonStyle(expectedPaths: string[]): React.CSSProperties {
    if (expectedPaths.indexOf(pathname) === -1) return { color: 'white', fontWeight: 700 };
    return { color: theme.palette.primary.main, fontWeight: 700 };
  }

  async function gotoAboutUsPage() {
    await router.push('/about-us')
  }

  async function gotoHomePage() {
    await router.push('/')
  }

  async function gotoSupportPage() {
    await router.push('/support')
  }

  return (
    <div className={styles.footerContainer}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <Image src="/images/noobstorm-logo-small.png"
                width={130}
                height={28}
                alt="noob storm logo" />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button variant="text" style={buttonStyle(['/tournaments'])}>Tournaments</Button>
              <Button variant="text" style={buttonStyle(['/leaderboards'])}>Leaderboards</Button>
              <Button variant="text" onClick={gotoAboutUsPage} style={buttonStyle(['/about-us'])}>About Us</Button>
              <Button variant="text" onClick={gotoSupportPage} style={buttonStyle(['/support'])}>Support</Button>
            </Grid>
            <Grid item xs={12} sm={4} textAlign={"end"}>
              <IconButton color="default" aria-label="Youtube" component="span">
                <YoutubeIcon />
              </IconButton>
              <IconButton color="default" aria-label="Twitch" component="span">
                <TwitchIcon />
              </IconButton>
              <IconButton color="default" aria-label="Discord" component="span">
                <DiscordIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Typography color={"default"} variant="h3">
                        Copyright © 2021. All Rights Reserved By <Button variant="text" onClick={gotoHomePage}>
                            NOOBSTORM
            </Button>
          </Typography>
        </Grid>
      </Grid>
    </div>
  )
}