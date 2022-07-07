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
import { Grid, Skeleton } from "@mui/material";
import CreatePostInput from "../../src/frontend/components/account/posts/create-post-input";
import Chat from "../../src/frontend/components/chat";

const requiredRoles: NoobUserRole[] = ["noob-admin"];

export default function Create(): JSX.Element {
  const [isFetchingPosts, setIsFetchingPosts] = useState(true);
  const [posts, setPosts] = useState<IPostsResponse[]>([]);

  const user = useAppSelector(userProfileSelector);

  const fetchPosts = async (): Promise<void> => {
    try {
      setIsFetchingPosts(true);
      const followers = await fetchUserFollowingList(user?.id || "");
      const fetchPostsBatch = followers.map((i) =>
        getPostsByUserId(i.follower.id));
      const posts: IPostsResponse[] = [];
      const followerPosts = await Promise.all(fetchPostsBatch);
      followerPosts.map((p: any) => {
        p.map((fp: IPostsResponse) => posts.push(fp));
      });
      setPosts(posts);
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
    const jsx = posts.map((postData) => {
      return <PostCard key={postData.id} data={postData} row={true} />;
    });
    return jsx;
  };

  return (
    <NoobPage
      title="Social"
      metaData={{ description: "Noob storm home page" }}
      pinChat={true}
    >
      <AuthGuard
        requiredRoles={requiredRoles}
        renderOnCheckFailure={(): JSX.Element => <NotFound />}
      >
        <Grid container>
          <Grid xs={8}>
            <CreatePostInput setPosts={setPosts} />
            {_renderPosts()}
          </Grid>
          <Grid xs={4} p={2}>
            <Chat smallChat={true} social={true} />
          </Grid>
        </Grid>
      </AuthGuard>
    </NoobPage>
  );
}
