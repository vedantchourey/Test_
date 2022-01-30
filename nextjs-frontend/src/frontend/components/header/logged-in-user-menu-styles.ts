import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  container: {
    height: '64px',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    columnGap: '16px',
    backgroundColor: '#160C30',
  },
  columnGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  userPic: {
    width: '64px',
    height: '64px',
    display: 'flex',
    flexDirection: 'row',
  },
  userIcon: {
    width: '64px',
    height: '64px',
  },
  username: {
    marginTop: '8px',
    justifySelf: 'left',
    fontSize: '1rem',
  },
  balance: {
    justifySelf: 'left',
    fontSize: '.7rem',
    marginTop: '9px',
    color: '#F08743',
  },
  menuGroup: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: '8px',
  },
  rightMenuGroup: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: '20px',
  },
  iconsGroup: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: '23px',
  }
});

