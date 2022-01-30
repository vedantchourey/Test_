import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  container: {
    '@media screen and (min-width: 768px)' : {
      marginRight: '70px',
      marginLeft: '70px'
    }
  }
});
