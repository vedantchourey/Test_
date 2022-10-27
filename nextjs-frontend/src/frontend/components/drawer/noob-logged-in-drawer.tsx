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
        <div className={styles.topMenuGroup}>
          <MenuList>
            <MenuItem onClick={(): Promise<void> => gotoPage("/")}>
              <ListItemIcon>
                <HomeIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Home</ListItemText>
            </MenuItem>
            <MenuItem onClick={(): Promise<void> => gotoPage("/tournaments-list")}>
              <ListItemIcon>
                <EmojiEventsIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Tournaments</ListItemText>
            </MenuItem>
            <MenuItem onClick={(): Promise<void> => gotoPage("/leaderboard")}>
              <ListItemIcon>
                <AssessmentIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Leaderboards</ListItemText>
            </MenuItem>
            <MenuItem onClick={(): Promise<void> => gotoPage("/chat")}>
              <ListItemIcon>
                <EmailIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Message</ListItemText>
            </MenuItem>
            <MenuItem onClick={(): Promise<void> => gotoPage("/about-us")}>
              <ListItemIcon>
                <GroupIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>About Us</ListItemText>
            </MenuItem>
            <MenuItem onClick={(): Promise<void> => gotoPage("/support")}>
              <ListItemIcon>
                <HelpOutlineIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Support</ListItemText>
            </MenuItem>
            <MenuItem onClick={(): Promise<void> => gotoPage("/faq")}>
              <ListItemIcon>
                <ForumIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>FAQ</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem onClick={onLogoutClick}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </MenuItem>
          </MenuList>
        </div>
        <Divider />
        <div className={styles.bottomMenuGroup}>
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
