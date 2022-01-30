import { Container, Icon, Link, Typography, useTheme } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useRouter } from 'next/router';
import {useStyles} from './not-found-styles';
import {useCommonStyles} from '../../styles/common-styles';

export default function NotFound() {
  const theme = useTheme();
  const router = useRouter();
  const styles = useStyles();
  const commonStyles = useCommonStyles();

  async function gotoHomePage() {
    await router.push('/');
  }

  return (
    <Container maxWidth="md" className={styles.messageContainer}>
      <div className={commonStyles.simpleMessageContent} style={{backgroundColor: theme.palette.background.paper}}>
        <Icon className={commonStyles.whiteText}>
          <ErrorOutlineIcon/>
        </Icon>
        <Typography className={commonStyles.whiteText}>Your are lost! Click</Typography>
        <Link onClick={gotoHomePage}
          component="button"
          variant="body2"
          className={commonStyles.whiteText}>here for home page.
        </Link>
      </div>
    </Container>
  );
}
