import React, { useState } from "react";
import { Grid } from "@mui/material";

import { useRouter } from "next/router";

import PostCard from "../account/posts/post-card";
import { getPostById } from "../../service-clients/post-service-client";

const PostCardComponent: React.FC = () => {
  const router = useRouter();

  // eslint-disable-next-line no-useless-escape

  const [data, setData] = useState<any>(undefined);

  const postID = router.query.postId;

  const fetchData = async (): Promise<void> => {
    const post = await getPostById(postID as string);

    setData(post);
  };

  React.useEffect(() => {
    if (postID) {
      fetchData();
    }
  }, [postID]);

  return (
    <Grid item md={12} minHeight={450} minWidth={400} mr={2}>
      {data && <PostCard data={data} />}
    </Grid>
  );
};

export default PostCardComponent;
