import { useState, useEffect } from 'react';
import NoobPage from "../../src/frontend/components/page/noob-page";
import { Box, Grid, Typography } from "@mui/material";
import commonStyles from "../../src/frontend/styles/common.module.css";
import PostCard from "../../src/frontend/components/account/posts/post-card";
import { getPostsByUserId } from "../../src/frontend/service-clients/post-service-client";
import Router from 'next/router';
import { IPostsResponse } from "../../src/frontend/service-clients/messages/i-posts-response";
import { IOthersProfileResponse } from "../../src/frontend/service-clients/messages/i-profile";
import { getUserProfileByUsername } from '../../src/frontend/service-clients/profile-service-client';
import OtherProfileCard from '../../src/frontend/components/cards/others-profile-card/other-profile-card'
import { withProtected } from '../../src/frontend/components/auth-wrapper/auth-wrapper';
import TextBanner from '../../src/frontend/components/ui-components/typography/mainBannerHeading';
import { useAppSelector } from "../../src/frontend/redux-store/redux-store";
import {
  userProfileSelector
} from "../../src/frontend/redux-store/authentication/authentication-selectors";


function UserAccount(): JSX.Element {
  const loggedUser = useAppSelector(userProfileSelector);
  const [userData, setUserData] = useState<IOthersProfileResponse | null>(null);
  const [posts, setPosts] = useState<IPostsResponse[]>([]);
  const [isFetchingUserData, setIsFetchingUserData] = useState<boolean>(true);
  const [isFetchingPosts, setIsFetchingPosts] = useState<boolean>(true);
  const username = Router.query.username as string;

  useEffect(() => {
    (async (): Promise<void> => {
      try {
        const result = await getUserProfileByUsername(username);
        if (result) setUserData(result);
      }
      catch (err) {
        setIsFetchingUserData(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (!userData) return;
    (async (): Promise<void> => {
      const posts = await getPostsByUserId(userData?.id);
      setPosts(posts);
      setIsFetchingUserData(false);
      setIsFetchingPosts(false);
    })()
  }, [userData])

  const _renderPosts = (): JSX.Element | React.ReactNode => {
    if (isFetchingPosts) {
      return null;
    }
    else if (!isFetchingPosts && posts.length) {
      return posts.map((postData, i) => {
        return <PostCard key={Date.now() + i} data={postData} />;
      });
    }
    // eslint-disable-next-line no-else-return
    else {
      return (
        <Box>
          <Typography variant='h3'>
            No post available
          </Typography>
        </Box>
      )
      // eslint-disable-next-line @typescript-eslint/no-extra-semi
    }
  };

  if (username === loggedUser?.username) {
    Router.replace('/account')
    return <> </>;
  }

  return (
    <NoobPage
      title="User Account"
      metaData={{
        description: "Noob Storm account page",
      }}>
      {
        !isFetchingUserData && userData ? (
          userData.isPrivate && !userData.isFollowing ? (
            <>
              <TextBanner heading='User account is private' />
            </>
          ) : (
            <div className={commonStyles.container}>
              <Grid container my={2} spacing={2}>
                <Grid item xs={12} md={4}>
                  <OtherProfileCard userData={userData} key={Date.now().toString()} />
                </Grid>
                <Grid item xs={12} md={8} className={commonStyles.postsContainer}>
                  {_renderPosts()}
                </Grid>
              </Grid>
            </div>
          )
        ) : isFetchingUserData ? (
          <>
          </>
        ) : (
          <TextBanner heading='No user found' />
        )
      }
    </NoobPage >
  )
}

export async function getServerSideProps(): Promise<unknown> {
  return {
    props: {
      key: Date.now()
    }
  }
}

export default withProtected(UserAccount);