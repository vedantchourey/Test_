import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../src/frontend/redux-store/redux-store';
import { authCheckStatusSelector, isLoggedInSelector } from '../../src/frontend/redux-store/authentication/authentication-selectors';
import UserProfileCard from '../../src/frontend/components/cards/user-profile-card/user-profile-card';
import NoobPage from '../../src/frontend/components/page/noob-page';
import { Box, Container, Divider, Grid, Tab } from '@mui/material';
import commonStyles from '../../src/frontend/styles/common.module.css'
import { TabContext, TabList, TabPanel } from '@mui/lab';
import CreatePostInput from '../../src/frontend/components/account/posts/create-post-input';
import PostCard from '../../src/frontend/components/account/posts/post-card';

export default function Account() {
    const router = useRouter();
    const isLoggedIn = useAppSelector(isLoggedInSelector);
    const checkStatus = useAppSelector(authCheckStatusSelector);

    const [activeTab, setActiveTab] = useState('posts')

    // useEffect(() => {
    //     (async () => {
    //         if (checkStatus !== 'success') return;
    //         if (isLoggedIn) return;
    //         await router.push('/')
    //     })()
    // });

    const handleChange = (_, newValue: string) => {
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
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <UserProfileCard />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Container maxWidth={"lg"}>

                            <TabContext value={activeTab}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <TabList onChange={handleChange}>
                                        <Tab label="Posts" value="posts" />
                                        <Tab label="About" value="about" />
                                        <Tab label="Match activity" value="activity" />
                                    </TabList>
                                </Box>

                                <Divider light />

                                <TabPanel value="posts">
                                    Posts
                                    <CreatePostInput />

                                    {new Array(5).fill("").map((_, i) => (
                                        <PostCard />
                                    ))}

                                </TabPanel>
                                <TabPanel value="about">
                                    About
                                </TabPanel>
                                <TabPanel value="activity">
                                    Match activity
                                </TabPanel>
                            </TabContext>

                        </Container>
                    </Grid>
                </Grid>
            </div>
        </NoobPage>
    )
}
