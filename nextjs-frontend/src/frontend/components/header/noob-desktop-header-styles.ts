import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  appHeader: {
    flexGrow: 1,
    background: 'rgba(76, 175, 80, 0)',
    display: 'flex',
    flexDirection: 'column',
    rowGap: '15px',
  },
  noobLogo: {
    display: 'flex',
    alignItems: 'center',
  },
  topMenu: {
    margin: '30px 70px 0 70px',
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
  },
  topLeftMenuGroup: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    verticalAlign: 'center',
    columnGap: '20px',
  },
  topRightMenuGroup: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    columnGap: '20px',
    verticalAlign: 'center',
  },
  bottomMenu: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    background: 'rgba(11, 11, 17, 0.5)'
  },
  bottomMenuLeftGroup: {
    marginLeft: '70px',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    columnGap: '20px',
    verticalAlign: 'center',
  },
  bottomMenuRightGroup: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    columnGap: '20px',
    verticalAlign: 'center',
    marginRight: '70px'
  }
});

