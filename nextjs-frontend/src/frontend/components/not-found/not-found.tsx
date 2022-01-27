import { Link, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import commonStyles from '../../styles/common.module.css';
import MessageContainer from '../ui-components/message/messageContainer';
import { Fragment } from 'react';

export default function NotFound() {

  const router = useRouter();

  async function gotoHomePage() {
    await router.push('/');
  }

  return (
    <div style={{ margin: 50 }}>
      <MessageContainer icon>
        <Fragment>
          <Typography className={commonStyles.whiteText}>
            Your are lost! Click
          </Typography>
          <Link onClick={gotoHomePage}
            component="button"
            variant="body2"
            className={commonStyles.whiteText}>here for home page.
          </Link>
        </Fragment>
      </MessageContainer>
    </div>
  );
}
