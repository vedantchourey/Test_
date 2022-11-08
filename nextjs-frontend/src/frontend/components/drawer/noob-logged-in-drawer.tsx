import {
  Dialog,
  Divider,
  IconButton,
  ListItemIcon,
  MenuItem,
  MenuList,
  Typography,
} from "@mui/material";
import styles from "./noob-drawer.module.css";
import * as React from "react";
import DiscordIcon from "../icons/discord-icon";
import TwitchIcon from "../icons/twitch-icon";
import YoutubeIcon from "../icons/youtube-icon";
import { useRouter } from "next/router";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import commonStyles from "../../styles/common.module.css";
import { useAppSelector } from "../../redux-store/redux-store";
import {
  isLoggedInSelector,
  userProfileSelector,
} from "../../redux-store/authentication/authentication-selectors";

interface Props {
  show: boolean;
  onClose: () => void;
  onLogoutClick: () => void;
}

export default function NoobLoggedInDrawer(props: Props): JSX.Element {
  const { show, onClose, onLogoutClick } = props;
  const router = useRouter();
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  const user = useAppSelector(userProfileSelector);

  async function gotoPage(url: string): Promise<void> {
    onClose();
    await router.push(url);
  }

  return (
    <Dialog open={show} onClose={onClose} fullScreen color="#08001C">
      <div className={styles.container}>
        <div className={commonStyles.flexGroup}>
          <div className={commonStyles.flexEqualSpace} />
          <div className={commonStyles.flexEqualSpace}>
            <Image
              src="/images/noobstorm-logo-small.png"
              width={130}
              height={28}
              alt="noob storm logo"
            />
          </div>
          <div className={styles.topMenuItemRight}>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </div>
        </div>
        <MenuList style={{ display: "flex", flexDirection: "row", paddingBottom: 0, paddingTop: 0 }}>
        {isLoggedIn && user?.userRoles[0] === "noob-admin" && (
          <MenuItem onClick={(): Promise<void> => gotoPage("/tournament-dashboard")}>
            <Typography fontSize={12}>Dashboard</Typography>
          </MenuItem>
        )}
          <MenuItem onClick={(): Promise<void> => gotoPage("/account/setting")}>
            <Typography fontSize={12}>Account</Typography>
          </MenuItem>
        </MenuList>
        <div className={styles.topMenuGroup}>
          <MenuList>
            <MenuItem onClick={(): Promise<void> => gotoPage("/")}>
              <ListItemIcon>
              <img src="/images/menu/Home.png" style={{ height: 20, width: 20 }} />
              </ListItemIcon>
              <Typography fontSize={12}>Home</Typography>
            </MenuItem>
            <MenuItem onClick={(): Promise<void> => gotoPage("/tournaments-list")}>
              <ListItemIcon>
              <img src="/images/menu/Tournaments.png" style={{ height: 20, width: 20 }} />
              </ListItemIcon>
              <Typography fontSize={12}>Tournaments</Typography>
            </MenuItem>
            <MenuItem onClick={(): Promise<void> => gotoPage("/free-agency-market/view/members")}>
              <ListItemIcon>
              <img src="/images/menu/Free-Agency.png" style={{ height: 20, width: 20 }} />
              </ListItemIcon>
              <Typography fontSize={12}>Free Agency</Typography>
            </MenuItem>
            <MenuItem onClick={(): Promise<void> => gotoPage("/account?default=social")}>
              <ListItemIcon>
              <img src="/images/menu/Social.png" style={{ height: 20, width: 20 }} />
              </ListItemIcon>
              <Typography fontSize={12}>Social</Typography>
            </MenuItem>
            <MenuItem onClick={(): Promise<void> => gotoPage("/blog")}>
              <ListItemIcon>
              <img src="/images/menu/Blog.png" style={{ height: 20, width: 20 }} />
              </ListItemIcon>
              <Typography fontSize={12}>Blog</Typography>
            </MenuItem>
            <MenuItem onClick={(): Promise<void> => gotoPage("/chat")}>
              <ListItemIcon>
              <img src="/images/menu/Chat.png" style={{ height: 20, width: 20 }} />
              </ListItemIcon>
              <Typography fontSize={12}>Chat</Typography>
            </MenuItem>
            <MenuItem onClick={(): Promise<void> => gotoPage("/match-hub")}>
              <ListItemIcon>
              <img src="/images/menu/Match-Hub.png" style={{ height: 20, width: 20 }} />
              </ListItemIcon>
              <Typography fontSize={12}>Match Hub</Typography>
            </MenuItem>
            <MenuItem onClick={(): Promise<void> => gotoPage("/store")}>
              <ListItemIcon>
              <img src="/images/menu/Store.png" style={{ height: 20, width: 20 }} />
              </ListItemIcon>
              <Typography fontSize={12}>Store</Typography>
            </MenuItem>
            <MenuItem onClick={(): Promise<void> => gotoPage("/teamlist")}>
              <ListItemIcon>
              <img src="/images/menu/My-Team.png" style={{ height: 20, width: 20 }} />
              </ListItemIcon>
              <Typography fontSize={12}>My Teams</Typography>
            </MenuItem>
            <MenuItem onClick={(): Promise<void> => gotoPage("/leaderboard")}>
              <ListItemIcon>
              <img src="/images/menu/Leader-Board.png" style={{ height: 20, width: 20 }} />
              </ListItemIcon>
              <Typography fontSize={12}>Leaderboards</Typography>
            </MenuItem>
            <MenuItem onClick={(): Promise<void> => gotoPage("/support")}>
              <ListItemIcon>
              <img src="/images/menu/Support.png" style={{ height: 20, width: 20 }} />
              </ListItemIcon>
              <Typography fontSize={12}>Support</Typography>
            </MenuItem>
            <MenuItem onClick={onLogoutClick}>
              <ListItemIcon>
              <img src="/images/menu/Sign-Out.png" style={{ height: 20, width: 20 }} />
              </ListItemIcon>
              <Typography fontSize={12}>Signout</Typography>
            </MenuItem>
          </MenuList>
        </div>
        <div className={styles.footerContainer}>
          <div className={styles.footer}>
            <DiscordIcon />
            <TwitchIcon />
            <YoutubeIcon />
          </div>
          <Divider />
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: 5 }}>
            <Typography sx={{ fontSize: 10 }}>
              Copyright © 2022. All Rights Reserved By
            </Typography>
            <Typography sx={{ color: "#6931F9", fontSize: 10, marginLeft: "3px" }}>NOOBSTORM</Typography>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
