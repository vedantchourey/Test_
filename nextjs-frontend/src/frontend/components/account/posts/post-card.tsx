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
  Popover,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
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
import axios from "axios";
import { getAuthHeader } from "../../../utils/headers";
// import { isDeviceTypeSelector } from "../../../../../src/frontend/redux-store/layout/layout-selectors";
// import { deviceTypes } from "../../../../../src/frontend/redux-store/layout/device-types";
import { frontendSupabase } from "../../../services/supabase-frontend-service";
import frontendConfig from "../../../utils/config/front-end-config";
import { useRouter } from "next/router";

interface IProps {
  data: IPostsResponse;
  row?: boolean;
  isDesktop?: boolean;
}
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// eslint-disable-next-line no-useless-escape
const URL_REGEX =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)/;

const PostCard = (props: IProps): JSX.Element => {
  const user = useAppSelector(userProfileSelector);
  const [values, setValues] = useState<IPostsResponse>(props.data);
  const [openCommentsModal, setOpenCommentsModal] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isFetchingMeta, setIsFetchingMeta] = useState<boolean>(true);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [readMore, setReadMore] = useState(false);
  const [likeList, setLikeList] = useState([]);

  const imgUrl = props.data.postImgUrl;
  const avatarUrl = props.data.postOwner.avatarUrl;
  // const isMobile = useAppSelector((x) =>
  //   isDeviceTypeSelector(x, deviceTypes.desktop));

  const handleOpenComments = (): void => setOpenCommentsModal((pre) => !pre);
  const handleCloseComments = (): void => setOpenCommentsModal(false);
  const handleCloseMenu = (): void => setShowMenu(false);
  const handleToggleMenu = (): void => setShowMenu((pre) => !pre);

  const fetchUsers = async (post_id: string): Promise<void> => {
    const likeLists: any = await frontendSupabase
      .from("post_likes")
      .select(`*, profiles!inner(*)`)
      .eq("postId", post_id);
    setLikeList(likeLists.data);
  };

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
    likePost(postId).then(async()=>{
      if(values.postOwner.id!==user?.id){
      await frontendSupabase.from("notifications").insert({
          type: "LIKED",
          user_id: values.postOwner.id,
          sent_by: user?.id,
          message: `${user?.username} liked your post.`,
      })}
    });
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

  const [open, setOpen] = useState({
    report: false,
    copylink: false,
    error: false,
  });

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ): void => {
    if (reason === "clickaway") {
      return;
    }

    setOpen({
      report: false,
      copylink: false,
      error: false,
    });
  };

  const reportPost = async (): Promise<void> => {
    const headers = await getAuthHeader();
    axios
      .post(
        "/api/report-post/reportcreate",
        { post_id: values.id },
        { headers: headers }
      )
      .then(() => {
        setOpen({ ...open, report: true });
      })
      .catch((err) => {
        setOpen({ ...open, error: true });
        console.error(err);
      });
  };

  if (isDeleted) return <></>;

  const [anchorEl, setAnchorEl] = React.useState<any>(null);

  const handleClickPopover = (event: any): void => {
    fetchUsers(values.id);
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = (): void => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const postImageUrl = imgUrl
    ? frontendSupabase.storage
        .from(config.storage.publicBucket)
        .getPublicUrl(imgUrl)
    : undefined;

    const router = useRouter()

  return (
    <>
      <Grid
        item
        md={12}
        minHeight={props.row ? 450 : undefined}
        minWidth={props.isDesktop ? 280 : 0}
        mr={props.row ? 2 : 0}
        //onClick={():any=>{router.push(`social/${values.id}`)}}
      >
        <Card
          className={styles.postCard}
          sx={{ mb: 3 }}
          style={{ height: props.row ? "100%" : "auto" }}
          elevation={0}
        >
          <Box display={"flex"} flexDirection={"column"} height={"100%"}>
            <Box flex={1}>
              <Box
                sx={{
                  width: "100%",
                  display: "inline-flex",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", cursor: "pointer" }} onClick={(): any => router.push(`/account/${values.postOwner.username}`)}>
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
                  <IconButton
                    sx={{ padding: "10px" }}
                    onClick={handleToggleMenu}
                  >
                    <MoreHorizIcon />
                  </IconButton>
                  {showMenu && (
                    <List className={styles.postCardOptionsContainer}>
                      <ListItem
                        disablePadding
                        onClick={(): any => reportPost()}
                      >
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
                          onClick={(): any => {
                            navigator.clipboard.writeText(
                              `${frontendConfig.baseAppUrl}/social/${values.id}`
                            );
                            setOpen({ ...open, copylink: true });
                          }}
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
                sx={{
                  display: "-webkit-box",
                  overflow: "hidden",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: readMore ? 0 : 12,
                }}
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
                  ))}
              </Typography>
              {values.postContent.length > 250 ? (
                <Button
                  style={{
                    color: "#FFFFFF",
                    fontSize: 14,
                    marginBottom: !values.postImgUrl ? 50 : 0,
                    visibility:
                      values.postContent.length > 450 ? "visible" : "hidden",
                  }}
                  onClick={(): any => {
                    setReadMore(!readMore);
                  }}
                >
                  {readMore ? `Read less...` : `Read More...`}
                </Button>
              ) : null}

              <Box sx={{ position: "relative" }}>
                {imgUrl && (
                  <>
                    {/* Action Button Blur Container */}
                    {values.postType === "url" ? (
                      <div style={{ overflow: "hidden" }}>
                        <a
                          href={values.postUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <img
                            className={styles.postImg}
                            src={values.postImgUrl}
                            style={{
                              width: "100%",
                              height: props.row ? 250 : 300,
                              objectFit: "cover",
                            }}
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
                      <div>
                        <img
                          src={postImageUrl?.publicURL as string}
                          style={{
                            width: "100%",
                            height: props.row ? 250 : 300,
                            objectFit: "contain",
                          }}
                        />
                      </div>
                    )}

                    {/*  <CardMedia
                component="img"
                className={styles.postImage}
                image={imgUrl || ""}
                alt="user avatar"
              /> */}
                  </>
                )}

                {/* <Box mt={5} sx={{ textAlign: 'center' }}>
            <img width={85} src='/images/noobstorm-logo-small.png' />
          </Box> */}
              </Box>
            </Box>
            <Box>
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
                        <Typography
                          aria-describedby={id}
                          onClick={handleClickPopover}
                        >
                          {values?.totalLikes || 0}
                        </Typography>
                      </Box>
                      <Popover
                        id={id}
                        open={openPopover}
                        anchorEl={anchorEl}
                        onClose={handleClosePopover}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "left",
                        }}
                      >
                        <List
                          sx={{
                            width: "100%",
                            maxWidth: 360,
                            bgcolor: "background.paper",
                            position: "relative",
                            overflow: "auto",
                            maxHeight: 300,
                            "& ul": { padding: 0 },
                          }}
                          subheader={<li />}
                        >
                          <ul>
                            {likeList?.map((item: any) => (
                              <ListItem key={`user-${item?.likedBy}`}>
                                {item?.profiles?.username}
                              </ListItem>
                            ))}
                          </ul>
                        </List>
                        {/* <Typography sx={{ p: 2 }}>
                        The content of the Popover.
                      </Typography> */}
                      </Popover>
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
            </Box>
          </Box>
        </Card>
        <CommentsModal
          isModalOpen={openCommentsModal}
          handleClose={handleCloseComments}
          postId={values.id}
          postOwnerId={values.postOwner.id}
        />
      </Grid>
      <Snackbar
        open={open.report}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="warning" sx={{ width: "100%" }}>
          Post Reporeted successfully.
        </Alert>
      </Snackbar>
      <Snackbar
        open={open.copylink}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Copy Link successfully.
        </Alert>
      </Snackbar>
      <Snackbar open={open.error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Somthing went wrong. try again later!
        </Alert>
      </Snackbar>
    </>
  );
};

export default PostCard;
