import FlashOnIcon from '@mui/icons-material/FlashOn';
import { Button, IconButton, Typography, useTheme } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import { createStyles, makeStyles } from "@mui/styles";
import { useRouter } from 'next/router';
import * as React from 'react';
import { useRef, useState } from 'react';
import { isLoggedInSelector } from '../../redux-store/authentication/authentication-selectors';
import { screenWidthSelector } from '../../redux-store/layout/layout-selectors';
import { useAppSelector } from '../../redux-store/redux-store';
import { signOut } from '../../service-clients/auth-service-client';
import LoginModal from '../auth/login-modal/login-modal';
import TwitchIcon from '../icons/twitch-icon';
import YoutubeIcon from '../icons/youtube-icon';
import { ComponentDimensions, createFromRef } from '../utils/component-dimensions';
import style from './desktop-sidebar.module.css';

const drawerWidth = 280;

const useRoundStatusStyles = makeStyles(() =>
  createStyles({
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    root: {
      display: "flex",
    },
    buttonStyles: {
      margin: "10px",
      marginLeft: "30px",
      color: "#ffffff",
      opacity: "0.31",
      justifyContent: "flex-start",
      width: "180px",
      " & .hover": {
        background:
          "linear-gradient(90deg, rgba(105, 49, 249, 0.12) 9.34%, rgba(105, 49, 249, 0) 100%)",
      },
    },
    boxStyle: {
      width: "209px",
      height: "304px",
      background:
        "linear-gradient(196.04deg, #08001C -37.47%, rgba(15, 5, 38, 0) 89.41%)",
      borderRadius: "5px",
    },
    imgStyle: {
      marginRight: "20px",
      width: "15px",
      height: "16px",
      marginTop: "-5px",
    },
  }));

export default function DrawerLeft(): JSX.Element {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const loginButtonRef = useRef<HTMLButtonElement>(null);
  const [loginButtonDimensions, setLoginButtonDimensions] = useState(new ComponentDimensions(0, 0, 0, 0, 0, 0, 0))
  const screenWidth = useAppSelector(screenWidthSelector);
  const isLoggedIn = useAppSelector(isLoggedInSelector);

  // const username = useAppSelector(userNameSelector);
  // const wallet = useAppSelector(walletDetaislSelector);

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
  async function gotoRegisterPage(): Promise<void> {
    await router.push('/register')
  }
  async function gotoTeamListPage(): Promise<void> {
    await router.push('/teamlist')
  }
  async function gotoFreeAgencyMarketPage(): Promise<void> {
    await router.push("/free-agency-market/view/members");
  }
  function onSuccessfulLogin(): void {
    setShowLoginModal(false);
  }

  function onShowLoginModal(): void {
    setLoginButtonDimensions(createFromRef(loginButtonRef));
    setShowLoginModal(true);
  }

  async function handleSignOut(): Promise<void> {
    await signOut();
    await router.push('/');
  }

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
          }}
        ></AppBar>
        <div className={classes.root}>
          <Drawer
            PaperProps={{
              style: {
                height: "auto",
                position: "absolute",
                borderRight: "0px",
              },
            }}
            className={classes.drawer}
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
            variant="permanent"
            classes={{ paper: classes.drawerPaper }}
          >
            <div>
              <Button style={{ backgroundColor: 'transparent' }} onClick={gotoHomePage}>
              <img
                src="/images/noobstorm-logo-small.png"
                alt="noob storm logo"
                className={style.logo}
              />
              </Button>
            </div>
            <div className={style.container1}>
              <Button
                variant="text"
                style={{ color: "white" }}
                onClick={gotoHomePage}
              >
                Dashboard
              </Button>
              <span className={style.border}></span>
              <Button
                variant="text"
                style={{ color: "white" }}
                onClick={gotoTeamListPage}
              >
                Account
              </Button>
            </div>
            {/*{isLoggedIn && (
              <div className={style.container4}>
                <img src="/images/16276393842661.png" className={style.img3} />
                <Box>
                  <Typography className={style.text1}>{username}</Typography>
                  <Button
                    variant="text"
                    className={style.button4}
                    onClick={(): any => router.push("/wallet/info")}
                    startIcon={<img src="/icons/Vector-Wallet.png" />}
                  >
                    {wallet?.balance}
                  </Button>
                </Box>
              </div>
            )}*/}

            <div className={style.container2}>
              <Button
                variant="text"
                style={buttonStyle(["/"])}
                onClick={gotoHomePage}
                className={classes.buttonStyles}
              >
                <img
                  src="/icons/Vector-home.png"
                  className={classes.imgStyle}
                />
                Home
              </Button>
              <Button variant="text" className={classes.buttonStyles}>
                <img
                  src="/icons/Vector-Tournaments.png"
                  className={classes.imgStyle}
                />
                Tournaments
              </Button>
              <Button sx={{display:"flex"}} variant="text" startIcon={<FlashOnIcon />} className={classes.buttonStyles} onClick={gotoFreeAgencyMarketPage}>
                  Free Agency Market
              </Button>
              <Button variant="text" className={classes.buttonStyles}>
                <img src="/icons/Vector-FAQ.png" className={classes.imgStyle} />
                Social
              </Button>
              <Button variant="text" className={classes.buttonStyles}>
                <img src="/icons/Vector-FAQ.png" className={classes.imgStyle} />
                News
              </Button>
              <Button variant="text" className={classes.buttonStyles}>
                <img src="/icons/Vector-FAQ.png" className={classes.imgStyle} />
                Chat
              </Button>
              <Button
                variant="text"
                className={classes.buttonStyles}
                onClick={(): any => router.push("/match-hub")}
              >
                <img src="/icons/Vector-FAQ.png" className={classes.imgStyle} />
                Match Hub
              </Button>
              <Button variant="text" className={classes.buttonStyles} onClick={gotoTeamListPage}>
              <img src="/icons/Vector-FAQ.png" className={classes.imgStyle} />
                My Teams
              </Button>
              <Button variant="text" className={classes.buttonStyles}>
                <img
                  src="/icons/Vector-Leaderboards.png"
                  className={classes.imgStyle}
                />
                Leaderboards
              </Button>
              <Button variant="text" className={classes.buttonStyles}>
                <img
                  src="/icons/Vector-Support.png"
                  className={classes.imgStyle}
                />
                Support
              </Button>
              {/*<Button variant="text" className={classes.buttonStyles}>
                <img
                  src="/icons/Vector-Message.png"
                  className={classes.imgStyle}
                />
                Message
              </Button>
              <Button variant="text" className={classes.buttonStyles}>
                <img
                  src="/icons/Vector-Aboutus.png"
                  className={classes.imgStyle}
                />
                About Us
              </Button>
              <Button variant="text" className={classes.buttonStyles}>
                <img src="/icons/Vector-FAQ.png" className={classes.imgStyle} />
                FAQ
            </Button>*/}
              {isLoggedIn && (
                <Button
                  variant="text"
                  className={classes.buttonStyles}
                  onClick={(): any => handleSignOut()}
                >
                  <img
                    src="/icons/Vector-FAQ.png"
                    className={classes.imgStyle}
                  />
                  Sign out
                </Button>
              )}

              {!isLoggedIn && (
                <Box>
                  <Button
                    variant="text"
                    className={classes.buttonStyles}
                    onClick={gotoRegisterPage}
                  >
                    <img
                      src="/icons/Vector-Register.png"
                      className={classes.imgStyle}
                    />
                    Register
                  </Button>

                  <Button
                    variant="text"
                    ref={loginButtonRef}
                    className={classes.buttonStyles}
                    onClick={onShowLoginModal}
                  >
                    <img
                      src="/icons/Vector-SignIn.png"
                      className={classes.imgStyle}
                    />
                    Sign In
                  </Button>
                </Box>
              )}
              {/* {isLoggedIn && (
                <div className={styles.topRightMenuGroup}>
                  <LoggedInUserMenu />
                </div>
              )} */}
            </div>
            <div className={style.container3}>
              <Box className={classes.boxStyle}>
                <img src="/images/16276393842661.png" className={style.img2} />
                <Typography className={style.text1}>
                  Always keep in touch with your friends and watch their
                  activities, like and comment.{" "}
                </Typography>
                <Box className={style.box1}>
                  <span className={style.border2}></span>
                </Box>
                <Box className={style.box1}>
                <IconButton color="default" aria-label="Youtube" component="span">
                  <YoutubeIcon />
                </IconButton>
                <IconButton color="default" aria-label="Youtube" component="span">
                  <img
                    src="/icons/Vector-DiscordIcon.png"
                    style={{ height: "19px" }}
                  />
                </IconButton>
                <IconButton color="default" aria-label="Youtube" component="span">
                  <TwitchIcon />
                </IconButton>
                </Box>
              </Box>
              <Box className={style.box1}>
                <span className={style.border3}></span>
              </Box>
              <Typography
                color={"default"}
                variant="h3"
                style={{ fontSize: "13px" }}
              >
                Copyright © 2021. All Rights Reserved By{" "}
                <Button variant="text" onClick={gotoHomePage}>
                  {" "}
                  NOOBSTORM{" "}
                </Button>
              </Typography>
            </div>
          </Drawer>
        </div>
      </Box>
      <LoginModal
        show={showLoginModal}
        onSuccessfulLogin={onSuccessfulLogin}
        onCancel={(): void => setShowLoginModal(false)}
        top={loginButtonDimensions.bottom / 2}
        right={screenWidth / 2}
      />
    </>
  );
}