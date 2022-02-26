import { Avatar, Box, CircularProgress, Divider, Icon, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, styled, TextField, Typography } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { signOut } from '../../service-clients/auth-service-client';
import { useRef, useState } from 'react';
import { useAppSelector } from '../../redux-store/redux-store';
import { avatarImageBlobUrlSelector, userNameSelector } from '../../redux-store/authentication/authentication-selectors';
import styles from './logged-in-user-menu.module.css';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SettingsIcon from '@mui/icons-material/Settings';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import LogoutIcon from '@mui/icons-material/Logout';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { useRouter } from 'next/router';
import SearchIcon from '@mui/icons-material/Search';
import { ISearchPeopleByUsernameResponse } from "../../service-clients/messages/i-search";
import { searchPeopleByText } from "../../service-clients/search-service-client";
import frontendConfig from '../../utils/config/front-end-config';

const CustomMenu = styled(Menu)(() => {
  return ({
    '& .MuiPaper-root': {
      borderRadius: 0
    }
  });
});

export default function LoggedInUserMenu(): JSX.Element {

  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const username = useAppSelector(userNameSelector);
  const avatarUrl = useAppSelector(avatarImageBlobUrlSelector);
  const [userList, setUserList] = useState<ISearchPeopleByUsernameResponse[]>([])
  const [isFetching, setIsFetching] = useState(false)

  function handleClose(): void {
    setShowMenu(false);
  }

  function onDownArrowClick(): void {
    setShowMenu(true);
  }

  async function handleSignOut(): Promise<void> {
    handleClose();
    await signOut();
    await router.push('/');
  }

  async function handleAccountItem(): Promise<void> {
    handleClose();
    await router.push('/account')
  }

  async function handleSettings(): Promise<void> {
    handleClose();
    await router.push('/account/setting')
  }

  function getUserAvatar(): JSX.Element {
    if (avatarUrl == null) return (<Icon className={styles.userIcon}><PersonIcon className={styles.userIcon} /></Icon>);
    return <img className={styles.userIcon} src={avatarUrl} alt="avatar" />
  }


  async function searchByUserName(username: string): Promise<void> {
    setIsFetching(true);
    setUserList([]);
    if (!username) {
      setIsFetching(false);
      return;
    }
    const response = await searchPeopleByText({ search: username });
    if (response.length) setUserList(response);
    setIsFetching(false)
  }

  const renderResults = (): JSX.Element => {
    if (isFetching) {
      return (
        <List className={styles.searchListLoder} sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          <CircularProgress />
        </List>
      )
    }
    else if (!isFetching && userList.length) {
      return (
        <List className={styles.searchList} sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {userList.map((data, i) => (
            <ListItem key={Date.now() + i}>
              <ListItemButton onClick={(): unknown => router.push(`/account/${data.username}`)} sx={{ padding: '2px 18px', my: 1 }}>
                <ListItemAvatar>
                  <Avatar sx={{ width: 35, height: 35 }} alt="profile image" src={`${frontendConfig.storage.publicBucketUrl}/${frontendConfig.storage.publicBucket}/${data.avatarUrl}`}>
                    {data.username.split('')[0].toUpperCase()}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText className={styles.listText}>
                  <Typography>
                    @{data.username}
                  </Typography>
                  {/* <Typography variant="caption" color='#F08743'>
                    {data.firstName} {data.lastName}
                  </Typography> */}
                </ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )
    }

    // eslint-disable-next-line no-else-return
    else {
      return (
        <></>
        /*  <List className={styles.searchListLoder} sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
           <h1>No data found</h1>
         </List> */
      )
    }

  }

  return (
    <div className={styles.rightMenuGroup}>
      <Box sx={{ position: 'relative' }}>
        <Box className={styles.searchBar}>
          <TextField
            placeholder="Search anything..."
            variant="standard"
            InputProps={{
              disableUnderline: true,
            }}
            sx={{ '& ::placeholder': { fontWeight: 500, color: 'white', fontFamily: 'Inter' } }}
            onChange={(e): void => {
              searchByUserName(e.target.value)
            }}
            id="userSearchInput"
          />
          <SearchIcon color="primary" />
        </Box>
        {renderResults()}
      </Box>
      <div className={styles.iconsGroup}>
        <IconButton>
          <ChatBubbleOutlineOutlinedIcon />
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
      </div>
      <div className={styles.container} ref={containerRef}>
        <div className={styles.userPic}>
          {getUserAvatar()}
        </div>
        <div className={styles.columnGroup}>
          <Typography className={styles.username}>{username}</Typography>
          <Typography className={styles.balance}><Icon fontSize="inherit"><CurrencyRupeeIcon fontSize="inherit" /></Icon>600</Typography>
        </div>
        <div className={styles.menuGroup}>
          <IconButton aria-label="show user menu" onClick={onDownArrowClick}>
            <KeyboardArrowDownIcon />
          </IconButton>
        </div>
        <CustomMenu id="basic-menu"
          anchorEl={containerRef?.current}
          open={showMenu}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleAccountItem}><ListItemIcon><PersonIcon fontSize="small" /></ListItemIcon><ListItemText>Account</ListItemText></MenuItem>
          <MenuItem onClick={handleClose}><ListItemIcon><DashboardIcon fontSize="small" /></ListItemIcon><ListItemText>Dashboard</ListItemText></MenuItem>
          <MenuItem onClick={handleClose}><ListItemIcon><ShoppingBagIcon fontSize="small" /></ListItemIcon><ListItemText>Orders</ListItemText></MenuItem>
          <MenuItem onClick={handleClose}><ListItemIcon><AccountBalanceWalletIcon fontSize="small" /></ListItemIcon><ListItemText>Wallet</ListItemText></MenuItem>
          <MenuItem onClick={handleSettings}><ListItemIcon><SettingsIcon fontSize="small" /></ListItemIcon><ListItemText>Profile Settings</ListItemText></MenuItem>
          <MenuItem onClick={handleClose}><ListItemIcon><WatchLaterIcon fontSize="small" /></ListItemIcon><ListItemText>Active Tournaments</ListItemText></MenuItem>
          <Divider />
          <MenuItem onClick={handleSignOut}><ListItemIcon><LogoutIcon fontSize="small" /></ListItemIcon><ListItemText>Logout</ListItemText></MenuItem>
        </CustomMenu>
      </div>
    </div >
  );
}
