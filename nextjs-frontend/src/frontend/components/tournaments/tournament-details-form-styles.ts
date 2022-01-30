import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    rowGap: '24px',
    justifyContent: 'center',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    columnGap: '16px',
    margin: '0 110px 0 110px',
  },
  column: {
    display: 'flex',
    flexGrow: 1,
    flexBasis: 0,
  },
  inputItem: {
    flexGrow: 1,
  }
});

