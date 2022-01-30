import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    backgroundColor: '#160C30',
    rowGap: '24px',
    '@media screen and (min-width: 768px)': {
      paddingBottom: '48px',
    }
  },
  title: {
    fontFamily: 'Chakra Petch',
    fontSize: '1.5rem',
    fontStyle: 'normal',
    lineHeight: '2rem',
    letterSpacing: '-0.011em',
    fontWeight: 700,
    textAlign: 'center',
    alignSelf: 'center',
    color: '#F08743',
    '@media screen and (min-width: 768px)': {
      marginTop: '41px',
    }
  },
  inputRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    '@media screen and (min-width: 768px)':
      {
        margin: '0 110px 0 110px',
        columnGap: '20px',
      },
    '@media screen and (max-width: 767px)': {
      margin: '0 5px 0 5px',
      columnGap: '20px',
    }

  },
  socialMediaButtonGroup: {
    display: 'flex',
    justifyContent: 'center',
    '@media screen and (min-width: 768px)': {
      flexDirection: 'row',
      columnGap: '10px',
      margin: '0 110px 0 110px',
    },
    '@media screen and (max-width: 767px)': {
      flexDirection: 'column',
      rowGap: '10px',
    }
  },
  inputRowItem: {
    flexGrow: 1,
  },
  actionButton: {
    background: 'linear-gradient(180deg, #EF507E 0%, #F09633 100%)',
    fontWeight: 700,
    fontSize: '1rem',
    lineHeight: '1.5rem',
    color: 'white',
    borderRadius: 0,
    padding: '16px 59px',
  },
  socialMediaButton: {
    flexGrow: 1,
    borderRadius: 0,
    color: 'white',
  }
});
