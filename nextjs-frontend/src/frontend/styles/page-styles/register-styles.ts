import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  mainBanner: {
    background: 'linear-gradient(180deg, #EF507E 0%, #F09633 100%)',
    flexGrow: 1,
    maxHeight: '120px',
    height: '120px',
    justifyContent: 'center',
    alignContent: 'center',
    display: 'flex',
  },
  mainBannerText: {
    fontFamily: 'Chakra Petch',
    fontSize: '2.6rem',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: '3rem',
    letterSpacing: '-0.011em',
    textAlign: 'center',
    alignSelf: 'center',
    color: 'white',
  },
  registrationFormContainer: {
    marginTop: '40px',
    display: 'flex',
    flexDirection: 'column',
  }
});
