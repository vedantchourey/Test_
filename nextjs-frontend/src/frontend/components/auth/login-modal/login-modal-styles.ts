import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  content: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '16px',
    margin: '16px',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },

  headerTitle: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    display: 'flex',
    alignItems: 'center',
  },

  headerButtons: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  row: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'row',
  },

  inputRowItem: {
    flexGrow: 1,
  },

  actionButton: {
    background: 'linear-gradient(180deg, #EF507E 0%, #F09633 100%)',
    fontWeight: 700,
    fontSize: '1rem',
    lineHeight: '15rem',
    color: 'white',
    borderRadius: 0,
    padding: '16px 59px',
    flexGrow: 1,
  }
});
