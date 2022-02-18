import React from "react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../src/frontend/redux-store/redux-store";
import {
  authCheckStatusSelector,
  isLoggedInSelector,
} from "../../src/frontend/redux-store/authentication/authentication-selectors";
import UserProfileCard from "../../src/frontend/components/cards/user-profile-card/user-profile-card";
import NoobPage from "../../src/frontend/components/page/noob-page";
import { Box, Divider, Grid, Tab, SxProps } from "@mui/material";
import commonStyles from "../../src/frontend/styles/common.module.css";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import CreatePostInput from "../../src/frontend/components/account/posts/create-post-input";
import PostCard from "../../src/frontend/components/account/posts/post-card";
import { getUserPosts } from "../../src/frontend/service-clients/post-service-client";
import { IPostsResponse } from "../../src/frontend/service-clients/messages/i-posts-response";
import { withProtected } from '../../src/frontend/components/auth-wrapper/auth-wrapper';

type TabsProps = "posts" | "about" | "activity";

const tabStyles: SxProps = {
  textTransform: "capitalize",
  fontWeight: 400,
  marginRight: 2,
  borderRadius: 2,
  minHeight: 42,
  background: "rgba(255,255,255,0.1)",
  border: "none",
};

function Account(): JSX.Element {
  const router = useRouter();
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  const checkStatus = useAppSelector(authCheckStatusSelector);

  const [activeTab, setActiveTab] = useState<TabsProps>("posts");
  const [isFetchingPosts, setIsFetchingPosts] = useState<boolean>(true);
  const [posts, setPosts] = useState<IPostsResponse[]>([]);

  useEffect(() => {
    (async (): Promise<unknown> => {
      if (checkStatus !== "success") return;
      if (isLoggedIn) return;
      await router.push("/");
    })();
  });

  useEffect(() => {
    try {
      (async (): Promise<void> => {
        const posts = await getUserPosts();
        setPosts(posts);
      })();
    } finally {
      setIsFetchingPosts(false);
    }
  }, []);

  const handleChange = (e: unknown, newValue: TabsProps): void => {
    setActiveTab(newValue);
  };

  const _renderPosts = (): JSX.Element | React.ReactNode => {
    if (isFetchingPosts) {
      return new Array(5).fill("")
        .map((data, i) => <h1 key={i}>sf</h1>);
    }
    const jsx = posts.map((postData, i) => {
      return <PostCard key={Date.now() + i} data={postData} />;
    });
    return jsx;
  };

  return (
    <NoobPage
      title="Account"
      metaData={{
        description: "Noob Storm account page",
      }}
    >
      <div className={commonStyles.container}>
        <Grid container my={2} spacing={2}>
          <Grid item xs={12} md={4}>
            <UserProfileCard />
          </Grid>
          <Grid item xs={12} md={8}>
            <TabContext value={activeTab}>
              <Box>
                <TabList
                  onChange={handleChange}
                  TabIndicatorProps={{
                    style: {
                      display: "none",
                    },
                  }}
                  sx={{
                    "& .Mui-selected": {
                      background: (theme) => theme.palette.primary.main,
                      color: "white !important",
                    },
                  }}
                >
                  <Tab label="Posts" value="posts" sx={tabStyles} />
                  <Tab label="About" value="about" sx={tabStyles} />
                  <Tab label="Match activity" value="activity" sx={tabStyles} />
                </TabList>
              </Box>

              <Box my={4}>
                <Divider light />
              </Box>

              <TabPanel sx={{ p: 0 }} value="posts">
                <CreatePostInput setPosts={setPosts} />
                {_renderPosts()}
              </TabPanel>
              <TabPanel sx={{ p: 0 }} value="about"></TabPanel>
              <TabPanel sx={{ p: 0 }} value="activity"></TabPanel>
            </TabContext>
          </Grid>
        </Grid>
      </div>
    </NoobPage>
  );
}

export default withProtected(Account);