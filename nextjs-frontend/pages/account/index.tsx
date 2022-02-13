import { useRouter } from 'next/router';
import { CSSProperties, Fragment, useEffect, useState } from 'react';
import { useAppSelector } from '../../src/frontend/redux-store/redux-store';
import { authCheckStatusSelector, isLoggedInSelector } from '../../src/frontend/redux-store/authentication/authentication-selectors';
import UserProfileCard from '../../src/frontend/components/cards/user-profile-card/user-profile-card';
import NoobPage from '../../src/frontend/components/page/noob-page';
import { Box, Divider, Grid, Tab } from '@mui/material';
import commonStyles from '../../src/frontend/styles/common.module.css'
import { TabContext, TabList, TabPanel } from '@mui/lab';
import CreatePostInput from '../../src/frontend/components/account/posts/create-post-input';
import PostCard from '../../src/frontend/components/account/posts/post-card';

const tabStyles: CSSProperties = {
  minWidth: '20%',
  border: 'solid 1px rgba(255,255,255,0.1)',
  textTransform: 'capitalize',
  fontWeight: 600
}

export default function Account() {
  const router = useRouter();
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  const checkStatus = useAppSelector(authCheckStatusSelector);

  const [activeTab, setActiveTab] = useState('posts')

  useEffect(() => {
    (async () => {
      if (checkStatus !== 'success') return;
      if (isLoggedIn) return;
      await router.push('/')
    })()
  });

  const handleChange = (e: unknown, newValue: string) => {
    setActiveTab(newValue);
  };

  return (
    <NoobPage
      title="Account"
      metaData={{
        description: "Noob Storm account page"
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
                <TabList onChange={handleChange}
                  TabIndicatorProps={{
                    style: {
                      display: 'none'
                    }
                  }}
                  sx={{
                    '& .Mui-selected': {
                      background: (theme) => theme.palette.primary.main,
                      color: 'white !important'
                    }
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
                <CreatePostInput />
                {new Array(5).fill("")
                  .map((_, i) => (
                    <Fragment key={i}>
                      <PostCard />
                    </Fragment>
                  ))}
              </TabPanel>
              <TabPanel sx={{ p: 0 }} value="about">
              </TabPanel>
              <TabPanel sx={{ p: 0 }} value="activity">
              </TabPanel>
            </TabContext>
          </Grid>
        </Grid>
      </div>
    </NoobPage>
  )
}
