import { AppBar, Icon, IconButton, Button, Box, Divider } from "@mui/material";
import styles from "./noob-mobile-header.module.css";
import * as React from "react";
import { useState } from "react";
import NoobDrawer from "../drawer/noob-drawer";
import LoginModal from "../auth/login-modal/login-modal";
import { useAppDispatch, useAppSelector } from "../../redux-store/redux-store";
import { isLoggedInSelector } from "../../redux-store/authentication/authentication-selectors";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import EqualizerOutlinedIcon from "@mui/icons-material/EqualizerOutlined";
import MilitaryTechOutlinedIcon from "@mui/icons-material/MilitaryTechOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { signOut } from "../../service-clients/auth-service-client";
import { setMobileHeaderHeight } from "../../redux-store/layout/layout-slice";
import { mobileHeaderHeightSelector } from "../../redux-store/layout/layout-selectors";
import { useRouter } from "next/router";
import style from "./mobile-sidebar.module.css";

export default function MobileDrawer(): JSX.Element {
  const [showMenu, setShowMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const toggleDrawer = (): void => setShowMenu(true);
  const hideMenu = (): void => setShowMenu(false);
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  const appDispatch = useAppDispatch();
  const currentHeight = useAppSelector(mobileHeaderHeightSelector);
  const router = useRouter();

  function onSuccessfulLogin(): void {
    setShowLoginModal(false);
  }

  function onLoginClick(): void {
    setShowLoginModal(true);
    hideMenu();
  }

  async function onLogoutClick(): Promise<void> {
    hideMenu();
    await signOut();
  }

  const updateMobileHeight = (element: HTMLDivElement | null): void => {
    if (!element?.clientHeight) return;
    if (currentHeight === element?.clientHeight) return;
    appDispatch(setMobileHeaderHeight(element?.clientHeight || 0));
  };

  return (
    <>
      <AppBar
        position="fixed"
        className={styles.appBar}
        ref={updateMobileHeight}
      >
        <div className={style.container}>
          <Box>
            <IconButton onClick={toggleDrawer}>
              <img src="/icons/Vector-MenuIcon.png" />
            </IconButton>
          </Box>
          <Box>
            <img src="/icons/logo-white-1.png" className={style.img1} />
            <span className={style.border1}></span>
            <img
              src="/images/noobstorm-logo-small.png"
              className={style.img2}
            />
          </Box>
          <Box>
            <Button
              variant="text"
              className={style.button1}
              startIcon={<img src="/icons/Vector-Wallet.png" />}
            >
              $240.00
            </Button>
          </Box>
          <Box>
            <img src="/icons/Vector-Bell.png" className={style.img3} />
            <img src="/icons/Vector-Ellipse.png" className={style.img4} />
          </Box>
        </div>
        <Divider />
        {/* <div className={style.container}>
          <Box>
            <img src="/icons/Vector-home2.png" className={style.img5} />
          </Box>
          <Box>
            <img src="/icons/Vector-Tournaments2.png" className={style.img5} />
          </Box>
          <Box>
            <img src="/icons/Vector-Leaderboards.png" className={style.img5} />
          </Box>
          <Box className={style.box}>
            <img src="/icons/Vector-Search.png" style={{ width: "16px" }} />
          </Box>
        </div> */}

        {isLoggedIn && (
          <div className={styles.bottomHeader}>
            <IconButton
              className={styles.bottomHeaderIcons}
              onClick={(): Promise<boolean> => router.push("/")}
            >
              <Icon>
                <HomeOutlinedIcon />
              </Icon>
            </IconButton>
            <IconButton
              className={styles.bottomHeaderIcons}
              onClick={(): Promise<boolean> => router.push("/tournaments-list")}
            >
              <Icon>
                <EqualizerOutlinedIcon />
              </Icon>
            </IconButton>
            <IconButton
              className={styles.bottomHeaderIcons}
              onClick={(): Promise<boolean> => router.push("/leaderboard")}
            >
              <Icon>
                <MilitaryTechOutlinedIcon />
              </Icon>
            </IconButton>
            <IconButton
              className={styles.bottomHeaderIcons}
              onClick={(): Promise<boolean> => router.push("/")}
            >
              <Icon>
                <NotificationsOutlinedIcon />
              </Icon>
            </IconButton>
            <IconButton
              className={styles.bottomHeaderIcons}
              onClick={(): Promise<boolean> => router.push("/chat")}
            >
              <Icon>
                <ChatBubbleOutlineOutlinedIcon />
              </Icon>
            </IconButton>
          </div>
        )}
      </AppBar>
      <NoobDrawer
        show={showMenu}
        onClose={hideMenu}
        onLoginClick={onLoginClick}
        onLogoutClick={onLogoutClick}
      />
      <LoginModal
        show={showLoginModal}
        onCancel={(): void => setShowLoginModal(false)}
        onSuccessfulLogin={onSuccessfulLogin}
      />
    </>
  );
}
