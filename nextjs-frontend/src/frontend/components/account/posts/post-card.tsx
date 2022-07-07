/* eslint-disable indent */
import React, { useEffect, useState } from "react";
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
import { IPostsResponse } from "../../../service-clients/messages/i-posts-response";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CommentsModal from "./comments-modal";
import {
  checkIsPostLiked,
  likePost,
  unlikePost,
  getPostLikesCount,
  getPostCommentsCount,
  deletePost as removePost,
} from "../../../service-clients/post-service-client";
import { useAppSelector } from "../../../redux-store/redux-store";
import { userProfileSelector } from "../../../redux-store/authentication/authentication-selectors";
import Image from "../../../components/utils/supabase-image";
import config from "../../../utils/config/front-end-config";

interface IProps {
  data: IPostsResponse;
  row?: boolean;
  isDesktop?: boolean;
}

// eslint-disable-next-line no-useless-escape
const URL_REGEX =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

const PostCard = (props: IProps): JSX.Element => {
  const user = useAppSelector(userProfileSelector);
  const [values, setValues] = useState<IPostsResponse>(props.data);
  const [openCommentsModal, setOpenCommentsModal] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isFetchingMeta, setIsFetchingMeta] = useState<boolean>(true);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  const imgUrl = props.data.postImgUrl;
  const avatarUrl = props.data.postOwner.avatarUrl;

  const handleOpenComments = (): void => setOpenCommentsModal((pre) => !pre);
  const handleCloseComments = (): void => setOpenCommentsModal(false);
  const handleCloseMenu = (): void => setShowMenu(false);
  const handleToggleMenu = (): void => setShowMenu((pre) => !pre);

  useEffect(() => {
    fetchPostData();
  }, []);

  const fetchPostData = async (): Promise<void> => {
    const payload = {
      userId: user?.id,
      postId: values.id,
    };
    const isPostLiked = checkIsPostLiked(payload);
    const postLikesCount = getPostLikesCount(payload.postId);
    const postCommentsCount = getPostCommentsCount(payload.postId);
    const [p1, p2, p3] = await Promise.all([
      isPostLiked,
      postLikesCount,
      postCommentsCount,
    ]);
    if (!p1.error) {
      setValues((prevVals: IPostsResponse) => {
        return { ...prevVals, ...{ isLiked: p1.isLiked || false } };
      });
    }

    if (p2.totalLikes?.toString()) {
      setValues((prevVals: IPostsResponse) => {
        return { ...prevVals, ...{ totalLikes: p2.totalLikes || 0 } };
      });
    }
    if (p3.totalComments?.toString()) {
      setValues((prevVals: IPostsResponse) => {
        return { ...prevVals, ...{ totalComments: p3.totalComments || 0 } };
      });
    }
    setIsFetchingMeta(false);
  };

  const addLike = async (): Promise<void> => {
    const postId = values.id;
    setValues((pre) => {
      return {
        ...pre,
        isLiked: true,
        totalLikes: values.totalLikes + 1,
      };
    });
    likePost(postId);
  };

  const removeLike = async (): Promise<void> => {
    const postId = values.id;
    setValues((pre) => {
      return {
        ...pre,
        isLiked: false,
        totalLikes: values.totalLikes - 1,
      };
    });
    unlikePost(postId);
  };

  const toggleLike = (): void => {
    if (!values.isLiked) {
      addLike();
    } else {
      removeLike();
    }
  };

  const deletePost = (): void => {
    removePost(values.id);
    setIsDeleted(true);
  };

  if (isDeleted) return <></>;

  return (
    <Grid
      item
      md={12}
      minHeight={props.row ? 450 : undefined}
      minWidth={props.isDesktop ? 400 : 0}
      mr={props.row ? 2 : 0}
    >
      <Card
        className={styles.postCard}
        sx={{ mb: 3 }}
        // style={{ height: props.row ? "100%" : "auto" }}
        elevation={0}
      >
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
              filePath={avatarUrl || ""}
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
                {values.postOwner.username}
              </Typography>
              <Typography variant="subtitle2" color="#575265">
                {new Date(values.createdAt).toDateString()}
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
                  >
                    <img src="/icons/copy.svg" alt="icon" />
                    Copy Link
                  </Button>
                </ListItem>
                {values.postOwner.id === user?.id && (
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
          sx={{ marginBottom: !values.postImgUrl ? 10 : 0 }}
          my={2}
          align="left"
          fontSize={14}
          fontWeight={300}
          paragraph
        >
          {values.postContent.split(" ").map((part) =>
            URL_REGEX.test(part) ? (
              <a href={part} target="_blank" rel="noreferrer">
                {part}{" "}
              </a>
            ) : (
              part + " "
            )
          )}
        </Typography>

        <Box sx={{ position: "relative" }}>
          {imgUrl && (
            <>
              {/* Action Button Blur Container */}
              {values.postType === "url" ? (
                <div style={{ overflow: "hidden" }}>
                  <a href={values.postUrl} target="_blank" rel="noreferrer">
                    <img
                      className={styles.postImg}
                      src={values.postImgUrl}
                      style={{ width: "100%", height: 300, objectFit: "cover" }}
                      key={values.id}
                    />
                    <div
                      style={{
                        position: "absolute",
                        width: "100%",
                        background: "rgba(0,0,0,0.4)",
                        bottom: 80,
                        padding: "10px 0",
                      }}
                    >
                      {values.urlPostTitle && (
                        <Typography style={{ color: "white" }}>
                          {values.urlPostTitle}
                        </Typography>
                      )}
                    </div>
                  </a>
                </div>
              ) : (
                <Image
                  className={styles.postImg}
                  bucket={config.storage.publicBucket}
                  filePath={imgUrl || ""}
                  isPublicBucket={true}
                  height={600}
                  width={1400}
                  layout="responsive"
                  objectFit="contain"
                  key={values.id}
                />
              )}

              {/*  <CardMedia
                component="img"
                className={styles.postImage}
                image={imgUrl || ""}
                alt="user avatar"
                
              /> */}
            </>
          )}

          {!isFetchingMeta && (
            <Box className={styles.actionButtons}>
              <Box className={styles.blurContainer}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <IconButton
                      onClick={toggleLike}
                      className={styles.postBtn}
                      sx={{ padding: "12px" }}
                    >
                      <img
                        src={
                          values.isLiked
                            ? "/icons/heart-filled.svg"
                            : "/icons/heart.svg"
                        }
                        alt="icon"
                        key={values.totalLikes}
                      />
                    </IconButton>
                    <Typography>{values?.totalLikes || 0}</Typography>
                  </Box>
                  <Box mx={1}>
                    <IconButton
                      className={styles.postBtn}
                      onClick={handleOpenComments}
                      sx={{ padding: "15px" }}
                    >
                      <img src="/icons/message.svg" alt="icon" />
                    </IconButton>
                    <Typography>{values.totalComments || 0}</Typography>
                  </Box>
                  {/*  <Box>
                      <IconButton
                        className={styles.postBtn}
                      >
                        <img src='icons/share.svg' alt='icon' />
                      </IconButton>
                      5
                    </Box> */}
                </Box>
              </Box>
            </Box>
          )}
          {/* <Box mt={5} sx={{ textAlign: 'center' }}>
            <img width={85} src='/images/noobstorm-logo-small.png' />
          </Box> */}
        </Box>
      </Card>
      <CommentsModal
        isModalOpen={openCommentsModal}
        handleClose={handleCloseComments}
        postId={values.id}
      />
    </Grid>
  );
};

export default PostCard;
