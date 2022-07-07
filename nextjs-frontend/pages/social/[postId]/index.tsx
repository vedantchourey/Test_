import React from "react";
import { NoobUserRole } from "../../../src/backend/utils/api-middle-ware/noob-user-role";
import NoobPage from "../../../src/frontend/components/page/noob-page";
import { Grid } from "@mui/material";
import AuthGuard from "../../../src/frontend/components/auth/auth-guard";
import PostCard from "../../../src/frontend/components/social-post";
import NotFound from "../../../src/frontend/components/not-found/not-found";

const requiredRoles: NoobUserRole[] = [];
const PostCards: React.FC<void> = () => {
  return (
    <NoobPage
      title="Social"
      metaData={{ description: "Noob storm home page" }}
      hideChat={true}
    >

    <AuthGuard
      requiredRoles={requiredRoles}
      redirectToOnFailure="/"
      renderOnCheckFailure={(): JSX.Element => <NotFound />}
      >
      <Grid container>
        <PostCard key={"postcard"}></PostCard>
      </Grid>
    </AuthGuard>
      </NoobPage>
  );
};

export default PostCards;
