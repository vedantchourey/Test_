import { useState, useEffect } from 'react';
import NoobPage from "../../src/frontend/components/page/noob-page";
import { Box, Divider, Grid, Tab, SxProps } from "@mui/material";
import commonStyles from "../../src/frontend/styles/common.module.css";
import PostCard from "../../src/frontend/components/account/posts/post-card";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { getPostsByUserId } from "../../src/frontend/service-clients/post-service-client";
import Router from 'next/router';
import { IPostsResponse } from "../../src/frontend/service-clients/messages/i-posts-response";
import { IProfileResponse } from "../../src/frontend/service-clients/messages/i-profile";
import { getUserProfileByUsername } from '../../src/frontend/service-clients/profile-service-client';
import OtherProfileCard from '../../src/frontend/components/cards/others-profile-card/other-profile-card'

type TabsProps = "posts" | "about" | "activity";

const tabStyles: SxProps = {
  textTransform: "capitalize",
  fontWeight: 100,
  marginRight: 2,
  borderRadius: 2,
  minHeight: 42,
  background: "rgba(255,255,255,0.1)",
  border: "none",
};


function UserAccount(): JSX.Element {
  const [activeTab, setActiveTab] = useState<TabsProps>("posts");
  const [userData, setUserData] = useState<IProfileResponse | null>(null);
  const [posts, setPosts] = useState<IPostsResponse[]>([]);
  const [setIsFetchingUserData] = useState<boolean>(true);
  const [isFetchingPosts, setIsFetchingPosts] = useState<boolean>(true);

  const handleChange = (e: unknown, newValue: TabsProps): void => {
    setActiveTab(newValue);
  };

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
          <Grid item xs={12} md={4}>
            {/* <UserProfileCard /> */}
            <OtherProfileCard />
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
                {_renderPosts()}
              </TabPanel>
              <TabPanel sx={{ p: 0 }} value="about"></TabPanel>
              <TabPanel sx={{ p: 0 }} value="activity"></TabPanel>
            </TabContext>
          </Grid>
        </Grid>
      </div>
    </NoobPage>
  )
}

export default UserAccount;