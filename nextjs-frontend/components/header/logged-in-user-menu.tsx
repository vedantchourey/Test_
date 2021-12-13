import { Divider, Icon, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, styled, Typography } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { authenticatedUser, signOut } from '../../services/front-end-services/auth/auth-service';
import { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../store/redux-store';
import { isLoggedInSelector } from '../../store/authentication/authentication-selectors';
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


const CustomMenu = styled(Menu)(({theme}) => {
  return ({
    '& .MuiPaper-root': {
      borderRadius: 0
    }
  });
});

export default function LoggedInUserMenu() {

  const isLoggedIn = useAppSelector(isLoggedInSelector);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [showMenu, setShowMenu] = useState(false);


  useEffect(() => {
    (async () => {
      if (isLoggedIn) {
        const user = await authenticatedUser();
        setUserName(user?.user_metadata?.username || '');
      } else {
        setUserName('');
      }
    })()
  }, [isLoggedIn]);

  function handleClose() {
    setShowMenu(false);
  }

  function onDownArrowClick() {
    setShowMenu(true);
  }

  async function handleSignOut() {
    handleClose();
    await signOut();
  }

  async function handleAccountItem() {
    handleClose();
    await router.push('/account')
  }

  return (
    <div className={styles.rightMenuGroup}>
      <div className={styles.iconsGroup}>
        <IconButton>
          <ChatBubbleOutlineOutlinedIcon/>
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon/>
        </IconButton>
      </div>
      <div className={styles.container} ref={containerRef}>
        <div className={styles.userPic}>
          <Icon className={styles.userIcon}>
            <PersonIcon className={styles.userIcon}/>
          </Icon>
        </div>
        <div className={styles.columnGroup}>
          <Typography className={styles.username}>{userName}</Typography>
          <Typography className={styles.balance}><Icon fontSize="inherit"><CurrencyRupeeIcon fontSize="inherit"/></Icon>600</Typography>
        </div>
        <div className={styles.menuGroup}>
          <IconButton aria-label="show user menu" onClick={onDownArrowClick}>
            <KeyboardArrowDownIcon/>
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
          <MenuItem onClick={handleAccountItem}><ListItemIcon><PersonIcon fontSize="small"/></ListItemIcon><ListItemText>Account</ListItemText></MenuItem>
          <MenuItem onClick={handleClose}><ListItemIcon><DashboardIcon fontSize="small"/></ListItemIcon><ListItemText>Dashboard</ListItemText></MenuItem>
          <MenuItem onClick={handleClose}><ListItemIcon><ShoppingBagIcon fontSize="small"/></ListItemIcon><ListItemText>Orders</ListItemText></MenuItem>
          <MenuItem onClick={handleClose}><ListItemIcon><AccountBalanceWalletIcon fontSize="small"/></ListItemIcon><ListItemText>Wallet</ListItemText></MenuItem>
          <MenuItem onClick={handleClose}><ListItemIcon><SettingsIcon fontSize="small"/></ListItemIcon><ListItemText>Profile Settings</ListItemText></MenuItem>
          <MenuItem onClick={handleClose}><ListItemIcon><WatchLaterIcon fontSize="small"/></ListItemIcon><ListItemText>Active Tournaments</ListItemText></MenuItem>
          <Divider/>
          <MenuItem onClick={handleSignOut}><ListItemIcon><LogoutIcon fontSize="small"/></ListItemIcon><ListItemText>Logout</ListItemText></MenuItem>
        </CustomMenu>
      </div>
    </div>
  );
}
