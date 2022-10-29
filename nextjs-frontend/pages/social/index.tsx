import AuthGuard from "../../src/frontend/components/auth/auth-guard";
import { NoobUserRole } from "../../src/backend/utils/api-middle-ware/noob-user-role";
import NotFound from "../../src/frontend/components/not-found/not-found";
import NoobPage from "../../src/frontend/components/page/noob-page";
import { useEffect, useState } from "react";
import { fetchUserFollowingList } from "../../src/frontend/service-clients/profile-service-client";
import { getPostsByUserId } from "../../src/frontend/service-clients/post-service-client";
import { IPostsResponse } from "../../src/frontend/service-clients/messages/i-posts-response";
import { userProfileSelector } from "../../src/frontend/redux-store/authentication/authentication-selectors";
import { useAppSelector } from "../../src/frontend/redux-store/redux-store";
import PostCard from "../../src/frontend/components/account/posts/post-card";
import { Avatar, Box, Button, CircularProgress, Grid, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Skeleton, Typography } from "@mui/material";
// import CreatePostInput from "../../src/frontend/components/account/posts/create-post-input";
import moment from "moment";
import { searchPeopleByText } from "../../src/frontend/service-clients/search-service-client";
import { ISearchPeopleByUsernameResponse } from "../../src/frontend/service-clients/messages/i-search";
import { useRouter } from "next/router";
import frontendConfig from "../../src/frontend/utils/config/front-end-config";

const requiredRoles: NoobUserRole[] = ["noob-admin"];

export default function SocialMedia(props: { hideChat: boolean }): JSX.Element {
  const [isFetchingPosts, setIsFetchingPosts] = useState(true);
  const [posts, setPosts] = useState<IPostsResponse[]>([]);
  const [isFetching, setIsFetching] = useState(false)
  const [userList, setUserList] = useState<ISearchPeopleByUsernameResponse[]>([]);

  const user = useAppSelector(userProfileSelector);

  const fetchPosts = async (): Promise<void> => {
    try {
      setIsFetchingPosts(true);
      const followers = await fetchUserFollowingList(user?.id || "");
      const fetchPostsBatch = followers.map(async (i) =>
        await getPostsByUserId(i.follower.id));
      const posts: IPostsResponse[] = [];
      const followerPosts = await Promise.all(fetchPostsBatch);
      followerPosts.map((p: any) => {
        p.map((fp: IPostsResponse) => posts.push(fp));
      });
      setPosts(posts);
    } catch(error) {
      console.warn("Error: Error while fetching posts - ", error);
    } finally {
      setIsFetchingPosts(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [user?.id]);

  const _renderPosts = (): JSX.Element | React.ReactNode => {
    if (isFetchingPosts) {
      return new Array(5).fill("")
.map((data, i) => <Skeleton key={i} />);
    }
    const jsx = posts.sort((a: any, b: any) => {
      const aTime: any = moment(a.createdAt).format("x");
      const bTime: any = moment(b.createdAt).format("x");
      return bTime - aTime;
    }).map((postData) => {
      return <PostCard key={postData.id} data={postData} />;
    });
    return jsx;
  };

  async function searchByUserName(username: string): Promise<void> {
    try {
      setIsFetching(true);
      setUserList([]);
      if (!username) {
        setIsFetching(false);
        return;
      }
      const response = await searchPeopleByText({ search: username, range: 10 });
      if (response.length) setUserList(response);
      setIsFetching(false)
    } catch(error) {
      console.warn("Error: Error while search user.", error);
      setIsFetching(false)
    }
  }

  const router = useRouter();

  useEffect(() => {
    searchByUserName("a");
  }, [])

  const renderResults = (): JSX.Element => {
    if (isFetching) {
      return (
        <List sx={{ width: '100%', maxWidth: 360 }}>
          <CircularProgress />
        </List>
      )
    }
    else if (!isFetching && userList.length) {
      return (
        <List sx={{ width: '100%', maxWidth: 360 }}>
          {userList.filter((data) => data.id !== user?.id).map((data, i) => (
            <ListItem key={Date.now() + i}>
              <ListItemButton onClick={(): unknown => router.replace(`/account/${data.username}`)} sx={{ padding: '2px 18px', my: 1, display: "flex" }}>
                <ListItemAvatar>
                  <Avatar sx={{ width: 35, height: 35 }} alt="profile image" src={`${frontendConfig.storage.publicBucketUrl}/${frontendConfig.storage.publicBucket}/${data.avatarUrl}`}>
                    {data.username.split('')[0].toUpperCase()}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText >
                  <Typography>
                    @{data.username}
                  </Typography>
                </ListItemText>
                <Box> 
                  <Button>
                    Open
                  </Button>
                </Box>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )
    }

    // eslint-disable-next-line no-else-return
    else {
      return (
        <></>
        /*  <List className={styles.searchListLoder} sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
           <h1>No data found</h1>
         </List> */
      )
    }

  }

  return (
    <NoobPage
      title="Social"
      metaData={{ description: "Noob storm home page" }}
      hideChat={props.hideChat}
      hideHeaders={props.hideChat}
    >
      <AuthGuard
        requiredRoles={requiredRoles}
        renderOnCheckFailure={(): JSX.Element => <NotFound />}
      >
        <Grid container>
          <Grid item xs={props.hideChat ? 12 : 8}>
            {/* <CreatePostInput setPosts={setPosts} /> */}
            {_renderPosts()}
          </Grid>
          {!props.hideChat && (
            <Grid item xs={4} p={2}>
              <Box>
                <Box textAlign={"center"}>
                  <h4>Suggested Users</h4>
                </Box>
                {renderResults()}
              </Box>
            </Grid>
          )}
        </Grid>
      </AuthGuard>
    </NoobPage>
  );
}
