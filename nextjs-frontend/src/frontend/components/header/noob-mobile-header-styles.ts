import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  appBar: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  topHeader: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    flexWrap: 'nowrap',
    height: '40px',
    margin: '16px',
  },
  bottomHeader: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    flexWrap: 'nowrap',
    height: '40px',
    margin: '0 16px 16px 16px',
  },
  bottomHeaderIcons: {
    flexGrow: 1,
  },
  appBarItem: {
    display: 'flex',
    flexGrow: 1,
    flexBasis: 0,
  },
  appBarItemMiddle: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    verticalAlign: 'center',
    margin: '10px 0 10px 0',
    flexBasis: 0,
  },
  appBarItemLast: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'flex-end',
    flexBasis: 0,
  },
  userIcon: {
    height: '48px',
    width: '48px',
  }
});

