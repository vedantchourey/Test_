import { createUseStyles } from 'react-jss';

export const useCommonStyles = createUseStyles({
  container: {
    padding: '0 2rem'
  },
  main: {
    minHeight: '100vh',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    '@media screen and (max-width: 767px)': {
      margin: 0
    }
  },
  whiteText: {
    color: 'white'
  },
  simpleMessageContent: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingTop: '26px',
    paddingBottom: '26px',
    width: '100%',
    lineHeight: '1.3rem',
    columnGap: '20px',
  },
  flexGroup: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    alignItems: 'center',
  },
  flexEqualSpace: {
    flexGrow: 1,
    flexBasis: 0,
  },
  actionButton: {
    background: 'linear-gradient(180deg, #EF507E 0%, #F09633 100%)',
    fontWeight: 700,
    fontSize: '1rem',
    lineHeight: '1.5rem',
    color: 'white',
    borderRadius: 0,
    padding: '16px 59px',
  }
});
