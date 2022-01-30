import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  container: {
    marginTop: '40px',
    display: 'flex',
    flexDirection: 'column',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    backgroundColor: '#160C30',
    rowGap: '24px',
    paddingBottom: '40px',
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
    marginTop: '41px',
  },
  titleRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    margin: '0 110px 0 110px',
  },
  column: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    flexBasis: 0,
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
  }
});

