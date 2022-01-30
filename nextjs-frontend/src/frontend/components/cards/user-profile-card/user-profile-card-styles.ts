import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({

  imageBackgroundContainer: {
    maxWidth: '440px',
    height: '226px',
    flexGrow: 1,
    position: 'relative',
    display: 'flex',
  },

  editBackgroundButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
  },

  userProfilePic: {
    '@media screen and (min-width: 768px)': {
      position: 'absolute',
      bottom: '-78px',
      right: '142px',
    },
    '@media screen and (max-width: 768px)': {
      position: 'absolute',
      bottom: '-78px',
      right: 'calc((100% / 2) - 78px)',
    }
  },
  editAvatarButton: {
    '@media screen and (min-width: 768px)': {
      position: 'absolute',
      bottom: '10px',
      right: '155px',
      zIndex: 1
    },
    '@media screen and (max-width: 768px)': {
      position: 'absolute',
      bottom: '10px',
      right: 'calc((100% / 2) - 70px)',
      zIndex: 1,
    }
  },

  userDetailsContainer: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '20px',
    flexGrow: 1,
    marginTop: '113px',
    marginBottom: '30px',
  },

  userDetailsRow: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    marginLeft: '16px',
    marginRight: '16px'
  },

  userDetailKey: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexGrow: 1
  },

  userDetailValue: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexGrow: 1,
  },

  heading: {
    fontWeight: 'bold'
  }

});
