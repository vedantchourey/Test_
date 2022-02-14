import { Link, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import commonStyles from '../../styles/common.module.css';
import MessageContainer from '../ui-components/message/messageContainer';
import { Fragment } from 'react';

export default function NotFound(): JSX.Element {

  const router = useRouter();

  async function gotoHomePage(): Promise<void> {
    await router.push('/');
  }

  return (
    <div style={{ margin: 50 }}>
      <MessageContainer icon style={{ padding: 20 }}>
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
