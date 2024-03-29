import { Button, useTheme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import { createStyles, makeStyles } from "@mui/styles";
import { useRouter } from "next/router";
import * as React from "react";
import { useRef, useState } from "react";
import {
  isLoggedInSelector,
  userProfileSelector,
} from "../../redux-store/authentication/authentication-selectors";
import { screenWidthSelector } from "../../redux-store/layout/layout-selectors";
import { useAppSelector } from "../../redux-store/redux-store";
import { signOut } from "../../service-clients/auth-service-client";
import { frontendSupabase } from "../../services/supabase-frontend-service";
import LoginModal from "../auth/login-modal/login-modal";
import {
  ComponentDimensions,
  createFromRef,
} from "../utils/component-dimensions";
import style from "./desktop-sidebar.module.css";

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
      marginLeft: "20px",
      color: "#ffffff",
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
      marginRight: "15px",
      width: "30px",
      height: "30px",
    },
  }));

export default function DrawerLeft(): JSX.Element {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const loginButtonRef = useRef<HTMLButtonElement>(null);
  const [loginButtonDimensions, setLoginButtonDimensions] = useState(
    new ComponentDimensions(0, 0, 0, 0, 0, 0, 0)
  );
  const screenWidth = useAppSelector(screenWidthSelector);
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  const user = useAppSelector(userProfileSelector);
  const userRef = useRef<any>(user);

  React.useEffect(() => {
    setInterval(async () => {
      if (userRef.current?.id) {
        await frontendSupabase
          .from("user_last_seen")
          .update({ last_seen: new Date() })
          .eq("user_id", userRef.current?.id);
      }
    }, 1000 * 45);
  }, [userRef]);

  React.useEffect(() => {
    userRef.current = user;
  }, [user]);

  // const username = useAppSelector(userNameSelector);
  // const wallet = useAppSelector(walletDetaislSelector);

  const classes = useRoundStatusStyles();

  const theme = useTheme();
  const router = useRouter();
  const { pathname } = router;

  function buttonStyle(expectedPaths: string[]): React.CSSProperties {
    if (expectedPaths.indexOf(pathname) === -1)
      return { color: "white", fontWeight: 700 };
    return {
      color: theme.palette.primary.main,
      fontWeight: 700,
      textDecoration: "blink",
      width: "180px",
      borderRadius: "8px",
      backgroundColor: "rgb(249 50 50)",
      background:
        "linear-gradient(90deg, rgba(105, 49, 249, 0.12) 9.34%, rgba(105, 49, 249, 0) 100%)",
    };
  }
  async function gotoHomePage(): Promise<void> {
    await router.push("/");
  }
  async function gotoRegisterPage(): Promise<void> {
    await router.push("/register");
  }
  async function gotoTeamListPage(): Promise<void> {
    await router.push("/teamlist");
  }
  async function gotoLeaderboardsPage(): Promise<void> {
    await router.push("/leaderboard");
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
    await router.push("/");
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
            <div style={{ textAlign: "center" }}>
              <Button
                style={{ backgroundColor: "transparent" }}
                onClick={gotoHomePage}
              >
                <img
                  src="/images/noobstorm-logo-small.png"
                  alt="noob storm logo"
                  className={style.logo}
                />
              </Button>
            </div>

            {isLoggedIn && user?.userRoles[0] === "noob-admin" && (
              <div
                className={style.container1}
                style={{ display: "flex", justifyContent: "center" }}
              >
                {user?.userRoles[0] === "noob-admin" ? (
                  <>
                    <Button
                      variant="text"
                      style={{ color: "white" }}
                      onClick={(): any => {
                        if (user?.userRoles[0] === "noob-admin") {
                          router.push("/tournament-dashboard");
                        } else {
                          router.push("/user-dashboard");
                        }
                      }}
                    >
                      Dashboard
                    </Button>
                    <span className={style.border}></span>
                  </>
                ) : null}
                <Button
                  variant="text"
                  style={{ color: "white" }}
                  onClick={(): any => router.push("/account/setting")}
                >
                  Account
                </Button>
              </div>
            )}

            <div className={style.container2}>
              <Button
                variant="text"
                style={buttonStyle(["/"])}
                onClick={gotoHomePage}
                className={classes.buttonStyles}
              >
                <img src="/images/menu/Home.png" className={classes.imgStyle} />
                Home
              </Button>
              <Button
                variant="text"
                className={classes.buttonStyles}
                onClick={(): any => router.push("/tournaments-list")}
              >
                <img
                  src="/images/menu/Tournaments.png"
                  className={classes.imgStyle}
                />
                Tournaments
              </Button>
              {isLoggedIn && (
                <Button
                  variant="text"
                  className={classes.buttonStyles}
                  onClick={gotoFreeAgencyMarketPage}
                >
                  <img
                    src="/images/menu/Free-Agency.png"
                    className={classes.imgStyle}
                  />
                  Free Agency
                </Button>
              )}
              {isLoggedIn && (
                <Button
                  variant="text"
                  className={classes.buttonStyles}
                  onClick={(): any => router.push("/account?default=social")}
                >
                  <img
                    src="/images/menu/Social.png"
                    className={classes.imgStyle}
                  />
                  Social
                </Button>
              )}

              {/* <Button
                variant="text"
                className={classes.buttonStyles}
                onClick={(): any => router.push("/social")}
              >
                <img src="/icons/Vector-FAQ.png" className={classes.imgStyle} />
                Social
              </Button> */}
              <Button
                variant="text"
                className={classes.buttonStyles}
                onClick={(): any => router.push("/blog")}
              >
                <img src="/images/menu/Blog.png" className={classes.imgStyle} />
                Blog
              </Button>
              {isLoggedIn && (
                <Button
                  variant="text"
                  className={classes.buttonStyles}
                  onClick={(): any => router.push("/chat")}
                >
                  <img
                    src="/images/menu/Chat.png"
                    className={classes.imgStyle}
                  />
                  Chat
                </Button>
              )}

              {isLoggedIn && (
                <Button
                  variant="text"
                  className={classes.buttonStyles}
                  onClick={(): any => router.push("/match-hub")}
                >
                  <img
                    src="/images/menu/Match-Hub.png"
                    className={classes.imgStyle}
                  />
                  Match Hub
                </Button>
              )}
              {isLoggedIn && (
                <Button
                  variant="text"
                  className={classes.buttonStyles}
                  onClick={(): any => router.push("/store")}
                >
                  <img
                    src="/images/menu/Store.png"
                    className={classes.imgStyle}
                  />
                  Store
                </Button>
              )}
              {isLoggedIn && (
                <Button
                  variant="text"
                  className={classes.buttonStyles}
                  onClick={gotoTeamListPage}
                >
                  <img
                    src="/images/menu/My-Team.png"
                    className={classes.imgStyle}
                  />
                  My Teams
                </Button>
              )}

              {isLoggedIn && (
                <Button
                  variant="text"
                  className={classes.buttonStyles}
                  onClick={(): any => router.push("/account/setting")}
                >
                  <img
                    src="/images/menu/Profile-Setting.png"
                    className={classes.imgStyle}
                  />
                  Account
                </Button>
              )}

              <Button
                variant="text"
                className={classes.buttonStyles}
                onClick={gotoLeaderboardsPage}
              >
                <img
                  src="/images/menu/Leader-Board.png"
                  className={classes.imgStyle}
                />
                Leaderboards
              </Button>
              <Button
                variant="text"
                className={classes.buttonStyles}
                onClick={(): any => router.push("/support")}
              >
                <img
                  src="/images/menu/Support.png"
                  className={classes.imgStyle}
                />
                Support
              </Button>
              {isLoggedIn && (
                <Button
                  variant="text"
                  className={classes.buttonStyles}
                  onClick={(): any => handleSignOut()}
                >
                  <img
                    src="/images/menu/Sign-Out.png"
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
                      src="/images/menu/Blog.png"
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
                      src="/images/menu/Sign-Out.png"
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
            <div className={style.container3} style={{ minHeight: 400 }}>
              {/* <Box className={classes.boxStyle}>
                <img src="/images/16276393842661.png" className={style.img2} />
                <Typography className={style.text1}>
                  Always keep in touch with your friends and watch their
                  activities, like and comment.{" "}
                </Typography>
                <Box className={style.box1}>
                  <span className={style.border2}></span>
                </Box>
                <Box className={style.box1}>
                  <IconButton
                    color="default"
                    aria-label="Youtube"
                    component="span"
                  >
                    <YoutubeIcon />
                  </IconButton>
                  <IconButton
                    color="default"
                    aria-label="Youtube"
                    component="span"
                  >
                    <img
                      src="/icons/Vector-DiscordIcon.png"
                      style={{ height: "19px" }}
                    />
                  </IconButton>
                  <IconButton
                    color="default"
                    aria-label="Youtube"
                    component="span"
                  >
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
              </Typography> */}
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
