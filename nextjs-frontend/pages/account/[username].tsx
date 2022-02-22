import { useState, useEffect } from 'react';
import NoobPage from "../../src/frontend/components/page/noob-page";
import { Box, Grid, Typography } from "@mui/material";
import commonStyles from "../../src/frontend/styles/common.module.css";
import PostCard from "../../src/frontend/components/account/posts/post-card";
import { getPostsByUserId } from "../../src/frontend/service-clients/post-service-client";
import Router from 'next/router';
import { IPostsResponse } from "../../src/frontend/service-clients/messages/i-posts-response";
import { IProfileResponse } from "../../src/frontend/service-clients/messages/i-profile";
import { getUserProfileByUsername } from '../../src/frontend/service-clients/profile-service-client';
import OtherProfileCard from '../../src/frontend/components/cards/others-profile-card/other-profile-card'
import { withProtected } from '../../src/frontend/components/auth-wrapper/auth-wrapper';


function UserAccount(): JSX.Element {
  const [userData, setUserData] = useState<IProfileResponse | null>(null);
  const [posts, setPosts] = useState<IPostsResponse[]>([]);
  const [isFetchingUserData, setIsFetchingUserData] = useState<boolean>(true);
  const [isFetchingPosts, setIsFetchingPosts] = useState<boolean>(true);

  useEffect(() => {
    try {
      (async (): Promise<void> => {
        const username = Router.query.username as string;
        const user = await getUserProfileByUsername(username);
        if (user) {
          setUserData(user);
        }
      })();
    } finally {
      setIsFetchingUserData(false)
    }
  }, []);

  useEffect(() => {
    if (!userData) return;
    try {
      (async (): Promise<void> => {
        const posts = await getPostsByUserId(userData?.id);
        setPosts(posts);
      })
    }
    finally {
      setIsFetchingPosts(false);
    }
  }, [userData])

  const _renderPosts = (): JSX.Element | React.ReactNode => {
    if (isFetchingPosts) {
      return new Array(5).fill("")
        .map((data, i) => <h1 key={i}>Skeleton</h1>);
    }
    const jsx = posts.map((postData, i) => {
      return <PostCard key={Date.now() + i} data={postData} />;
    });
    return jsx;
  };

  return (
    <NoobPage
      title="User Account"
      metaData={{
        description: "Noob Storm account page",
      }}>
      <div className={commonStyles.container}>
        <Grid container my={2} spacing={2}>
          {
            !isFetchingUserData && userData ? (
              <>
                <Grid item xs={12} md={4}>
                  <OtherProfileCard userData={userData} />
                </Grid>
                <Grid item xs={12} md={8}>
                  {_renderPosts()}
                </Grid>
              </>
            ) : (
              <Box mt={5} textAlign="center">
                <Typography variant='h3' textAlign={'center'}>
                  No User Found
                </Typography>
              </Box>
            )
          }
        </Grid>
      </div>
    </NoobPage>
  )
}

export default withProtected(UserAccount);