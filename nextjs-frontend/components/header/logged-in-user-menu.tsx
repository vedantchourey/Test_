import { CardMedia, Icon, IconButton, Typography } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { authenticatedUser } from '../../services/front-end-services/auth/auth';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../store/redux-store';
import { isLoggedInSelector } from '../../store/authentication/authentication-selectors';
import styles from './logged-in-user-menu.module.css';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

export default function LoggedInUserMenu() {

  const [userName, setUserName] = useState('');
  const isLoggedIn = useAppSelector(isLoggedInSelector);

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

  return (
    <div className={styles.container}>
      <div className={styles.userPic}>
        <CardMedia
          component="img"
          sx={{width: 151}}
          image="/static/images/cards/live-from-space.jpg"
          alt="profile pic"
        />
      </div>
      <div className={styles.columnGroup}>
        <Typography className={styles.username}>{userName}</Typography>
        <Typography className={styles.balance}><Icon fontSize="inherit"><CurrencyRupeeIcon fontSize="inherit"/></Icon>600</Typography>
      </div>
      <div className={styles.menuGroup}>
        <IconButton aria-label="show user menu">
          <KeyboardArrowDownIcon/>
        </IconButton>
      </div>
    </div>
  );
}
