import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    backgroundColor: '#08001C',
    height: '100vh'
  },

  topMenuGroup: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
  },

  topMenuItemLeft: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'flex-start',
    columnGap: '20px',
  }

  , topMenuItemRight: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'flex-end',
    flexBasis: 0,
  }

  , bottomMenuGroup: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    margin: '20px 0 20px 0',
    columnGap: '20px',
  }

  , flexRowWrap: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  }

  , footerContainer: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    marginTop: '20px',
    justifyContent: 'flex-end',
  }

  , footer: {
    marginTop: 'auto',
    columnGap: '20px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: '60px',
  }

});

