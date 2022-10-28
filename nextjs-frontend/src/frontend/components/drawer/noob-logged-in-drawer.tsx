import {
  Button,
  Dialog,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Typography,
  useTheme,
} from "@mui/material";
import styles from "./noob-drawer.module.css";
import * as React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import DiscordIcon from "../icons/discord-icon";
import TwitchIcon from "../icons/twitch-icon";
import YoutubeIcon from "../icons/youtube-icon";
import { useRouter } from "next/router";
import GroupIcon from '@mui/icons-material/Group';
import HomeIcon from '@mui/icons-material/Home';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import EmailIcon from '@mui/icons-material/Email';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ForumIcon from '@mui/icons-material/Forum';
import LogoutIcon from "@mui/icons-material/Logout";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import commonStyles from "../../styles/common.module.css";

interface Props {
  show: boolean;
  onClose: () => void;
  onLogoutClick: () => void;
}

export default function NoobLoggedInDrawer(props: Props): JSX.Element {
  const { show, onClose, onLogoutClick } = props;
  const theme = useTheme();
  const router = useRouter();

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
          <MenuItem onClick={(): Promise<void> => gotoPage("/tournament-dashboard")}>
            <Typography fontSize={12}>Dashboard</Typography>
          </MenuItem>
          <MenuItem onClick={(): Promise<void> => gotoPage("/teamlist")}>
            <Typography fontSize={12}>My Teams</Typography>
          </MenuItem>
        </MenuList>
        <div className={styles.topMenuGroup}>
          <MenuList>
            <MenuItem onClick={(): Promise<void> => gotoPage("/")}>
              <ListItemIcon>
                <HomeIcon fontSize="small" />
              </ListItemIcon>
              <Typography fontSize={12}>Home</Typography>
            </MenuItem>
            <MenuItem onClick={(): Promise<void> => gotoPage("/tournaments-list")}>
              <ListItemIcon>
                <EmojiEventsIcon fontSize="small" />
              </ListItemIcon>
              <Typography fontSize={12}>Tournaments</Typography>
            </MenuItem>
            <MenuItem onClick={(): Promise<void> => gotoPage("/leaderboard")}>
              <ListItemIcon>
                <AssessmentIcon fontSize="small" />
              </ListItemIcon>
              <Typography fontSize={12}>Leaderboards</Typography>
            </MenuItem>
            <MenuItem onClick={(): Promise<void> => gotoPage("/chat")}>
              <ListItemIcon>
                <EmailIcon fontSize="small" />
              </ListItemIcon>
              <Typography fontSize={12}>Message</Typography>
            </MenuItem>
            <MenuItem onClick={(): Promise<void> => gotoPage("/about-us")}>
              <ListItemIcon>
                <GroupIcon fontSize="small" />
              </ListItemIcon>
              <Typography fontSize={12}>About Us</Typography>
            </MenuItem>
            <MenuItem onClick={(): Promise<void> => gotoPage("/support")}>
              <ListItemIcon>
                <HelpOutlineIcon fontSize="small" />
              </ListItemIcon>
              <Typography fontSize={12}>Support</Typography>
            </MenuItem>
            <MenuItem onClick={(): Promise<void> => gotoPage("/faq")}>
              <ListItemIcon>
                <ForumIcon fontSize="small" />
              </ListItemIcon>
              <Typography fontSize={12}>FAQ</Typography>
            </MenuItem>
            <MenuItem onClick={onLogoutClick}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <Typography fontSize={12}>Logout</Typography>
            </MenuItem>
          </MenuList>
        </div>
        <Divider />
        <div className={styles.bottomMenuGroup} style={{ marginTop: 0 }}>
          <Button
            variant="text"
            startIcon={<ShoppingCartIcon />}
            style={{ textTransform: "none" }}
            onClick={(): Promise<void> => gotoPage("/store")}
          >
            Store
          </Button>
          <Button
            variant="text"
            startIcon={<FlashOnIcon />}
            style={{
              color: theme.palette.secondary.main,
              textTransform: "none",
            }}
            onClick={(): Promise<void> => gotoPage("/free-agency-market/view/members")}
          >
            Free Agency Market
          </Button>
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
