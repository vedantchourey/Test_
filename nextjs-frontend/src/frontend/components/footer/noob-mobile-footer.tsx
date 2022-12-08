import React from 'react';
import Image from 'next/image';
import { Button, Divider, Grid, IconButton, Typography, useTheme } from "@mui/material"
import styles from "./noob-footer.module.css"
import { useRouter } from 'next/router';
import { useAppSelector } from "../../../../src/frontend/redux-store/redux-store";
import { isDeviceTypeSelector } from "../../../../src/frontend/redux-store/layout/layout-selectors";
import { deviceTypes } from '../../../../src/frontend/redux-store/layout/device-types';
import { Instagram, LinkedIn, Twitter, YouTube } from '@mui/icons-material';

export default function NoobMobileFooter(): JSX.Element {
  const theme = useTheme();
  const router = useRouter()
  const { pathname } = router;
  function buttonStyle(expectedPaths: string[]): React.CSSProperties {
    if (expectedPaths.indexOf(pathname) === -1) return { color: 'white', fontWeight: 700 };
    return { color: theme.palette.primary.main, fontWeight: 700 };
  }

  async function gotoAboutUsPage(): Promise<void> {
    await router.push('/about-us')
  }

  async function gotoHomePage(): Promise<void> {
    await router.push('/')
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

  async function gotoYoutubeLink(): Promise<void> {
    await router.push('https://www.youtube.com/@noobstormgaming4953/featured')
  }

  async function gotoTwitterLink(): Promise<void> {
    await router.push('https://twitter.com/NoobstormGaming')
  }

  async function gotoInstagramLink(): Promise<void> {
    await router.push('https://www.instagram.com/noobstorm_gaming/')
  }

  async function gotoLinkedInLink(): Promise<void> {
    await router.push('https://www.linkedin.com/company/noobstorm-gaming/about/?viewAsMember=true')
  }

  const isDesktop = useAppSelector((x) => isDeviceTypeSelector(x, deviceTypes.desktop));

  return isDesktop ? (
    <div className={styles.footerContainer}>
      <Grid container spacing={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Image
              src="/images/noobstorm-logo-small.png"
              width={130}
              height={28}
              alt="noob storm logo"
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="text" style={buttonStyle(["/tournaments"])}>
              Tournaments
            </Button>
            <Button variant="text" style={buttonStyle(["/leaderboards"])}>
              Leaderboards
            </Button>
            <Button
              variant="text"
              onClick={gotoAboutUsPage}
              style={buttonStyle(["/about-us"])}
            >
              About Us
            </Button>
            <Button variant="text" style={buttonStyle(["/support"])}>
              Support
            </Button>
            <Button variant="text" style={buttonStyle(["/support"])}>
              FAQ
            </Button>
          </Grid>
          <Grid item xs={12}>
            <IconButton
              size="medium"
              color="default"
              aria-label="LinkedIn"
              component="span"
              onClick={gotoLinkedInLink}
            >
              <LinkedIn />
            </IconButton>
            <IconButton
              size="medium"
              color="default"
              aria-label="Youtube"
              component="span"
              onClick={gotoYoutubeLink}
            >
              <YouTube />
            </IconButton>
            <IconButton
              size="medium"
              color="default"
              aria-label="Instagram"
              component="span"
              onClick={gotoInstagramLink}
            >
              <Instagram />
            </IconButton>
            <IconButton
              size="medium"
              color="default"
              aria-label="Twitter"
              component="span"
              onClick={gotoTwitterLink}
            >
              <Twitter />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Typography color={"default"} variant="h3" fontSize={10}>
            Copyright © 2022. All Rights Reserved By
            <Button variant="text" onClick={gotoHomePage}>
              NOOBSTORM
            </Button>
          </Typography>
        </Grid>
      </Grid>
    </div>
  ) : (
    <div className={styles.mobileContainer}>
      <Image
        src="/images/noobstorm-logo-small.png"
        width={130}
        height={28}
        alt="noob storm logo"
      />
      <Button variant="text" style={buttonStyle(["/tournaments"])}>
        Tournaments
      </Button>
      <Button variant="text" style={buttonStyle(["/leaderboards"])}>
        Leaderboards
      </Button>
      <Button
        variant="text"
        onClick={gotoAboutUsPage}
        style={buttonStyle(["/about-us"])}
      >
        About Us
      </Button>
      <Button variant="text" style={buttonStyle(["/support"])}>
        Support
      </Button>
      <Button variant="text" 
        style={buttonStyle(["/faq"])}
        onClick={gotoFaqPage}>
        FAQ
      </Button>
      <Button variant="text"   
        onClick={gotoHowItworksPage}
        style={buttonStyle(["/how-it-works"])}>
        How it Works
      </Button>
      <Button variant="text"   
        onClick={gotoDisputesPage}
        style={buttonStyle(["/disputes"])}>
        Disputes and Code of Conduct
      </Button>
      
      <div style={{ display: "flex", flexDirection: "row" }}>
      <IconButton
          size="medium"
          color="default"
          aria-label="LinkedIn"
          component="span"
          onClick={gotoLinkedInLink}
        >
          <LinkedIn />
        </IconButton>
        <IconButton
          size="medium"
          color="default"
          aria-label="Youtube"
          component="span"
          onClick={gotoYoutubeLink}
        >
          <YouTube />
        </IconButton>
        <IconButton
          size="medium"
          color="default"
          aria-label="Instagram"
          component="span"
          onClick={gotoInstagramLink}
        >
          <Instagram />
        </IconButton>
        <IconButton
          size="medium"
          color="default"
          aria-label="Twitter"
          component="span"
          onClick={gotoTwitterLink}
        >
          <Twitter />
        </IconButton>
      </div>
      <Divider style={{ width: "30%", marginTop: 10 }} />
      <Typography
        color={"default"}
        variant="h3"
        fontSize={12}
        style={{ display: "flex", flexDirection: "row", marginTop: 10 }}
      >
        Copyright © 2022. All Rights Reserved By
        <Typography
          onClick={gotoHomePage}
          style={{ fontSize: 12, color: "white", marginLeft: 3 }}
        >
          NOOBSTORM
        </Typography>
      </Typography>
    </div>
  );
}
