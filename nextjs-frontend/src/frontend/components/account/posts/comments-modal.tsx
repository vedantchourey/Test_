import React, { useEffect, useState } from "react";
import {
  AppBar,
  Avatar,
  Button,
  IconButton,
  Modal,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Skeleton } from "@mui/material";
import styles from "./post.module.css";
import { IPostCommentResponse } from "../../../service-clients/messages/i-posts-response";
import { useAppSelector } from "../../../redux-store/redux-store";
import {
  avatarImageBlobUrlSelector,
  userProfileSelector,
} from "../../../redux-store/authentication/authentication-selectors";
import {
  createComment,
  getPostComments,
  getCommentLikesCount,
  checkIsCommentLiked,
  deleteComment,
  updateComment,
} from "../../../service-clients/post-service-client";
import Image from "../../../components/utils/supabase-image";
import config from "../../../utils/config/front-end-config";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { getAuthHeader } from "../../../utils/headers";
import { frontendSupabase } from "../../../services/supabase-frontend-service";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  backgroundColor: "#08001C",
  padding: "1px 0",
};

interface IProps {
  isModalOpen: boolean;
  handleClose: () => void;
  postId: string;
}

const CommentsModal = (props: IProps): JSX.Element => {
  const userAvatar = useAppSelector(avatarImageBlobUrlSelector);
  const user = useAppSelector(userProfileSelector);
  const { isModalOpen, handleClose } = props;
  const [comment, setComment] = useState<string>("");
  const [isFetchingComments, setIsFetchingComments] = useState<boolean>(true);
  const [comments, setComments] = useState<IPostCommentResponse[]>([]);

  // const fetchUsers = async (post_id: string): Promise<void> => {
    
  //   const likeList: any = await frontendSupabase
  //     .from("post_likes")
  //     .select("*")
  //     .eq("postId", post_id)

  //     console.log(likeList, "likelist");
      
  //     // setData(Data as any);
  // };

  // useEffect(() => {
  //   fetchUsers("e1e14929-e6b3-4a1b-8c56-fc11957e3aa8");
  // }, []);

  useEffect(() => {
    getComments();
  }, [props.isModalOpen]);

  const getComments = async (): Promise<void> => {
    const data = await getPostComments(props.postId);
    setComments(data);
    setIsFetchingComments(false);
  };

  async function onClickCreateComment(): Promise<void> {
    if (!comment) {
      alert("Please enter you comment");
      return;
    }
    const result = await createComment({
      postId: props.postId,
      comment: comment,
    });
    if (!result.isError)
      setComments((prevState: IPostCommentResponse[]) => [
        result,
        ...prevState,
      ]);
    setComment("");
  }

  const likeComment = async (id: any): Promise<void> => {
    try {
      const endpoint = "/api/comment-like/likenews";
      const headers = await getAuthHeader();
      axios
        .post(
          endpoint,
          {
            commentId: id,
          },
          {
            headers: headers,
          }
        )
        .then((res) => {
          if (res.status === 200) {
            getComments();
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    } catch (err) {
      console.error(err);
    }
  };

  const unLikeComment = async (id: any): Promise<void> => {
    try {
      const endpoint = "/api/comment-like/unlikenews";
      const headers = await getAuthHeader();
      axios
        .get(endpoint, {
          params: { commentId: id },
          headers: headers,
        })
        .then((res: any): void => {
          if (res.status === 200) {
            getComments();
          }
        })
        .catch(function (error: any): void {
          console.error(error);
        });
    } catch (err) {
      console.error(err);
    }
  };

  const _renderComments = (): JSX.Element[] | JSX.Element | void[] => {
    if (isFetchingComments) {
      return new Array(20).fill("").map((_, i) => {
        return (
          <Box key={i} sx={{ px: 2 }} mb={3}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Skeleton variant="circular" width={40} height={40} />
              <div style={{ width: "90%" }}>
                <Skeleton key={i} width={"40%"} height={14} />
                <Skeleton key={i} height={14} />
                <Skeleton key={i} height={14} />
              </div>
            </div>
          </Box>
        );
      });
    } else if (!isFetchingComments && comments.length) {
      return comments.map( (data, i) => {
        const Comment = (): JSX.Element => {
          const payload = {
            userId: user?.id,
            commentId: data.id,
          };
          const [isDeleted, setIsDeleted] = useState<boolean>(false);
          const [commentValues, setCommentValues] = useState(data);
          const [isEditing, setIsEditing] = useState<boolean>(false);
          const [commentLiked, setcommentLiked] = useState<boolean>(false);
          const [commentLikes, setcommentLikes] = useState<boolean>(false);

          const isCommentLiked = checkIsCommentLiked(payload);
         const commentLikesCount = getCommentLikesCount(data.id)

          Promise.resolve(commentLikesCount).then((data: any) => {
            setcommentLikes(data.totalLikes)
          })
          Promise.resolve(isCommentLiked).then((data: any) => {
            setcommentLiked(data.isLiked)
          })          

          const removeComment = (): void => {
            setIsDeleted(true);
            deleteComment(props.postId, data.id);
          };

          const editComment = (): void => {
            updateComment(props.postId, data.id, commentValues.comment);
            setIsEditing(false);
          };

          if (isDeleted) return <></>;
          return (
            <Box key={Date.now() + i} className={styles.commentCard}>
              <Box sx={{ display: "inline-flex", width: "100%" }}>
                <Box mr={2}>
                  <Image
                    bucket={config.storage.publicBucket}
                    filePath={data.commentOwner.avatarUrl || ""}
                    isPublicBucket={true}
                    width={50}
                    height={50}
                    className={styles.commentAvatar}
                  />
                </Box>
                <Box sx={{ width: "100%" }}>
                  <Box
                    sx={{
                      display: "inline-flex",
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box sx={{ display: "inline-flex" }}>
                      <Typography variant={"body1"} color="white">
                        {`${data.commentOwner.username}`}
                      </Typography>
                      <Typography variant="subtitle2" color="#575265" ml={1}>
                        {new Date(data.createdAt).toDateString()}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        color={commentLiked ? "#002884" : "#575265"}
                        ml={1}
                        onClick={(): any => {
                          if (commentLiked) {
                            unLikeComment(data.id);
                          } else {
                            likeComment(data.id);
                          }
                        }}
                      >
                        Like
                      </Typography>
                      <Typography variant="subtitle2" color={commentLiked ? "#002884" : "#575265"} ml={1}>
                        {commentLikes}
                      </Typography>
                    </Box>

                    {user?.id === data.commentOwner.id && (
                      <Box>
                        <IconButton onClick={removeComment} size="small">
                          <DeleteIcon fontSize={"small"} />
                        </IconButton>
                        {isEditing ? (
                          <IconButton size="small" onClick={editComment}>
                            <SaveIcon fontSize={"small"} />
                          </IconButton>
                        ) : (
                          <IconButton
                            size="small"
                            onClick={(): void => setIsEditing(true)}
                          >
                            <EditIcon fontSize={"small"} />
                          </IconButton>
                        )}
                      </Box>
                    )}
                  </Box>
                  <Box mt={1}>
                    {!isEditing ? (
                      <Typography
                        variant="body2"
                        color="white"
                        sx={{ textTransform: "capitalize" }}
                      >
                        {commentValues.comment}
                      </Typography>
                    ) : (
                      <Box className={styles.commentInput}>
                        <TextField
                          placeholder={`Your comment`}
                          fullWidth
                          autoFocus
                          variant="standard"
                          value={commentValues.comment}
                          sx={{
                            "& .MuiInput-root": {
                              fontWeight: 300,
                            },
                          }}
                          InputProps={{
                            disableUnderline: true,
                          }}
                          onChange={(event): void => {
                            setCommentValues({
                              ...commentValues,
                              comment: event.target.value,
                            });
                          }}
                        />
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          );
        };
        return <Comment key={data.id} />;
      });
    }
    // eslint-disable-next-line no-else-return
    else {
      return (
        <Box mt={5}>
          <Typography variant={"subtitle1"} color={"white"} textAlign="center">
            No comments
          </Typography>
        </Box>
      );
    }
  };

  return (
    <Modal open={isModalOpen} onClose={handleClose}>
      <Box sx={style} className={styles.mainModalContainer}>
        <Box className={styles.commentsContainer}>
          <AppBar className={styles.appBar}>
            <Toolbar className={styles.customToolBar}>
              <Typography variant="body1" component="div">
                Comments
              </Typography>
              <IconButton onClick={handleClose}>
                <img src="/icons/close.svg" alt="icon" />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Box mt={12} className={styles.renderPosts}>
            {_renderComments()}
          </Box>
          <Box className={styles.commentInputCotainer}>
            <Box className={styles.commentInput}>
              <Box sx={{ display: "inline-flex", alignItems: "center" }}>
                <Avatar
                  sx={{ mr: 2, width: 35, height: 35 }}
                  alt="avatar"
                  src={userAvatar}
                />
                <TextField
                  placeholder={`Your comment`}
                  fullWidth
                  autoFocus
                  variant="standard"
                  value={comment}
                  sx={{
                    "& .MuiInput-root": {
                      fontWeight: 300,
                    },
                  }}
                  InputProps={{
                    disableUnderline: true,
                  }}
                  onChange={(event): void => {
                    setComment(event.target.value);
                  }}
                />
              </Box>
              <Box>
                <Button
                  size="small"
                  variant={"contained"}
                  style={{
                    borderRadius: 99999,
                    textTransform: "capitalize",
                  }}
                  onClick={onClickCreateComment}
                >
                  Send
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default CommentsModal;
