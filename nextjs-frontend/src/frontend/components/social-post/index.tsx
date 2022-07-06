import React, { useState } from "react";
import {
  IconButton,
  Card,
  Typography,
  Box,
  List,
  ListItem,
  Button,
  Grid,
} from "@mui/material";
import styles from "./post.module.css";
import Image from "../../components/utils/supabase-image";
import config from "../../utils/config/front-end-config";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  deletePost as removePost,
} from "../../service-clients/post-service-client";
import { useRouter } from "next/router";
import axios from "axios";
import { getAuthHeader } from "../../utils/headers";

const PostCard: React.FC = () => {
  const router = useRouter();

  // eslint-disable-next-line no-useless-escape
  const URL_REGEX =/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

  const [data, setData] = React.useState({
    id: "",
    postContent: "",
    postImgUrl: "",
    postedBy: "",
    createdAt: "",
    updatedAt: "",
    postType: "",
    postUrl: null,
    urlPostTitle: null,
    username: "",
    avatarUrl: null,
    userId: "",
    totalComments: 0,
    totalLikes: 0,
    isLiked: false,
  });
  const [showMenu, setShowMenu] = useState(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  const handleToggleMenu = (): void => setShowMenu((pre) => !pre);
  const handleCloseMenu = (): void => setShowMenu(false);

  const postID = router.query.postId;

  const fetchData = async (): Promise<void> => {
    const headers = await getAuthHeader();
    axios
      .get(`/api/posts/postdetail?id=${postID}`, { headers: headers })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  React.useEffect(() => {
    if (postID) {
      fetchData();
    }
  }, [postID]);

  const reportPost = async (): Promise<void> => {
    const headers = await getAuthHeader();
    axios
      .post(
        "/api/report-post/reportcreate",
        { post_id: postID },
        { headers: headers }
      )
      .catch((err) => {
        console.error(err);
      });
  };

  const deletePost = (): void => {
    removePost(`${postID}`);
    setIsDeleted(true);
  };

  if (isDeleted) return <></>;

  return (
    <Grid item md={12} minHeight={450} minWidth={400} mr={2}>
      <Card className={styles.postCard} sx={{ mb: 3 }} elevation={0}>
        <Box
          sx={{
            width: "100%",
            display: "inline-flex",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Image
              bucket={config.storage.publicBucket}
              filePath={data?.avatarUrl || ""}
              isPublicBucket={true}
              width={50}
              height={50}
              className={styles.postAvatar}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "baseline",
                paddingLeft: "10px",
              }}
            >
              <Typography variant={"h3"} fontSize={15} fontWeight={400}>
                {data?.username}
              </Typography>
              <Typography variant="subtitle2" color="#575265">
                {new Date(data?.createdAt).toDateString()}
              </Typography>
            </Box>
          </Box>

          <div>
            <IconButton sx={{ padding: "10px" }} onClick={handleToggleMenu}>
              <MoreHorizIcon />
            </IconButton>
            {showMenu && (
              <List className={styles.postCardOptionsContainer}>
                <ListItem disablePadding>
                  <Button
                    fullWidth
                    className={styles.postCardOptionsBtn}
                    sx={{
                      color: "red",
                      borderTopLeftRadius: "5px !important",
                      borderTopRightRadius: "5px !important",
                    }}
                    onClick={(): any => reportPost()}
                  >
                    <img src="/icons/error.svg" alt="icon" />
                    Report Post
                  </Button>
                </ListItem>
                <ListItem disablePadding>
                  <Button
                    fullWidth
                    className={styles.postCardOptionsBtn}
                    sx={{ color: "red", borderRadius: "0px" }}
                    onClick={(): any => navigator.clipboard.writeText(`http://localhost:3000/social/${postID}`)}
                  >
                    <img src="/icons/copy.svg" alt="icon" />
                    Copy Link
                  </Button>
                </ListItem>
                {data.id === data?.userId && (
                  <ListItem disablePadding>
                    <Button
                      fullWidth
                      onClick={deletePost}
                      className={styles.postCardOptionsBtn}
                      sx={{ color: "black" }}
                    >
                      Delete Post
                    </Button>
                  </ListItem>
                )}
                <ListItem disablePadding>
                  <Button
                    fullWidth
                    onClick={handleCloseMenu}
                    className={styles.postCardOptionsBtn}
                    sx={{
                      color: "black",
                      borderBottomLeftRadius: "5px !important",
                      borderBottomRightRadius: "5px !important",
                    }}
                  >
                    Cancel
                  </Button>
                </ListItem>
              </List>
            )}
          </div>
        </Box>
        <Typography
          sx={{ marginBottom: !data.postImgUrl ? 10 : 0 }}
          my={2}
          align="left"
          fontSize={14}
          fontWeight={300}
          paragraph
        >
          {data.postContent.split(" ").map((part) =>
            URL_REGEX.test(part) ? (
              <a href={part} target="_blank" rel="noreferrer">
                {part}{" "}
              </a>
            ) : (
              part + " "
            ))}
        </Typography>
      </Card>
    </Grid>
  );
};

export default PostCard;
